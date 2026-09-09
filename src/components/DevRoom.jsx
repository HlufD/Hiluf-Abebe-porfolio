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
        keyboard: "#232329",
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
        keyboard: "#d6d6db",
        plantPot: "#c8c8cf",
        leaf: "#6cae7e",
        rim: "#4f6ef7",
        amb: 0.9,
        key: 1.1,
      };

/* ------------------------------------------------------------------ *
 * animated "code" screen texture
 * ------------------------------------------------------------------ */
function useCodeTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(0, 0, 320, 320);
    const colors = ["#7c9fff", "#7dd3fc", "#c4b5fd", "#f0abfc", "#86efac", "#5b6472"];
    let y = 10;
    for (let i = 0; i < 34; i++) {
      let x = (i % 5) * 10 + 8;
      const segments = 2 + Math.floor(Math.random() * 4);
      for (let s = 0; s < segments; s++) {
        const w = 14 + Math.random() * 58;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, y, w, 4.5);
        x += w + 7;
        if (x > 300) break;
      }
      y += 9;
    }
    ctx.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.repeat.set(1, 0.62);
    return tex;
  }, []);
}

/* ------------------------------------------------------------------ *
 * developer  (rigged Mixamo-style figure, posed seated + typing)
 * ------------------------------------------------------------------ */
// seated pose, in radians — tuned against the Xbot (mixamorig) rig
const POSE = {
  Spine: [0.2, 0, 0],
  Spine1: [0.12, 0, 0],
  Spine2: [0.05, 0, 0],
  Neck: [0.08, 0, 0],
  Head: [-0.08, 0, 0],
  LeftUpLeg: [-1.35, 0, 0.13],
  RightUpLeg: [-1.35, 0, -0.13],
  LeftLeg: [1.5, 0, 0],
  RightLeg: [1.5, 0, 0],
  LeftShoulder: [0, 0, 0],
  RightShoulder: [0, 0, 0],
  LeftArm: [-0.98, 0.22, -1.0],
  RightArm: [-0.98, -0.22, 1.0],
  LeftForeArm: [0, 1.12, 0.2],
  RightForeArm: [0, -1.12, -0.2],
  LeftHand: [0.3, 0, 0],
  RightHand: [0.3, 0, 0],
};

function Developer({ c, animate }) {
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
    for (const [name, r] of Object.entries(POSE)) {
      const b = bones[name];
      if (b) b.rotation.set(r[0], r[1], r[2]);
    }
    // typing: small alternating taps on the hands + forearms
    if (animate) {
      const l = Math.sin(t * 13) * 0.06;
      const rr = Math.sin(t * 13 + 1.4) * 0.06;
      if (bones.LeftHand) bones.LeftHand.rotation.x = 0.2 + l;
      if (bones.RightHand) bones.RightHand.rotation.x = 0.2 + rr;
      if (bones.LeftForeArm) bones.LeftForeArm.rotation.y = 1.12 + l * 0.4;
      if (bones.RightForeArm) bones.RightForeArm.rotation.y = -1.12 - rr * 0.4;
      if (bones.Head) bones.Head.rotation.y = Math.sin(t * 0.4) * 0.1;
      if (bones.Spine) bones.Spine.rotation.x = 0.2 + Math.sin(t * 1.4) * 0.008;
    }
  });

  // face -Z (toward the monitor); sit on the chair
  return (
    <primitive
      object={model}
      position={[0, -0.05, -0.26]}
      rotation={[0, Math.PI, 0]}
      scale={1.02}
    />
  );
}

/* ------------------------------------------------------------------ *
 * chair — backrest on the camera side, seat toward the desk
 * ------------------------------------------------------------------ */
function Chair({ c }) {
  return (
    <group position={[0, 0, -0.2]}>
      {/* seat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.12, 0.58]} />
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </mesh>
      {/* backrest (behind the person, toward the camera / +z) */}
      <mesh position={[0, 0.94, 0.3]} rotation={[0.14, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 0.78, 0.1]} />
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </mesh>
      {/* gas lift + base */}
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
      {/* castors */}
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
 * desk + gear  (monitor against the back wall at -z)
 * ------------------------------------------------------------------ */
function Desk({ c, screen, animate }) {
  useFrame((_, delta) => {
    if (animate && screen) screen.offset.y -= delta * 0.05;
  });

  return (
    <group position={[0, 0, -1.05]}>
      <mesh position={[0, 0.98, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.09, 1.35]} />
        <meshStandardMaterial color={c.desk} roughness={0.6} />
      </mesh>
      {[
        [-1.6, -0.55],
        [1.6, -0.55],
        [-1.6, 0.55],
        [1.6, 0.55],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.49, z]} castShadow>
          <boxGeometry args={[0.09, 0.94, 0.09]} />
          <meshStandardMaterial color={c.deskLeg} roughness={0.7} />
        </mesh>
      ))}

      {/* monitor */}
      <group position={[0, 1.03, -0.35]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.12, 0.19, 0.44, 16]} />
          <meshStandardMaterial color="#141418" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.12, 0]} castShadow>
          <boxGeometry args={[2.5, 1.5, 0.08]} />
          <meshStandardMaterial color={c.monitor} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.12, 0.05]}>
          <planeGeometry args={[2.34, 1.34]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1.12, 0.7]} intensity={0.55} color={c.rim} distance={3.4} decay={0} />
      </group>

      {/* keyboard + mouse */}
      <mesh position={[0, 1.04, 0.46]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.5]} />
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </mesh>
      <mesh position={[1.0, 1.04, 0.48]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.26]} />
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </mesh>

      {/* mug */}
      <mesh position={[-1.2, 1.12, 0.28]} castShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.2, 18]} />
        <meshStandardMaterial color={c.rim} roughness={0.6} />
      </mesh>

      {/* lamp */}
      <group position={[1.45, 1.02, -0.28]}>
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
        <pointLight position={[-0.2, 0.46, 0.12]} color="#ffd9a6" intensity={1.5} distance={4} decay={0} />
      </group>

      {/* plant */}
      <group position={[-1.4, 1.02, 0.42]}>
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

      {/* window on the back wall */}
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

      {/* posters on the side wall */}
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
  const screen = useCodeTexture();
  const group = useRef();
  const animate = !REDUCED;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = animate ? Math.sin(t * 0.12) * 0.16 - 0.14 : -0.16;
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
        <Desk c={c} screen={screen} animate={animate} />
        <Chair c={c} />
        <Developer c={c} animate={animate} />
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
        camera={{ position: [4.6, 3.9, 5.4], fov: 32 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          glRef.current = gl;
          camera.lookAt(0, 1.05, -0.5);
        }}
      >
        <Scene dark={dark} />
      </Canvas>
    </div>
  );
}
