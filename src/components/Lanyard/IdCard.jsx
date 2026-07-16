/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import * as THREE from 'three';
import { CARD_MATERIAL } from './cardMaterial';
import { cssVar, cssVarNumber } from './cssVars';
import './IdCard.css';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

// Builds the card's front/back texture atlas: composites a supplied design
// (cardImage) into the front face, or draws the generated fallback layout
// (photo, name, barcode, QR, contact info) when none is supplied.
export function useCardTexture({ frontImage, backImage, cardImage, imageFit, frontTex, backTex, cardTex, baseMap }) {
  return useMemo(() => {
    if (!frontImage && !backImage && !cardImage) return baseMap;

    const W = baseMap && baseMap.image ? baseMap.image.width : 1024;
    const H = baseMap && baseMap.image ? baseMap.image.height : 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // Draw base map if it exists
    if (baseMap && baseMap.image) {
      ctx.drawImage(baseMap.image, 0, 0, W, H);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);
    }

    // Helper for rounded rectangles (extremely safe fallback)
    const drawRoundRect = (x, y, w, h, radius) => {
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, radius);
      } else {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
    };

    // Front Face Rect and Back Face Rect
    const fw = FRONT_UV_RECT.w * W;
    const fh = FRONT_UV_RECT.h * H;
    const bw = BACK_UV_RECT.w * W;
    const bh = BACK_UV_RECT.h * H;

    const gridSize = 30;

    // --- DRAW FRONT FACE ---
    ctx.save();
    ctx.translate(FRONT_UV_RECT.x * W, FRONT_UV_RECT.y * H);

    if (cardImage && cardTex && cardTex.image) {
      // A ready-made card design: fill the face with the artwork's own
      // background colour, then contain-fit the image so nothing is cropped.
      const img = cardTex.image;
      const probe = document.createElement('canvas');
      probe.width = probe.height = 1;
      const pctx = probe.getContext('2d');
      pctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
      const [pr, pg, pb] = pctx.getImageData(0, 0, 1, 1).data;
      ctx.fillStyle = `rgb(${pr},${pg},${pb})`;
      ctx.fillRect(0, 0, fw, fh);
      const s = Math.min(fw / img.width, fh / img.height);
      const dw = img.width * s;
      const dh = img.height * s;
      ctx.drawImage(img, (fw - dw) / 2, (fh - dh) / 2, dw, dh);
      ctx.restore();
    } else {
    // Front Background Gradient
    const frontGrad = ctx.createLinearGradient(0, 0, fw, fh);
    frontGrad.addColorStop(0, cssVar('--card-front-bg-1', '#0a0a0f'));
    frontGrad.addColorStop(0.5, cssVar('--card-front-bg-2', '#0f172a'));
    frontGrad.addColorStop(1, cssVar('--card-front-bg-3', '#1e1b4b'));
    ctx.fillStyle = frontGrad;
    ctx.fillRect(0, 0, fw, fh);

    // Subtle grid pattern
    ctx.strokeStyle = cssVar('--card-grid-line', 'rgba(255, 255, 255, 0.03)');
    ctx.lineWidth = 1;
    for (let x = 0; x < fw; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, fh);
      ctx.stroke();
    }
    for (let y = 0; y < fh; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(fw, y);
      ctx.stroke();
    }

    // Outer Glow Border
    ctx.strokeStyle = cssVar('--card-front-border-glow', 'rgba(59, 130, 246, 0.3)');
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, fw - 8, fh - 8);

    // All front-face layout is proportional to the face rect (fw × fh) so the
    // composition fills the card identically regardless of the base texture's
    // pixel dimensions. The column reads: photo → name → role → divider →
    // tagline → barcode, evenly distributed top to bottom.
    const avatarSize = fw * 0.52;
    const ax = (fw - avatarSize) / 2;
    const ay = fh * 0.085;
    const ar = avatarSize * 0.12;

    // Soft glow behind the avatar for a more premium feel
    const glowCx = fw / 2;
    const glowCy = ay + avatarSize / 2;
    const glow = ctx.createRadialGradient(glowCx, glowCy, avatarSize * 0.2, glowCx, glowCy, avatarSize * 0.95);
    glow.addColorStop(0, cssVar('--card-avatar-glow', 'rgba(96, 165, 250, 0.35)'));
    glow.addColorStop(1, 'rgba(96, 165, 250, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, fw, ay + avatarSize * 2);

    // Glowing gradient ring border for avatar
    const ringGrad = ctx.createLinearGradient(ax, ay, ax + avatarSize, ay + avatarSize);
    ringGrad.addColorStop(0, cssVar('--card-avatar-ring-1', '#60a5fa'));
    ringGrad.addColorStop(1, cssVar('--card-avatar-ring-2', '#a78bfa'));
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = Math.max(3, fw * 0.008);
    ctx.beginPath();
    drawRoundRect(ax - 4, ay - 4, avatarSize + 8, avatarSize + 8, ar + 4);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    drawRoundRect(ax, ay, avatarSize, avatarSize, ar);
    ctx.clip();
    if (frontTex && frontTex.image && frontImage) {
      // Cover-fit the photo into the square frame (no stretching)
      const img = frontTex.image;
      const s = Math.max(avatarSize / img.width, avatarSize / img.height);
      const dw = img.width * s;
      const dh = img.height * s;
      ctx.drawImage(img, ax + (avatarSize - dw) / 2, ay + (avatarSize - dh) / 2, dw, dh);
    } else {
      ctx.fillStyle = cssVar('--card-avatar-placeholder-bg', '#1e293b');
      ctx.fillRect(ax, ay, avatarSize, avatarSize);
      ctx.fillStyle = cssVar('--card-avatar-placeholder-text', '#ffffff');
      ctx.font = `bold ${Math.round(avatarSize * 0.34)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TM', fw / 2, ay + avatarSize / 2);
    }
    ctx.restore();

    // Name
    ctx.font = `bold ${Math.round(fw * 0.095)}px Inter, sans-serif`;
    ctx.fillStyle = cssVar('--card-name-color', '#ffffff');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Tamilselvan M', fw / 2, ay + avatarSize + fh * 0.085);

    // Role Title
    ctx.font = `600 ${Math.round(fw * 0.052)}px Inter, sans-serif`;
    ctx.fillStyle = cssVar('--card-role-color', '#60a5fa');
    ctx.fillText('Software Developer', fw / 2, ay + avatarSize + fh * 0.135);

    // Short centered accent divider
    const dividerY = ay + avatarSize + fh * 0.165;
    const dividerW = fw * 0.24;
    const dividerGrad = ctx.createLinearGradient((fw - dividerW) / 2, dividerY, (fw + dividerW) / 2, dividerY);
    dividerGrad.addColorStop(0, 'rgba(96, 165, 250, 0)');
    dividerGrad.addColorStop(0.5, cssVar('--card-divider-color', 'rgba(167, 139, 250, 0.9)'));
    dividerGrad.addColorStop(1, 'rgba(96, 165, 250, 0)');
    ctx.fillStyle = dividerGrad;
    ctx.fillRect((fw - dividerW) / 2, dividerY, dividerW, Math.max(3, fh * 0.005));

    // Stack tagline under the divider
    ctx.font = `600 ${Math.round(fw * 0.036)}px Inter, sans-serif`;
    ctx.fillStyle = cssVar('--card-tagline-color', '#94a3b8');
    ctx.fillText('REACT · JAVA · AWS', fw / 2, dividerY + fh * 0.05);

    // Barcode near the bottom, with breathing room below for the caption
    const barcodeY = fh * 0.835;
    const barcodeH = fh * 0.062;
    const barcodeX = fw * 0.1;
    const barcodeW = fw * 0.8;
    ctx.fillStyle = cssVar('--card-barcode-bg', '#ffffff');
    ctx.fillRect(barcodeX, barcodeY, barcodeW, barcodeH);

    ctx.fillStyle = cssVar('--card-barcode-bars', '#000000');
    const unit = fw * 0.003;
    let currX = barcodeX + unit * 3;
    const limitX = barcodeX + barcodeW - unit * 3;
    const weights = [1, 2, 3, 4, 1, 1, 2, 4, 3, 1, 2, 1, 4, 2];
    let idx = 0;
    while (currX < limitX) {
      const w = weights[idx % weights.length];
      const gap = weights[(idx + 3) % weights.length];
      ctx.fillRect(currX, barcodeY, w * unit, barcodeH);
      currX += (w + gap) * unit;
      idx++;
    }

    ctx.fillStyle = cssVar('--card-barcode-caption', 'rgba(255, 255, 255, 0.45)');
    ctx.font = `${Math.round(fw * 0.03)}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('* TAMILSELVAN M *', fw / 2, barcodeY + barcodeH + fh * 0.038);

    ctx.restore();
    }


    // --- DRAW BACK FACE ---
    ctx.save();
    ctx.translate(BACK_UV_RECT.x * W, BACK_UV_RECT.y * H);

    // Back Background Gradient
    const backGrad = ctx.createLinearGradient(0, 0, bw, bh);
    backGrad.addColorStop(0, cssVar('--card-back-bg-1', '#1e1b4b'));
    backGrad.addColorStop(0.5, cssVar('--card-back-bg-2', '#0f172a'));
    backGrad.addColorStop(1, cssVar('--card-back-bg-3', '#0a0a0f'));
    ctx.fillStyle = backGrad;
    ctx.fillRect(0, 0, bw, bh);

    // Grid pattern
    ctx.strokeStyle = cssVar('--card-grid-line', 'rgba(255, 255, 255, 0.03)');
    ctx.lineWidth = 1;
    for (let x = 0; x < bw; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, bh);
      ctx.stroke();
    }
    for (let y = 0; y < bh; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(bw, y);
      ctx.stroke();
    }

    // Outer Glow Border
    ctx.strokeStyle = cssVar('--card-back-border-glow', 'rgba(124, 58, 237, 0.3)');
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, bw - 8, bh - 8);

    // Monogram Background Label
    ctx.font = 'bold 96px Inter, sans-serif';
    ctx.fillStyle = cssVar('--card-monogram-label', 'rgba(255, 255, 255, 0.02)');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TM', bw / 2, bh / 2 - 40);

    // Personal emblem (monogram seal) — no logo, no company branding
    const logoSize = 130;
    const lx = (bw - logoSize) / 2;
    const ly = 80;
    const emblemGrad = ctx.createLinearGradient(lx, ly, lx + logoSize, ly + logoSize);
    emblemGrad.addColorStop(0, cssVar('--card-emblem-ring-1', '#60a5fa'));
    emblemGrad.addColorStop(1, cssVar('--card-emblem-ring-2', '#a78bfa'));
    ctx.strokeStyle = emblemGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(bw / 2, ly + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillStyle = cssVar('--card-emblem-text', '#ffffff');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TM', bw / 2, ly + logoSize / 2 + 2);
    ctx.textBaseline = 'alphabetic';

    // Personal tagline
    ctx.fillStyle = cssVar('--card-back-title', '#ffffff');
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Full Stack Developer', bw / 2, 260);

    ctx.fillStyle = cssVar('--card-back-subtitle', '#94a3b8');
    ctx.font = '600 15px Inter, sans-serif';
    ctx.fillText('CLOUD · DEVOPS · REACT · JAVA', bw / 2, 290);

    // Contact details
    const bContactY = 350;
    ctx.fillStyle = cssVar('--card-contact-label', '#cbd5e1');
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillText('EMAIL', bw / 2, bContactY);
    ctx.fillStyle = cssVar('--card-contact-value', '#ffffff');
    ctx.font = '500 16px Inter, sans-serif';
    ctx.fillText('tamilselvan.mariyappan@gmail.com', bw / 2, bContactY + 22);

    ctx.fillStyle = cssVar('--card-contact-label', '#cbd5e1');
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillText('LOCATION', bw / 2, bContactY + 65);
    ctx.fillStyle = cssVar('--card-contact-value', '#ffffff');
    ctx.font = '500 16px Inter, sans-serif';
    ctx.fillText('Chennai, Tamil Nadu, India', bw / 2, bContactY + 87);

    // Stylized QR code
    const qrSize = 100;
    const qrx = (bw - qrSize) / 2;
    const qry = bh - 150;

    ctx.fillStyle = cssVar('--card-qr-bg', '#ffffff');
    ctx.beginPath();
    drawRoundRect(qrx - 10, qry - 10, qrSize + 20, qrSize + 20, 12);
    ctx.fill();

    ctx.fillStyle = cssVar('--card-qr-fg', '#0f172a');
    const qrGrid = 10;
    const moduleSize = qrSize / qrGrid;
    for (let r = 0; r < qrGrid; r++) {
      for (let c = 0; c < qrGrid; c++) {
        const isAnchor =
          (r < 3 && c < 3) ||
          (r < 3 && c >= qrGrid - 3) ||
          (r >= qrGrid - 3 && c < 3);

        if (isAnchor) {
          if (r === 0 || r === 2 || c === 0 || c === 2 ||
              (c === qrGrid - 1 || c === qrGrid - 3) && r < 3 ||
              (r === qrGrid - 1 || r === qrGrid - 3) && c < 3) {
            ctx.fillRect(qrx + c * moduleSize, qry + r * moduleSize, moduleSize, moduleSize);
          }
          if ((r === 1 && c === 1) ||
              (r === 1 && c === qrGrid - 2) ||
              (r === qrGrid - 2 && c === 1)) {
            ctx.fillRect(qrx + c * moduleSize, qry + r * moduleSize, moduleSize, moduleSize);
          }
        } else {
          const rand = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
          if ((rand - Math.floor(rand)) > 0.45) {
            ctx.fillRect(qrx + c * moduleSize, qry + r * moduleSize, moduleSize, moduleSize);
          }
        }
      }
    }

    ctx.fillStyle = cssVar('--card-qr-caption', 'rgba(255, 255, 255, 0.3)');
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN TO VISIT PORTFOLIO', bw / 2, bh - 15);

    ctx.restore();

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap ? baseMap.flipY : false;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, cardImage, imageFit, frontTex, backTex, cardTex, baseMap]);
}

// Renders the card's mesh with the tunable material from cardMaterial.js —
// unlit by default, so the source artwork's colors show exactly as designed
// instead of being tinted/washed out by the scene's lighting. Width/height
// are read from IdCard.css (--card-width / --card-height) as scale
// multipliers on top of the base card.glb geometry — they resize only the
// card plate itself, not the metal clip/clamp hardware next to it.
export function IdCardMesh({ geometry, map, isMobile }) {
  const widthScale = cssVarNumber('--card-width', 1);
  const heightScale = cssVarNumber('--card-height', 1);
  // Scaling a mesh stretches it away from its local origin, which in
  // card.glb sits near the card's BOTTOM edge — so scaling heightScale up
  // pushes the TOP edge further up, past the fixed-size clip/clamp
  // hardware next to it (the clip doesn't scale with the card). Counter-
  // offset by the geometry's own top-edge Y so the card grows/shrinks from
  // a pinned top edge instead, staying aligned with the clip at any scale.
  const topY = useMemo(() => {
    geometry.computeBoundingBox();
    return geometry.boundingBox ? geometry.boundingBox.max.y : 0;
  }, [geometry]);
  const yOffset = topY * (1 - heightScale);
  return (
    <mesh geometry={geometry} scale={[widthScale, heightScale, 1]} position={[0, yOffset, 0]}>
      {CARD_MATERIAL.unlit ? (
        <meshBasicMaterial map={map} map-anisotropy={16} color={CARD_MATERIAL.color} toneMapped={false} />
      ) : (
        <meshPhysicalMaterial
          map={map}
          map-anisotropy={16}
          color={CARD_MATERIAL.color}
          clearcoat={isMobile ? 0 : CARD_MATERIAL.clearcoat}
          clearcoatRoughness={CARD_MATERIAL.clearcoatRoughness}
          roughness={CARD_MATERIAL.roughness}
          metalness={CARD_MATERIAL.metalness}
        />
      )}
    </mesh>
  );
}
