import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

const MODEL = "/models/developer.glb";
useGLTF.preload(MODEL);

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * tiny two-bone IK so the hands actually land on the keyboard
 * ------------------------------------------------------------------ */
const _sh = new THREE.Vector3();
const _el = new THREE.Vector3();
const _wr = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _axis = new THREE.Vector3();
const _local = new THREE.Vector3();
const _pq = new THREE.Quaternion();
// on the Xbot rig the arm bones run down local +X (left) / -X (right)
const _axisL = new THREE.Vector3(1, 0, 0);
const _axisR = new THREE.Vector3(-1, 0, 0);
const clamp1 = (x) => (x < -1 ? -1 : x > 1 ? 1 : x);

// point a bone's local bone-axis along a world-space direction
function aimBone(bone, worldDir, boneAxis) {
  bone.parent.getWorldQuaternion(_pq).invert();
  _local.copy(worldDir).applyQuaternion(_pq).normalize();
  bone.quaternion.setFromUnitVectors(boneAxis, _local);
}

function solveArm(arm, fore, hand, target, pole, boneAxis) {
  arm.getWorldPosition(_sh);
  fore.getWorldPosition(_el);
  hand.getWorldPosition(_wr);
  const upper = _sh.distanceTo(_el);
  const lower = _el.distanceTo(_wr);

  _dir.copy(target).sub(_sh);
  let dist = _dir.length();
  dist = Math.min(dist, (upper + lower) * 0.995);
  _dir.normalize();

  // shoulder bend (law of cosines)
  const cosA = clamp1((upper * upper + dist * dist - lower * lower) / (2 * upper * dist));
  const angA = Math.acos(cosA);

  _axis.copy(_dir).cross(pole).normalize();
  if (_axis.lengthSq() < 1e-6) _axis.set(1, 0, 0);
  aimBone(arm, _dir.clone().applyAxisAngle(_axis, angA), boneAxis);
  arm.updateWorldMatrix(true, true);

  fore.getWorldPosition(_el);
  aimBone(fore, _dir.copy(target).sub(_el).normalize(), boneAxis);
  fore.updateWorldMatrix(true, true);
}

/* ------------------------------------------------------------------ *
 * palettes
 * ------------------------------------------------------------------ */
const palette = (dark) =>
  dark
    ? {
        floor: "#17171b",
        wall: "#212127",
        wallB: "#1c1c22",
        desk: "#2b241d",
        deskLeg: "#1d1712",
        chair: "#2c2c33",
        person: "#9aa0ad",
        monitor: "#0b0b0e",
        keyboard: "#202027",
        plantPot: "#33333b",
        leaf: "#3f7d54",
        rim: "#7c9fff",
        amb: 0.68,
        key: 1.15,
      }
    : {
        floor: "#e9e9ec",
        wall: "#f4f4f6",
        wallB: "#eeeef0",
        desk: "#d8c3a2",
        deskLeg: "#b9a582",
        chair: "#c8c8cf",
        person: "#c2c5cf",
        monitor: "#10131c",
        keyboard: "#c7c7cd",
        plantPot: "#c8c8cf",
        leaf: "#6cae7e",
        rim: "#4f6ef7",
        amb: 0.9,
        key: 1.1,
      };

/* ------------------------------------------------------------------ *
 * live editor screen — "types" tokens onto a canvas texture
 * ------------------------------------------------------------------ */
const TOKEN_COLORS = ["#7c9fff", "#7dd3fc", "#c4b5fd", "#f0abfc", "#86efac", "#8b93a5"];

function makeEditor() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;

  const state = {
    canvas,
    ctx,
    tex,
    lines: [{ indent: 0, tokens: [] }],
    acc: 0,
    nextGap: 90,
    caretOn: true,
  };

  const LINE_H = 14;
  const PAD_X = 16;
  const PAD_Y = 12;
  const MAX_LINES = 18;

  state.draw = () => {
    ctx.fillStyle = "#0b0e17";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0e1220";
    ctx.fillRect(0, 0, 34, canvas.height); // gutter
    ctx.font = "10px ui-monospace, monospace";

    const start = Math.max(0, state.lines.length - MAX_LINES);
    for (let i = start; i < state.lines.length; i++) {
      const row = state.lines[i];
      const y = PAD_Y + (i - start) * LINE_H;
      ctx.fillStyle = "#39415a";
      ctx.fillText(String(i + 1).padStart(2, " "), 8, y + 9);
      let x = PAD_X + 24 + row.indent * 12;
      for (const tk of row.tokens) {
        ctx.fillStyle = tk.c;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(x, y + 2, tk.w, 5.5);
        x += tk.w + 5;
      }
      ctx.globalAlpha = 1;
      if (i === state.lines.length - 1 && state.caretOn) {
        ctx.fillStyle = "#7c9fff";
        ctx.fillRect(x + 1, y - 1, 2, 11);
      }
    }
    state.tex.needsUpdate = true;
  };

  state.step = () => {
    const cur = state.lines[state.lines.length - 1];
    const width =
      cur.indent * 12 + cur.tokens.reduce((s, t) => s + t.w + 5, 0);
    if (cur.tokens.length && (Math.random() < 0.24 || width > 360)) {
      let indent = cur.indent;
      const r = Math.random();
      if (r < 0.28) indent += 1;
      else if (r < 0.46) indent = Math.max(0, indent - 1);
      state.lines.push({ indent: Math.min(5, indent), tokens: [] });
      if (state.lines.length > 600) state.lines = state.lines.slice(-60);
    } else {
      cur.tokens.push({
        c: TOKEN_COLORS[(Math.random() * TOKEN_COLORS.length) | 0],
        w: 10 + Math.random() * 44,
      });
    }
  };

  // prime a few lines so it doesn't start empty
  for (let i = 0; i < 60; i++) state.step();
  state.draw();
  return state;
}

/* ------------------------------------------------------------------ *
 * developer — rigged figure posed seated, animated typing
 * ------------------------------------------------------------------ */
const POSE = {
  Spine: [0.12, 0, 0],
  Spine1: [0.07, 0, 0],
  Spine2: [0.03, 0, 0],
  Neck: [0.02, 0, 0],
  Head: [-0.16, 0, 0],
  LeftUpLeg: [-1.35, 0, 0.13],
  RightUpLeg: [-1.35, 0, -0.13],
  LeftLeg: [1.5, 0, 0],
  RightLeg: [1.5, 0, 0],
  LeftShoulder: [0, 0, 0.15],
  RightShoulder: [0, 0, -0.15],
  LeftArm: [-0.6, 0.2, -0.7],
  RightArm: [-0.6, -0.2, 0.7],
  LeftForeArm: [0, 0.9, 0.15],
  RightForeArm: [0, -0.9, -0.15],
  LeftHand: [0.5, 0.1, -0.15],
  RightHand: [0.5, -0.1, 0.15],
};

// where the hands rest on the keyboard (world space)
const LEFT_TARGET = new THREE.Vector3(-0.19, 0.82, -0.55);
const RIGHT_TARGET = new THREE.Vector3(0.19, 0.82, -0.52);
const LEFT_POLE = new THREE.Vector3(-1, -0.4, 0.6);
const RIGHT_POLE = new THREE.Vector3(1, -0.4, 0.6);
const _lt = new THREE.Vector3();
const _rt = new THREE.Vector3();

const FINGERS = ["Index", "Middle", "Ring", "Pinky"];

function Developer({ c, animate, editor }) {
  const { scene } = useGLTF(MODEL);
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const bones = useMemo(() => {
    const map = {};
    model.traverse((o) => {
      if (o.isBone) map[o.name.replace("mixamorig", "")] = o;
      if (o.isMesh || o.isSkinnedMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;
        o.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(c.person),
          roughness: 0.68,
          metalness: 0.02,
          emissive: new THREE.Color(c.person),
          emissiveIntensity: 0.06,
        });
      }
    });
    return map;
  }, [model, c.person]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 1. base seated pose
    for (const [name, r] of Object.entries(POSE)) {
      const b = bones[name];
      if (b) b.rotation.set(r[0], r[1], r[2]);
    }

    // bursty typing envelope: fast clatter, short thinking pauses
    const cycle = t % 7;
    const typing = animate
      ? cycle < 5.2
        ? 1
        : Math.max(0, 1 - (cycle - 5.2) * 1.6)
      : 0;
    const speed = 19;

    // torso + head settle before we solve the arms
    if (animate) {
      bones.Spine.rotation.x = 0.12 + Math.sin(t * 0.8) * 0.014;
      bones.Head.rotation.x = -0.16 + Math.sin(t * 0.5) * 0.05;
      bones.Head.rotation.y = Math.sin(t * 0.37) * 0.12;
      bones.Neck.rotation.x = 0.02 + Math.sin(t * 0.6) * 0.03;
    }

    // 2. two-bone IK — hands to the keyboard
    model.updateMatrixWorld(true);
    _lt.copy(LEFT_TARGET);
    _rt.copy(RIGHT_TARGET);
    if (animate) {
      const key = 0.045 * (0.4 + 0.6 * typing);
      _lt.x += Math.sin(t * 3.1) * key;
      _lt.z += Math.sin(t * 4.3) * key * 0.6;
      _lt.y += Math.abs(Math.sin(t * speed)) * -0.012 * typing;
      _rt.x += Math.sin(t * 2.7 + 1) * key;
      _rt.z += Math.sin(t * 3.9 + 1) * key * 0.6;
      _rt.y += Math.abs(Math.sin(t * speed + 2.3)) * -0.012 * typing;
    }
    if (bones.LeftArm && bones.LeftForeArm && bones.LeftHand)
      solveArm(bones.LeftArm, bones.LeftForeArm, bones.LeftHand, _lt, LEFT_POLE, _axisL);
    if (bones.RightArm && bones.RightForeArm && bones.RightHand)
      solveArm(bones.RightArm, bones.RightForeArm, bones.RightHand, _rt, RIGHT_POLE, _axisR);

    if (!animate) return;

    // 3. fingers — sharp, phase-offset taps rippling across the hand
    FINGERS.forEach((f, i) => {
      const lp = Math.max(0, Math.sin(t * speed + i * 1.7)) ** 4;
      const rp = Math.max(0, Math.sin(t * speed + i * 1.7 + 2.6)) ** 4;
      ["1", "2", "3"].forEach((seg, s) => {
        const scale = (s === 0 ? 1 : 0.55) * (0.35 + 0.9 * typing);
        const lb = bones[`LeftHand${f}${seg}`];
        const rb = bones[`RightHand${f}${seg}`];
        if (lb) lb.rotation.z = -0.16 - lp * 0.55 * scale;
        if (rb) rb.rotation.z = 0.16 + rp * 0.55 * scale;
      });
    });
    ["1", "2", "3"].forEach((seg) => {
      const lb = bones[`LeftHandThumb${seg}`];
      const rb = bones[`RightHandThumb${seg}`];
      if (lb) lb.rotation.z = 0.22;
      if (rb) rb.rotation.z = -0.22;
    });

    // wrists bounce with the keystrokes
    const wob = (0.04 + 0.05 * typing) * 1;
    bones.LeftHand.rotation.x += Math.sin(t * speed) * wob;
    bones.RightHand.rotation.x += Math.sin(t * speed + 2.3) * wob;
  });

  // drive the editor on its own cadence
  useFrame((_, delta) => {
    if (!animate) return;
    const ed = editor;
    ed.acc += delta * 1000;
    ed.caretOn = Math.floor(performance.now() / 430) % 2 === 0;
    const cycle = (performance.now() / 1000) % 7;
    const active = cycle < 5.2;
    if (ed.acc >= ed.nextGap) {
      ed.acc = 0;
      ed.nextGap = active ? 55 + Math.random() * 110 : 400 + Math.random() * 500;
      ed.step();
    }
    ed.draw();
  });

  return (
    <primitive
      object={model}
      position={[0, -0.52, -0.32]}
      rotation={[0, Math.PI, 0]}
      scale={1.02}
    />
  );
}

/* ------------------------------------------------------------------ *
 * chair
 * ------------------------------------------------------------------ */
function Chair({ c }) {
  return (
    <group position={[0, 0, -0.18]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.12, 0.58]} />
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.83, 0.29]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.56, 0.52, 0.09]} />
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.26, 0.04]}>
        <cylinderGeometry args={[0.07, 0.07, 0.48, 12]} />
        <meshStandardMaterial color="#26262c" metalness={0.35} roughness={0.55} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + 0.3;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.13 + 0.04, 0.05, Math.sin(a) * 0.13 + 0.04]}
            rotation={[0, -a, 0]}
            castShadow
          >
            <boxGeometry args={[0.26, 0.05, 0.06]} />
            <meshStandardMaterial color="#26262c" metalness={0.35} roughness={0.55} />
          </mesh>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + 0.3;
        return (
          <mesh
            key={`w${i}`}
            position={[Math.cos(a) * 0.24 + 0.04, 0.03, Math.sin(a) * 0.24 + 0.04]}
          >
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#161619" roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * desk + gear
 * ------------------------------------------------------------------ */
function Desk({ c, editor }) {
  return (
    <group position={[0, 0, -1.02]}>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.08, 1.4]} />
        <meshStandardMaterial color={c.desk} roughness={0.6} />
      </mesh>
      {[
        [-1.6, -0.58],
        [1.6, -0.58],
        [-1.6, 0.58],
        [1.6, 0.58],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <boxGeometry args={[0.09, 0.68, 0.09]} />
          <meshStandardMaterial color={c.deskLeg} roughness={0.7} />
        </mesh>
      ))}

      {/* monitor */}
      <group position={[0, 0.76, -0.4]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.19, 0.4, 16]} />
          <meshStandardMaterial color="#141418" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.02, 0]} castShadow>
          <boxGeometry args={[2.4, 1.42, 0.08]} />
          <meshStandardMaterial color={c.monitor} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.02, 0.05]}>
          <planeGeometry args={[2.24, 1.26]} />
          <meshBasicMaterial map={editor.tex} toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, 1.02, 0.8]}
          intensity={0.6}
          color={c.rim}
          distance={3.4}
          decay={0}
        />
      </group>

      {/* keyboard + mouse (near the front edge, where the hands are) */}
      <mesh position={[0, 0.77, 0.42]} castShadow>
        <boxGeometry args={[1.45, 0.05, 0.46]} />
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </mesh>
      <mesh position={[0.98, 0.77, 0.44]} castShadow>
        <boxGeometry args={[0.15, 0.04, 0.24]} />
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </mesh>

      {/* mug */}
      <mesh position={[-1.2, 0.86, 0.28]} castShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.2, 18]} />
        <meshStandardMaterial color={c.rim} roughness={0.6} />
      </mesh>

      {/* lamp */}
      <group position={[1.45, 0.76, -0.32]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
          <meshStandardMaterial color="#141418" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.62, 10]} />
          <meshStandardMaterial color="#141418" roughness={0.5} />
        </mesh>
        <mesh position={[-0.16, 0.56, 0]} rotation={[0, 0, -0.7]}>
          <coneGeometry args={[0.15, 0.24, 18, 1, true]} />
          <meshStandardMaterial color="#26262b" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <pointLight
          position={[-0.2, 0.46, 0.12]}
          color="#ffd9a6"
          intensity={1.5}
          distance={4}
          decay={0}
        />
      </group>

      {/* plant */}
      <group position={[-1.4, 0.76, 0.42]}>
        <mesh position={[0, 0.11, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.22, 14]} />
          <meshStandardMaterial color={c.plantPot} roughness={0.8} />
        </mesh>
        {[
          [0, 0.3, 0],
          [0.07, 0.26, 0.04],
          [-0.06, 0.26, -0.03],
        ].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <icosahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color={c.leaf} flatShading roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * room shell
 * ------------------------------------------------------------------ */
function Room({ c }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color={c.floor} roughness={0.97} />
      </mesh>
      <mesh position={[0, 3, -2.3]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color={c.wallB} roughness={1} />
      </mesh>
      <mesh position={[-3.1, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color={c.wall} roughness={1} />
      </mesh>

      <group position={[1.7, 3.1, -2.27]}>
        <mesh>
          <planeGeometry args={[2, 1.5]} />
          <meshBasicMaterial color={c.rim} toneMapped={false} opacity={0.16} transparent />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.1, 0.05]} />
          <meshStandardMaterial color={c.wall} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.05, 1.6]} />
          <meshStandardMaterial color={c.wall} />
        </mesh>
      </group>

      {[
        [1.2, "#4f6ef7"],
        [-0.1, "#7dd3fc"],
      ].map(([z, col], i) => (
        <mesh key={i} position={[-3.08, 2.7, z]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.95, 0.68]} />
          <meshStandardMaterial color={col} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * scene
 * ------------------------------------------------------------------ */
function Scene({ dark }) {
  const c = useMemo(() => palette(dark), [dark]);
  const editor = useMemo(makeEditor, []);
  const group = useRef();
  const animate = !REDUCED;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = animate ? Math.sin(t * 0.12) * 0.14 - 0.13 : -0.15;
    group.current.position.y = animate ? Math.sin(t * 0.5) * 0.015 : 0;
  });

  return (
    <>
      <ambientLight intensity={c.amb} />
      <hemisphereLight intensity={dark ? 0.35 : 0.5} color={c.rim} groundColor={c.floor} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={c.key}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[2, 2, 6]} intensity={dark ? 0.4 : 0.28} />
      <pointLight position={[-3, 4, 3]} intensity={0.3} color={c.rim} decay={0} />

      <group ref={group}>
        <Room c={c} />
        <Desk c={c} editor={editor} />
        <Chair c={c} />
        <Developer c={c} animate={animate} editor={editor} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={dark ? 0.5 : 0.32}
          scale={11}
          blur={2.6}
          far={5}
          resolution={512}
        />
      </group>
    </>
  );
}

export default function DevRoom({ dark = true, className = "" }) {
  const glRef = useRef();
  useEffect(() => () => glRef.current?.dispose?.(), []);

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={REDUCED ? "demand" : "always"}
        camera={{ position: [4.3, 3.6, 4.7], fov: 33 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          glRef.current = gl;
          camera.lookAt(0.16, 0.9, -0.55);
        }}
      >
        <Scene dark={dark} />
      </Canvas>
    </div>
  );
}
