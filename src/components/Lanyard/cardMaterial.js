// Tunable appearance for the ID card mesh. Edit these values directly to
// adjust how the card renders in the 3D scene — no need to touch Lanyard.jsx.
export const CARD_MATERIAL = {
  // When true, the card ignores scene lighting entirely and shows the source
  // image's exact pixel colors (flat/unlit) — closest match to the original
  // PNG. Set to false to let the card pick up reflections/shading from the
  // scene lights (meshPhysicalMaterial), using the properties below.
  unlit: true,

  // Tint multiplied over the card texture. Leave as white to show the
  // source image untouched.
  color: '#ffffff',

  // Only used when unlit is false.
  metalness: 0.1,
  roughness: 0.6,
  clearcoat: 0.25,
  clearcoatRoughness: 0.25
};
