import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * palettes
 * ------------------------------------------------------------------ */
const palette = (dark) =>
  dark
    ? {
        floor: "#18181c",
        wall: "#232329",
        wallB: "#1d1d23",
        desk: "#2b241e",
        deskLeg: "#201a15",
        chair: "#2e2e34",
        body: "#3a3a42",
        hoodie: "#4f6ef7",
        skin: "#d8a07a",
        hair: "#1c1c20",
        monitor: "#0b0b0e",
        keyboard: "#232329",
        plantPot: "#3a3a42",
        leaf: "#3f7d54",
        rim: "#7c9fff",
        amb: 0.55,
        key: 1.05,
      }
    : {
        floor: "#ececef",
        wall: "#f5f5f6",
        wallB: "#efeff1",
        desk: "#d8c3a2",
        deskLeg: "#b9a582",
        chair: "#c9c9cf",
        body: "#b9b9c2",
        hoodie: "#4f6ef7",
        skin: "#e0ac86",
        hair: "#4b3a2f",
        monitor: "#10131c",
        keyboard: "#d6d6db",
        plantPot: "#c8c8cf",
        leaf: "#6cae7e",
        rim: "#4f6ef7",
        amb: 0.95,
        key: 1.15,
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
 * the developer
 * ------------------------------------------------------------------ */
function Developer({ c, animate }) {
  const leftArm = useRef();
  const rightArm = useRef();
  const torso = useRef();
  const head = useRef();

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    if (leftArm.current)
      leftArm.current.rotation.x = -1.15 + Math.sin(t * 9) * 0.06;
    if (rightArm.current)
      rightArm.current.rotation.x = -1.15 + Math.sin(t * 9 + 1.7) * 0.06;
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    if (head.current) head.current.rotation.z = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <group position={[0, 0, -0.35]}>
      {/* hips */}
      <RoundedBox args={[0.62, 0.34, 0.5]} radius={0.08} smoothness={3} position={[0, 1.02, 0]} castShadow>
        <meshStandardMaterial color={c.body} roughness={0.9} />
      </RoundedBox>

      {/* torso — leans toward the desk */}
      <group ref={torso} position={[0, 1.2, 0]} rotation={[-0.32, 0, 0]}>
        <RoundedBox args={[0.68, 0.72, 0.44]} radius={0.12} smoothness={3} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color={c.hoodie} roughness={0.85} />
        </RoundedBox>

        {/* head */}
        <group ref={head} position={[0, 0.78, 0.06]}>
          <mesh castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color={c.skin} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.08, -0.02]} scale={[1.06, 0.8, 1.06]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color={c.hair} roughness={0.9} />
          </mesh>
        </group>

        {/* upper arms reaching forward to the keyboard */}
        <group ref={leftArm} position={[-0.4, 0.16, 0.12]} rotation={[-1.15, 0, 0]}>
          <RoundedBox args={[0.17, 0.17, 0.62]} radius={0.07} smoothness={3} position={[0, 0, 0.28]} castShadow>
            <meshStandardMaterial color={c.hoodie} roughness={0.85} />
          </RoundedBox>
          <mesh position={[0, -0.02, 0.6]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={c.skin} roughness={0.7} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.4, 0.16, 0.12]} rotation={[-1.15, 0, 0]}>
          <RoundedBox args={[0.17, 0.17, 0.62]} radius={0.07} smoothness={3} position={[0, 0, 0.28]} castShadow>
            <meshStandardMaterial color={c.hoodie} roughness={0.85} />
          </RoundedBox>
          <mesh position={[0, -0.02, 0.6]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={c.skin} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* legs under the desk */}
      <RoundedBox args={[0.24, 0.5, 0.22]} radius={0.06} smoothness={3} position={[-0.17, 0.62, 0.18]}>
        <meshStandardMaterial color={c.body} roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.24, 0.5, 0.22]} radius={0.06} smoothness={3} position={[0.17, 0.62, 0.18]}>
        <meshStandardMaterial color={c.body} roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * chair
 * ------------------------------------------------------------------ */
function Chair({ c }) {
  return (
    <group position={[0, 0, -0.2]}>
      <RoundedBox args={[0.78, 0.14, 0.7]} radius={0.06} smoothness={3} position={[0, 0.82, 0]} castShadow>
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.78, 0.8, 0.13]} radius={0.06} smoothness={3} position={[0, 1.2, -0.32]} rotation={[-0.12, 0, 0]} castShadow>
        <meshStandardMaterial color={c.chair} roughness={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 12]} />
        <meshStandardMaterial color="#1b1b1f" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 5]} />
        <meshStandardMaterial color="#1b1b1f" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * desk + gear
 * ------------------------------------------------------------------ */
function Desk({ c, screen, animate }) {
  useFrame((_, delta) => {
    if (animate && screen) screen.offset.y -= delta * 0.05;
  });

  return (
    <group position={[0, 0, -1.5]}>
      {/* top */}
      <RoundedBox args={[3.6, 0.1, 1.5]} radius={0.03} smoothness={2} position={[0, 1.0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={c.desk} roughness={0.6} />
      </RoundedBox>
      {/* legs */}
      {[
        [-1.68, -0.62],
        [1.68, -0.62],
        [-1.68, 0.62],
        [1.68, 0.62],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]} castShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={c.deskLeg} roughness={0.7} />
        </mesh>
      ))}

      {/* monitor */}
      <group position={[0, 1.05, -0.4]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.13, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#17171b" roughness={0.5} metalness={0.3} />
        </mesh>
        <RoundedBox args={[2.5, 1.5, 0.09]} radius={0.04} smoothness={3} position={[0, 1.28, 0]} castShadow>
          <meshStandardMaterial color={c.monitor} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 1.28, 0.055]}>
          <planeGeometry args={[2.34, 1.34]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1.28, 0.6]} intensity={0.5} color={c.rim} distance={3} decay={0} />
      </group>

      {/* keyboard */}
      <RoundedBox args={[1.5, 0.06, 0.5]} radius={0.03} smoothness={2} position={[0, 1.06, 0.4]} castShadow>
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </RoundedBox>
      {/* mouse */}
      <RoundedBox args={[0.16, 0.05, 0.26]} radius={0.05} smoothness={3} position={[1.0, 1.06, 0.42]}>
        <meshStandardMaterial color={c.keyboard} roughness={0.7} />
      </RoundedBox>

      {/* mug */}
      <mesh position={[-1.25, 1.13, 0.35]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.22, 18]} />
        <meshStandardMaterial color={c.hoodie} roughness={0.6} />
      </mesh>

      {/* desk lamp */}
      <group position={[1.45, 1.05, -0.35]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
          <meshStandardMaterial color="#17171b" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.66, 10]} />
          <meshStandardMaterial color="#17171b" roughness={0.5} />
        </mesh>
        <mesh position={[-0.16, 0.6, 0]} rotation={[0, 0, -0.7]}>
          <coneGeometry args={[0.16, 0.26, 18, 1, true]} />
          <meshStandardMaterial color="#2a2a30" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[-0.2, 0.5, 0.15]} color="#ffd9a6" intensity={1.4} distance={4} decay={0} />
      </group>

      {/* small plant */}
      <group position={[-1.55, 1.05, -0.3]}>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.1, 0.28, 14]} />
          <meshStandardMaterial color={c.plantPot} roughness={0.8} />
        </mesh>
        {[
          [0, 0.4, 0],
          [0.08, 0.34, 0.05],
          [-0.07, 0.34, -0.04],
        ].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <icosahedronGeometry args={[0.12, 0]} />
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color={c.floor} roughness={0.95} />
      </mesh>
      <mesh position={[0, 3, -2.6]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color={c.wallB} roughness={1} />
      </mesh>
      <mesh position={[-3.2, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color={c.wall} roughness={1} />
      </mesh>

      {/* window on the back wall */}
      <group position={[-1.4, 3.1, -2.57]}>
        <mesh>
          <planeGeometry args={[2.1, 1.6]} />
          <meshBasicMaterial color={c.rim} toneMapped={false} opacity={0.16} transparent />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.2, 0.06]} />
          <meshStandardMaterial color={c.wall} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.06, 1.7]} />
          <meshStandardMaterial color={c.wall} />
        </mesh>
      </group>

      {/* framed posters on the side wall */}
      {[
        [1.4, "#4f6ef7"],
        [0.2, "#7dd3fc"],
      ].map(([y, col], i) => (
        <mesh key={i} position={[-3.18, 2.6 - i * 1.2, y]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.0, 0.72]} />
          <meshStandardMaterial color={col} roughness={0.8} />
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
    group.current.rotation.y = animate
      ? Math.sin(t * 0.16) * 0.32 - 0.1
      : -0.1;
    group.current.position.y = animate ? Math.sin(t * 0.5) * 0.02 : 0;
  });

  return (
    <>
      <ambientLight intensity={c.amb} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={c.key}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-3, 4, 3]} intensity={0.35} color={c.rim} decay={0} />
      <pointLight position={[0, 2.4, 0.4]} intensity={0.5} color={c.rim} distance={7} decay={0} />
      {/* soft front fill so the figure keeps some shape */}
      <directionalLight position={[3, 2, 6]} intensity={dark ? 0.45 : 0.3} />
      <hemisphereLight
        intensity={dark ? 0.35 : 0.5}
        color={c.rim}
        groundColor={c.floor}
      />

      <group ref={group} position={[0, -1.15, 0]}>
        <Room c={c} />
        <Desk c={c} screen={screen} animate={animate} />
        <Chair c={c} />
        <Developer c={c} animate={animate} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={dark ? 0.55 : 0.35}
          scale={12}
          blur={2.6}
          far={5}
          resolution={512}
        />
      </group>
    </>
  );
}

export default function DevRoom({ dark = true, className = "" }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={REDUCED ? "demand" : "always"}
        camera={{ position: [5.4, 3.4, 6], fov: 34 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 0.1, -0.6)}
      >
        <Scene dark={dark} />
      </Canvas>
    </div>
  );
}
