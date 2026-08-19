# ---------------------------------------------------------------------------
# retry-apply.ps1
# Retries `terraform apply` until the Always Free A1.Flex instance is created.
#
# OCI free-tier A1.Flex capacity in ap-mumbai-1 (single-AD region) is
# frequently exhausted. This script retries with a configurable delay and
# rotates across the 3 fault domains each attempt, since capacity is often
# available in one fault domain even when others are full.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File retry-apply.ps1
#   powershell -ExecutionPolicy Bypass -File retry-apply.ps1 -MaxAttempts 500 -DelaySeconds 120
#
# Progress is written to retry-apply.log next to this script so it can be
# tailed even when this runs detached/in the background.
# ---------------------------------------------------------------------------

param(
    [int]$MaxAttempts = 999999,    # effectively unlimited - keep going until success or a real error
    [int]$DelaySeconds = 120       # wait between attempts
)

$ErrorActionPreference = "SilentlyContinue"
Set-Location $PSScriptRoot

$logFile = Join-Path $PSScriptRoot "retry-apply.log"
$faultDomains = @("", "FAULT-DOMAIN-1", "FAULT-DOMAIN-2", "FAULT-DOMAIN-3")
$attempt = 0

function Log($msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

Log "=============================================================="
Log " OCI Always Free A1.Flex retry loop"
Log " Max attempts : $MaxAttempts"
Log " Delay        : $DelaySeconds seconds between attempts"
Log " Rotating fault domains: (none/auto), FAULT-DOMAIN-1, -2, -3"
Log "=============================================================="

while ($attempt -lt $MaxAttempts) {
    $attempt++
    $fd = $faultDomains[($attempt - 1) % $faultDomains.Length]
    $fdLabel = if ($fd -eq "") { "auto" } else { $fd }
    Log ""
    Log "[$attempt/$MaxAttempts] terraform apply (fault_domain=$fdLabel)..."

    $env:TF_VAR_fault_domain = $fd

    # Run terraform via cmd so stderr is merged into stdout as plain text.
    # This avoids PowerShell's ErrorRecord wrapping that breaks string capture.
    $output = cmd /c "terraform apply -auto-approve 2>&1" | Out-String
    $exitCode = $LASTEXITCODE

    if ($exitCode -eq 0) {
        Log ""
        Log "SUCCESS! Instance created (fault_domain=$fdLabel)."
        Log "--------------------------------------------------------------"
        Add-Content -Path $logFile -Value $output
        $sshCmd = (cmd /c "terraform output -raw ssh_command 2>&1")
        Log "SSH command: $sshCmd"
        Set-Content -Path (Join-Path $PSScriptRoot "SUCCESS.txt") -Value "Instance created at $(Get-Date). SSH: $sshCmd"
        exit 0
    }

    # Normalize whitespace so wrapped error text (e.g. "Out of`nhost capacity")
    # still matches. Collapse all whitespace to single spaces.
    $normalized = ($output -replace '\s+', ' ')

    if ($normalized -match "Out of host capacity|Out of capacity") {
        Log "  -> Out of host capacity (fault_domain=$fdLabel). Retrying in $DelaySeconds seconds..."
    } else {
        Log "  -> Non-capacity error:"
        Add-Content -Path $logFile -Value $output
        Log "  -> Stopping (not a capacity issue)."
        exit 1
    }

    if ($attempt -lt $MaxAttempts) {
        Start-Sleep -Seconds $DelaySeconds
    }
}

Log ""
Log "Gave up after $MaxAttempts attempts. Capacity still unavailable."
Log "Re-run the script later, or try a different region."
exit 1
