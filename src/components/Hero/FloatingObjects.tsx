"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouse = state.mouse;

    if (groupRef.current) {
      // 전체 그룹의 부드러운 회전
      groupRef.current.rotation.y = time * 0.03;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    // 각 객체의 개별 애니메이션
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const offset = index * 0.8;

        // 유기적인 움직임
        mesh.position.y += Math.sin(time * 0.4 + offset) * 0.002;
        mesh.position.x += Math.cos(time * 0.3 + offset) * 0.001;
        mesh.position.z += Math.sin(time * 0.6 + offset) * 0.0015;

        // 회전
        mesh.rotation.x = time * (0.1 + index * 0.05);
        mesh.rotation.y = time * (0.08 + index * 0.03);
        mesh.rotation.z = time * (0.06 + index * 0.02);

        // 마우스 인터랙션
        mesh.position.x += mouse.x * 0.2 * (1 + index * 0.1);
        mesh.position.y += mouse.y * 0.15 * (1 + index * 0.1);

        // 크기 펄스
        const scale = 1 + Math.sin(time * 1.5 + offset) * 0.1;
        mesh.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 크리스탈 모양 객체 1 */}
      <mesh
        ref={(el) => el && (meshRefs.current[0] = el)}
        position={[4, 2, -1]}
      >
        <octahedronGeometry args={[1.2, 2]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.3}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 다이아몬드 모양 객체 2 */}
      <mesh
        ref={(el) => el && (meshRefs.current[1] = el)}
        position={[2.5, -1.5, 1.5]}
      >
        <icosahedronGeometry args={[0.8, 1]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          transparent
          opacity={0.9}
          roughness={0.05}
          metalness={0.1}
          transmission={0.95}
          thickness={0.3}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 복잡한 기하학적 형태 3 */}
      <mesh
        ref={(el) => el && (meshRefs.current[2] = el)}
        position={[3.8, 0.5, 0.2]}
      >
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshPhysicalMaterial
          color="#ec4899"
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1.2}
          clearcoat={0.9}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* 플라즈마 구체 4 */}
      <mesh
        ref={(el) => el && (meshRefs.current[3] = el)}
        position={[1.8, 1.8, -0.8]}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
          envMapIntensity={2}
        />
      </mesh>

      {/* 추상적인 형태 5 */}
      <mesh
        ref={(el) => el && (meshRefs.current[4] = el)}
        position={[5.2, -0.8, 0.8]}
      >
        <tetrahedronGeometry args={[0.7, 2]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.2}
          transmission={0.8}
          thickness={0.4}
          envMapIntensity={1.8}
          clearcoat={0.8}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* 미니 플로팅 오브젝트들 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`mini-${i}`}
          ref={(el) => el && (meshRefs.current[5 + i] = el)}
          position={[
            2 + Math.cos(i * 0.5) * 3,
            -2 + Math.sin(i * 0.7) * 3,
            -1 + Math.sin(i * 0.3) * 2,
          ]}
        >
          <octahedronGeometry args={[0.1 + Math.random() * 0.1, 1]} />
          <meshPhysicalMaterial
            color={`hsl(${240 + i * 15}, 70%, 60%)`}
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.8}
            emissive={`hsl(${240 + i * 15}, 70%, 30%)`}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* 홀로그래픽 링 */}
      <mesh
        ref={(el) => el && (meshRefs.current[17] = el)}
        position={[3.5, 2.5, 0.5]}
        rotation={[Math.PI / 4, 0, Math.PI / 6]}
      >
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          transmission={0.5}
          thickness={0.1}
          envMapIntensity={2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 에너지 필드 */}
      <mesh
        ref={(el) => el && (meshRefs.current[18] = el)}
        position={[2, -2.5, 1]}
      >
        <torusKnotGeometry args={[0.4, 0.12, 64, 8, 2, 3]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          emissive="#3730a3"
          emissiveIntensity={0.3}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

export default FloatingObjects;
