import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const LAYER_COLORS = [
  "#3fd8e0", // data
  "#4c8dff", // model
  "#9b7cf0", // inference
  "#4c8dff", // provenance
  "#f0b23f", // evidence
  "#3fe0a0", // human review
];

interface TrustCoreProps {
  activeLayer: number; // -1 = none highlighted
  pulse: number; // timestamp (ms) until which the active ring should read "hot"
  isMobile: boolean;
  reducedMotion: boolean;
}

/** One nested protection ring around the core. Brightens/scales when active. */
function ProtectionRing({
  index,
  radius,
  color,
  active,
  hot,
  reducedMotion,
}: {
  index: number;
  radius: number;
  color: string;
  active: boolean;
  hot: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (!reducedMotion) {
      mesh.rotation.z += dt * 0.03 * (index % 2 === 0 ? 1 : -1);
    }
    const targetOpacity = active ? (hot ? 0.9 : 0.7) : 0.16;
    const targetScale = active ? 1.06 : 1.0;
    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.opacity += (targetOpacity - mat.opacity) * 0.08;
    mesh.scale.x += (targetScale - mesh.scale.x) * 0.08;
    mesh.scale.y += (targetScale - mesh.scale.y) * 0.08;
    mesh.scale.z += (targetScale - mesh.scale.z) * 0.08;
  });

  return (
    <mesh
      ref={ref}
      rotation={[Math.PI / 2 + index * 0.18, index * 0.3, 0]}
    >
      <torusGeometry args={[radius, 0.012, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} />
    </mesh>
  );
}

/** Small nodes drifting along a ring's orbit; brighten when their layer is active. */
function OrbitNodes({
  radius,
  color,
  count,
  active,
}: {
  radius: number;
  color: string;
  count: number;
  active: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const angles = useMemo(
    () => new Array(count).fill(0).map(() => Math.random() * Math.PI * 2),
    [count]
  );
  const speeds = useMemo(
    () => new Array(count).fill(0).map(() => 0.1 + Math.random() * 0.2),
    [count]
  );

  useFrame((_, dt) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const scale = active ? 1.8 : 1;
    for (let i = 0; i < count; i++) {
      angles[i] += dt * speeds[i] * 0.3;
      const x = Math.cos(angles[i]) * radius;
      const z = Math.sin(angles[i]) * radius;
      dummy.position.set(x, 0, z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

/** Ambient particle field surrounding the whole structure. */
function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    const { pointer } = state;
    ref.current.rotation.y += dt * 0.008 + pointer.x * 0.0006;
    ref.current.rotation.x += pointer.y * 0.0004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6fb6ff" size={0.025} transparent opacity={0.55} />
    </points>
  );
}

/** The whole rig: core sphere + 6 rings + orbit nodes, rotating toward the cursor. */
function CoreRig({ activeLayer, pulse, isMobile, reducedMotion }: TrustCoreProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const { pointer, camera } = useThree();
  const autoAngle = useRef(0);

  useFrame((_, dt) => {
    if (reducedMotion) return;
    autoAngle.current += dt * 0.05;
    if (group.current) {
      const targetY = pointer.x * 0.6 + autoAngle.current;
      const targetX = -pointer.y * 0.35;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    }
    if (core.current) {
      core.current.rotation.y += dt * 0.12;
      core.current.rotation.x += dt * 0.04;
    }
    // subtle camera parallax
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  const hot = performance.now() < pulse;
  const nodeCount = isMobile ? 3 : 5;

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.1, isMobile ? 1 : 2]} />
        <meshBasicMaterial color="#3fd8e0" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color="#3fd8e0" transparent opacity={0.1} />
      </mesh>

      {LAYER_COLORS.map((color, i) => {
        const radius = 1.9 + i * 0.62;
        const active = i === activeLayer;
        return (
          <group key={i}>
            <ProtectionRing
              index={i}
              radius={radius}
              color={color}
              active={active}
              hot={hot}
              reducedMotion={reducedMotion}
            />
            <OrbitNodes radius={radius} color={color} count={nodeCount} active={active} />
          </group>
        );
      })}
    </group>
  );
}

export default function TrustCore3D({
  activeLayer,
  pulse,
  className,
}: {
  activeLayer: number;
  pulse: number;
  className?: string;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 760;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particleCount = isMobile ? 260 : 600;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <CoreRig
          activeLayer={activeLayer}
          pulse={pulse}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
}
