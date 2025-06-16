"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ParticleField from "./ParticleField";

// Props 타입 정의
interface ThreeBackgroundProps {
  isDarkMode: boolean;
}

// 로딩 컴포넌트
function LoadingFallback({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div
      className={`absolute inset-0 ${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      } flex items-center justify-center`}
    >
      <div className="relative">
        <div
          className={`w-8 h-8 border-2 ${
            isDarkMode ? "border-white" : "border-blue-400"
          } border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  );
}

// 메인 컴포넌트 - props 타입을 명시적으로 지정
export function ThreeBackground({ isDarkMode }: ThreeBackgroundProps) {
  return (
    <div className="absolute inset-0 z-10">
      <Suspense fallback={<LoadingFallback isDarkMode={isDarkMode} />}>
        <Canvas
          camera={{
            position: [0, 0, 15],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          {isDarkMode ? (
            // 다크모드: 미니멀한 조명
            <>
              <ambientLight intensity={0.1} color="#ffffff" />
              <pointLight
                position={[0, 0, 10]}
                intensity={0.2}
                color="#ffffff"
                distance={50}
                decay={1}
              />
            </>
          ) : (
            // 라이트모드: 부드러운 컬러 조명
            <>
              <ambientLight intensity={0.2} color="#f0f4ff" />
              <pointLight
                position={[10, 5, 10]}
                intensity={0.3}
                color="#8b5cf6"
                distance={25}
                decay={1.5}
              />
              <pointLight
                position={[-10, -5, 5]}
                intensity={0.2}
                color="#06b6d4"
                distance={20}
                decay={1.5}
              />
              <pointLight
                position={[0, 10, -10]}
                intensity={0.15}
                color="#ec4899"
                distance={30}
                decay={2}
              />
            </>
          )}

          {/* 환경 효과 */}
          {!isDarkMode && <fog attach="fog" args={["#f8fafc", 20, 60]} />}

          {/* 파티클 필드 */}
          <ParticleField isDarkMode={isDarkMode} />
        </Canvas>
      </Suspense>
    </div>
  );
}
