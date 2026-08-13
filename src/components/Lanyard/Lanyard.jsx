/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree, events } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';
import { useCardTexture, IdCardMesh } from './IdCard';
import { cssVar, cssVarNumber } from './cssVars';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Keeps the card's on-screen size constant when the canvas grows to cover the
// whole hero section: the camera pulls back proportionally to the extra height.
const BASE_CANVAS_HEIGHT = 550;

function CameraController({ baseZ, fullScreen }) {
  const camera = useThree(state => state.camera);
  const size = useThree(state => state.size);
  useEffect(() => {
    camera.position.z = fullScreen ? baseZ * Math.max(1, size.height / BASE_CANVAS_HEIGHT) : baseZ;
    camera.updateProjectionMatrix();
  }, [camera, baseZ, fullScreen, size]);
  return null;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = '/img/img1.jpg',
  backImage = null,
  cardImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  eventSource = null,
  fullScreen = false
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustedPosition = useMemo(() => {
    if (isMobile) {
      return [position[0], position[1], 12.0];
    }
    return position;
  }, [position, isMobile]);

  // When events come from an external element (full-section dragging), compute
  // pointer coords against the canvas rect so they stay correct while scrolled.
  const eventManagerFactory = useMemo(() => {
    if (!eventSource) return undefined;
    return state => ({
      ...events(state),
      compute(event, st) {
        const rect = st.gl.domElement.getBoundingClientRect();
        st.pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        st.raycaster.setFromCamera(st.pointer, st.camera);
      }
    });
  }, [eventSource]);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: adjustedPosition, fov }}
        gl={{ alpha: transparent }}
        {...(eventSource ? { eventSource, events: eventManagerFactory } : {})}
      >
        <CameraController baseZ={adjustedPosition[2]} fullScreen={fullScreen} />
        <ambientLight intensity={Math.PI} />
        <Physics interpolate={false} gravity={gravity}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            cardImage={cardImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            baseZ={adjustedPosition[2]}
            fov={fov}
            fullScreen={fullScreen}
          />
        </Physics>
        <Environment background={false}>
          <Lightformer form="rect" intensity={400} position={[-4, -1, -1]} scale={[20, 0.5, 1]} onFrame={(state) => (state.lightformer.rotation.y = Math.PI / 2)} />
          <Lightformer form="rect" intensity={20} position={[0, -1, 1]} scale={[15, 0.5, 1]} onFrame={(state) => (state.lightformer.rotation.y = Math.PI / 2)} />
          <Lightformer form="rect" intensity={20} position={[0, 5, -10]} scale={[20, 1, 1]} />
          <Lightformer form="rect" intensity={20} position={[0, 10, 0]} scale={[20, 1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = '/img/img1.jpg',
  backImage = null,
  cardImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  baseZ = 12,
  fov = 20,
  fullScreen = false
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  // Rope/strap tokens from Lanyard.css — segment length scales the 3
  // physics segments (and their rest positions) together, so it reads as
  // one overall "rope length" control rather than 3 separate ones.
  const ropeSegmentLength = cssVarNumber('--rope-length', 1);
  const ropeWidth = cssVarNumber('--rope-width', lanyardWidth);
  const ropeColor = cssVar('--rope-color', '#0a0a0a');
  // Anchor + card-group position tokens from Lanyard.css.
  const anchorOffsetX = cssVarNumber('--anchor-x', 0);
  const anchorY = isMobile ? 3.4 : cssVarNumber('--anchor-y', 4);
  const anchorZ = cssVarNumber('--anchor-z', 0);
  const cardPosX = cssVarNumber('--card-pos-x', 0);
  const cardPosY = cssVarNumber('--card-pos-y', -1.2);
  const cardPosZ = cssVarNumber('--card-pos-z', -0.05);
  // Hook (clip + clamp) tokens from Lanyard.css. Color/metalness are left
  // undefined when their CSS value is blank, so R3F skips the prop
  // entirely and card.glb's baked metal material shows through unchanged.
  const hookColor = cssVar('--hook-color', '') || undefined;
  const hookMetalnessRaw = cssVar('--hook-metalness', '');
  const hookMetalness = hookMetalnessRaw === '' ? undefined : parseFloat(hookMetalnessRaw);
  const hookRoughness = cssVarNumber('--hook-roughness', 0.3);
  // Where the rope's end physically attaches to the card's RigidBody (see
  // the --clip-attach-* comment in Lanyard.css for how this relates to
  // --card-pos-y).
  const clipAttachX = cssVarNumber('--clip-attach-x', 0);
  const clipAttachY = cssVarNumber('--clip-attach-y', 1.5);
  const clipAttachZ = cssVarNumber('--clip-attach-z', 0);
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);
  const cardTex = useTexture(cardImage || BLANK_PIXEL);
  const size = useThree(state => state.size);

  // In full-screen mode the canvas spans the whole hero section, so the rope's
  // fixed anchor is shifted right (in world units) to hover over the layout's
  // right column — the card hangs where the old block-sized canvas sat.
  const anchorX = useMemo(() => {
    if (!fullScreen) return 0;
    const camZ = baseZ * Math.max(1, size.height / BASE_CANVAS_HEIGHT);
    const worldH = 2 * camZ * Math.tan((fov * Math.PI) / 360);
    const worldW = worldH * (size.width / size.height);
    const contentW = Math.min(size.width, 1280) - 48;
    const gapPx = size.width >= 1280 ? 80 : 64;
    return ((contentW + gapPx) / 4 / size.width) * worldW;
  }, [fullScreen, size, baseZ, fov]);

  // The card's front/back texture atlas — see IdCard.jsx for the actual
  // face layout/design (photo, name, barcode, QR, contact info, etc).
  const cardMap = useCardTexture({
    frontImage,
    backImage,
    cardImage,
    imageFit,
    frontTex,
    backTex,
    cardTex,
    baseMap: materials.base.map
  });
  const heightScale = cssVarNumber('--card-height', 1);
  const cardCenterY = useMemo(() => {
    if (!nodes.card.geometry) return -1.125;
    nodes.card.geometry.computeBoundingBox();
    const box = nodes.card.geometry.boundingBox;
    if (!box) return -1.125;
    const topY = box.max.y;
    const yOffset = topY * (1 - heightScale);
    return yOffset + heightScale * (box.max.y + box.min.y) / 2;
  }, [nodes.card.geometry, heightScale]);

  const currentScale = isMobile ? 1.55 : 2.25;

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeSegmentLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeSegmentLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeSegmentLength]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [clipAttachX, clipAttachY, clipAttachZ]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        const safeDelta = Math.min(0.1, delta);
        const alpha = Math.min(1, safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        ref.current.lerped.lerp(
          ref.current.translation(),
          alpha
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[anchorX + anchorOffsetX, anchorY, anchorZ]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5 * ropeSegmentLength, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1 * ropeSegmentLength, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5 * ropeSegmentLength, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2 * ropeSegmentLength, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={currentScale}
            position={[cardPosX, cardPosY, cardPosZ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <IdCardMesh geometry={nodes.card.geometry} map={cardMap} isMobile={isMobile} />
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={hookRoughness}
              material-color={hookColor}
              material-metalness={hookMetalness}
            />
            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
              material-roughness={hookRoughness}
              material-color={hookColor}
              material-metalness={hookMetalness}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={ropeColor}
          depthTest={false}
          resolution={[size.width, size.height]}
          lineWidth={ropeWidth}
        />
      </mesh>
    </>
  );
}
