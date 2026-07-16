import React, { useState, useEffect } from "react";

/* ── Error-cycle hook ─────────────────────────────────────────
   phase 0 = clean code  (1500 ms)
   phase 1 = 1st error   ( 500 ms)
   phase 2 = 2nd error   ( 500 ms)
   phase 3 = 3rd error   ( 500 ms)
   phase 4 = screen OFF  (1500 ms)
   ──────────────────────────────────────────────────────────── */
export function useMacPhase() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const dur = [1500, 500, 500, 500, 1500];
    let t;
    const go = (p) => {
      t = setTimeout(() => {
        const n = (p + 1) % 5;
        setPhase(n);
        go(n);
      }, dur[p]);
    };
    go(0);
    return () => clearTimeout(t);
  }, []);
  return phase;
}

const ERRORS = [
  "TypeError: Cannot read of undefined",
  "ReferenceError: .map is not a fn",
  "Error: Max update depth exceeded",
];

const CODE = [
  { c: "#818cf8", t: "import React, { useState }" },
  { c: "#34d399", t: "const App = () => {" },
  { c: "#60a5fa", t: "  const [data] = useState()" },
  { c: "#f472b6", t: "  return data.map(i => (" },
  { c: "#60a5fa", t: "    <div>{i.name}</div>" },
  { c: "#34d399", t: "  ))" },
  { c: "#818cf8", t: "}" },
];

/* ── Screen content ── */
function MacScreen({ phase, w, h }) {
  const on       = phase < 4;
  const errCount = phase >= 1 && phase <= 3 ? phase : 0;
  const fs       = Math.max(7, w * 0.042);
  const br       = Math.max(4, w * 0.03);

  return (
    <div style={{
      width: w, height: h,
      background: on ? "#0d1117" : "#000",
      borderRadius: br,
      overflow: "hidden",
      position: "relative",
      transition: "background 0.45s ease",
    }}>
      {on && (
        <>
          <div style={{ padding: `${w * 0.042}px ${w * 0.052}px` }}>
            {/* prompt */}
            <div style={{ display: "flex", gap: 5, marginBottom: w * 0.022, alignItems: "center" }}>
              <span style={{ color: "#4ade80", fontSize: fs * 0.82, fontFamily: "monospace" }}>➜</span>
              <span style={{ color: "#60a5fa", fontSize: fs * 0.82, fontFamily: "monospace" }}>~/project</span>
              <span style={{ color: "#94a3b8", fontSize: fs * 0.82, fontFamily: "monospace" }}>npm run dev</span>
            </div>
            {/* code */}
            {CODE.map((ln, i) => (
              <div key={i} style={{
                fontFamily: "monospace", fontSize: fs * 0.88,
                color: ln.c, lineHeight: 1.55,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                opacity: phase === 3 ? 0.85 - i * 0.04 : 0.85,
                transition: "opacity 0.2s",
              }}>{ln.t}</div>
            ))}
          </div>

          {/* error toasts */}
          {errCount > 0 && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: `${w * 0.014}px ${w * 0.024}px`,
              background: "rgba(5,5,8,0.93)",
              display: "flex", flexDirection: "column", gap: 3,
            }}>
              {ERRORS.slice(0, errCount).map((err, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: `3px ${w * 0.024}px`,
                  background: "rgba(239,68,68,0.11)",
                  border: "1px solid rgba(239,68,68,0.35)",
                  borderRadius: 3,
                }}>
                  <span style={{ color: "#ef4444", fontSize: fs * 0.78, flexShrink: 0 }}>✕</span>
                  <span style={{
                    color: "#fca5a5", fontSize: fs * 0.78, fontFamily: "monospace",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{err}</span>
                </div>
              ))}
            </div>
          )}

          {/* ambient glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 20%, rgba(99,102,241,0.1), transparent 65%)",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* sleep LED */}
      {!on && (
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 4, height: 4, borderRadius: "50%",
          background: "#f59e0b", opacity: 0.5,
          animation: "pulse-dot 2s ease-in-out infinite",
        }} />
      )}
    </div>
  );
}

/* ── MacBook3D — Silver MacBook Pro look ────────────────────
   tiltX / tiltY control the 3-D camera angle.
   The default (18 / -30) gives the dramatic 3/4 side view
   matching the reference image.
   ─────────────────────────────────────────────────────────── */
export function MacBook3D({ phase, lidW = 260, tiltX = 18, tiltY = -30 }) {
  const lidH   = Math.round(lidW * 0.625);      // 16:10 screen ratio
  const bezel  = Math.round(lidW * 0.02);        // ultra-thin bezel
  const br     = Math.round(lidW * 0.056);       // lid corner radius
  const baseW  = Math.round(lidW * 1.08);        // base slightly wider
  const baseH  = Math.round(lidW * 0.165);
  const notchW = Math.round(lidW * 0.115);

  return (
    <div style={{ perspective: 1100, display: "inline-block" }}>
      <div style={{
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: "preserve-3d",
        display: "inline-block",
      }}>

        {/* ══ LID ══ */}
        <div style={{
          width: lidW,
          /* silver aluminium exterior */
          background: "linear-gradient(170deg,#f0f0f5 0%,#e2e2e8 35%,#d4d4da 70%,#c8c8ce 100%)",
          borderRadius: `${br}px ${br}px 4px 4px`,
          padding: bezel,
          paddingTop: bezel + 2,
          border: "1px solid #b8b8be",
          boxShadow: phase === 4
            ? "4px 6px 32px rgba(0,0,0,0.45), -1px 0 8px rgba(0,0,0,0.12)"
            : `0 0 56px rgba(99,102,241,0.22), 4px 6px 32px rgba(0,0,0,0.35), -1px 0 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)`,
          transition: "box-shadow 0.5s ease",
          position: "relative",
        }}>

          {/* Notch at top-centre */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: notchW, height: 10,
            background: "#111",
            borderRadius: "0 0 8px 8px",
            zIndex: 2,
          }}>
            {/* camera lens */}
            <div style={{
              position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)",
              width: 5, height: 5, borderRadius: "50%",
              background: "#0a0a0a", border: "1px solid #282828",
              boxShadow: "0 0 4px rgba(99,102,241,0.3)",
            }} />
          </div>

          {/* dark inner bezel + screen */}
          <div style={{
            background: "#111",
            borderRadius: Math.max(3, br - bezel - 2),
            padding: 2,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6)",
          }}>
            <MacScreen
              phase={phase}
              w={lidW - bezel * 2 - 4}
              h={lidH - bezel * 2 - 2}
            />
          </div>
        </div>

        {/* ══ HINGE ══ */}
        <div style={{
          width: lidW, height: 3,
          background: "linear-gradient(90deg,#9a9a9e,#d0d0d4,#9a9a9e)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }} />

        {/* ══ BASE / KEYBOARD ══ */}
        <div style={{
          width: baseW, height: baseH,
          background: "linear-gradient(180deg,#e8e8ec 0%,#d8d8dc 45%,#ccccce 100%)",
          borderRadius: `2px 2px ${Math.round(br * 0.68)}px ${Math.round(br * 0.68)}px`,
          marginLeft: -Math.round((baseW - lidW) / 2),
          boxShadow: "0 18px 48px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Dark keyboard island */}
          <div style={{
            position: "absolute",
            top: 5, left: Math.round(baseW * 0.065), right: Math.round(baseW * 0.16),
            bottom: Math.round(baseH * 0.32),
            background: "linear-gradient(180deg,#1c1c1e,#141416)",
            borderRadius: 5,
            overflow: "hidden",
          }}>
            {/* Key rows */}
            {[0, 1, 2].map(ri => (
              <div key={ri} style={{
                position: "absolute",
                top: 4 + ri * Math.round(baseH * 0.21),
                left: 4, right: ri === 2 ? 20 : 4,
                display: "flex", gap: 1.5, height: Math.round(baseH * 0.18),
              }}>
                {Array.from({ length: ri === 0 ? 14 : ri === 1 ? 13 : 11 }).map((_, ki) => (
                  <div key={ki} style={{
                    flex: 1, height: "100%", borderRadius: 2,
                    background: "linear-gradient(180deg,#2e2e30,#242426)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }} />
                ))}
              </div>
            ))}
          </div>

          {/* Touch ID (top-right corner of keyboard) */}
          <div style={{
            position: "absolute",
            top: 5, right: Math.round(baseW * 0.04),
            width: Math.round(baseW * 0.1), height: Math.round(baseH * 0.24),
            background: "linear-gradient(180deg,#1c1c1e,#141416)",
            borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "40%", height: "55%", borderRadius: 2,
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 0 6px rgba(99,102,241,0.18)",
            }} />
          </div>

          {/* Trackpad */}
          <div style={{
            position: "absolute",
            bottom: 4, left: "50%", transform: "translateX(-50%)",
            width: Math.round(lidW * 0.38), height: Math.round(baseH * 0.28),
            background: "linear-gradient(180deg,#c8c8cc,#bababc)",
            borderRadius: 5,
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.75)",
          }} />

          {/* Left-side ports (MagSafe + USB-C) */}
          <div style={{
            position: "absolute", left: 2, top: "30%",
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            <div style={{ width: 5, height: 3, background: "#999", borderRadius: "0 2px 2px 0" }} />
            <div style={{ width: 4, height: 4, background: "#999", borderRadius: "0 2px 2px 0" }} />
            <div style={{ width: 4, height: 4, background: "#999", borderRadius: "0 2px 2px 0" }} />
          </div>

          {/* Bottom edge chamfer highlight */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg,rgba(255,255,255,0.0),rgba(255,255,255,0.5),rgba(255,255,255,0.0))",
          }} />
        </div>

      </div>
    </div>
  );
}
