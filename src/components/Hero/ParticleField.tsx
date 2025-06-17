import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Props 타입 정의
interface ParticleFieldProps {
  isDarkMode: boolean;
}

// 메인 컴포넌트 - props 타입을 명시적으로 지정
function ParticleField({ isDarkMode }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = isDarkMode ? 5000 : 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      if (isDarkMode) {
        // 다크모드: 우주의 별들 - 더 균등한 분포
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        // 흰색/노란빛 별들
        const brightness = 0.7 + Math.random() * 0.3;
        const starType = Math.random();

        if (starType < 0.7) {
          // 흰색 별
          colors[i * 3] = brightness;
          colors[i * 3 + 1] = brightness;
          colors[i * 3 + 2] = brightness;
        } else if (starType < 0.85) {
          // 푸른빛 별
          colors[i * 3] = brightness * 0.8;
          colors[i * 3 + 1] = brightness * 0.9;
          colors[i * 3 + 2] = brightness;
        } else {
          // 노란빛 별
          colors[i * 3] = brightness;
          colors[i * 3 + 1] = brightness * 0.9;
          colors[i * 3 + 2] = brightness * 0.7;
        }
      } else {
        // 라이트모드: 더 균등한 박스 분포
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        // 부드러운 블루/퍼플 그라디언트
        const distanceFromCenter = Math.sqrt(
          positions[i * 3] * positions[i * 3] +
            positions[i * 3 + 1] * positions[i * 3 + 1] +
            positions[i * 3 + 2] * positions[i * 3 + 2]
        );
        const normalizedDistance = distanceFromCenter / 40;
        const hue = 240 + normalizedDistance * 60;
        const saturation = 0.6 + Math.random() * 0.3;
        const lightness = 0.4 + Math.random() * 0.4;

        // HSL을 RGB로 변환
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = lightness - c / 2;

        let r, g, b;
        if (hue < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (hue < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (hue < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (hue < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (hue < 300) {
          r = x;
          g = 0;
          b = c;
        } else {
          r = c;
          g = 0;
          b = x;
        }

        colors[i * 3] = r + m;
        colors[i * 3 + 1] = g + m;
        colors[i * 3 + 2] = b + m;
      }
    }

    return { positions, colors };
  }, [isDarkMode]);

  useFrame((state) => {
    if (ref.current) {
      if (isDarkMode) {
        // 다크모드: 매우 천천히 회전하는 우주 (속도를 1/4로 줄임)
        ref.current.rotation.y = state.clock.elapsedTime * 0.001; // 0.008 → 0.002
        ref.current.rotation.x =
          Math.sin(state.clock.elapsedTime * 0.001) * 0.01; // 0.003 → 0.001
      } else {
        // 라이트모드: 부드럽고 느린 파티클 움직임 (속도를 1/3로 줄임)
        const positions = ref.current.geometry.attributes.position
          .array as Float32Array;

        ref.current.rotation.y = state.clock.elapsedTime * 0.002; // 0.025 → 0.008

        // 파티클 웨이브 애니메이션 - 더 느리고 부드럽게
        for (let i = 0; i < positions.length; i += 3) {
          const time = state.clock.elapsedTime;
          const index = i / 3;

          positions[i] += Math.sin(time * 0.1 + index * 0.008) * 0.0003; // 속도와 움직임 감소
          positions[i + 1] += Math.cos(time * 0.08 + index * 0.015) * 0.0003;
          positions[i + 2] += Math.sin(time * 0.09 + index * 0.012) * 0.0003;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
      }

      // 마우스 인터랙션 - 더 미묘하게
      const mouse = state.mouse;
      ref.current.rotation.x += mouse.y * 0.005; // 0.015 → 0.005
      ref.current.rotation.z += mouse.x * 0.003; // 0.008 → 0.003
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={3}
        sizeAttenuation={false}
        depthWrite={false}
        blending={isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDarkMode ? 0.8 : 0.6}
      />
    </points>
  );
}

export default ParticleField;
