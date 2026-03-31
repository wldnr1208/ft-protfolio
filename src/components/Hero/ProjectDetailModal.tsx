"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Project 타입 정의 (ProjectsSection과 동일)
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  gradient: string;
  image: string;
  link?: string;
  androidLink?: string;
  year: string;
  role: string;
}

// ProjectDetailModal Props
interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrintPdf = () => {
    if (!printRef.current || !project) return;
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${project.title} - 프로젝트 상세</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; padding: 24px; line-height: 1.5; }
          h2 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
          h3 { font-size: 17px; font-weight: 700; margin-bottom: 8px; margin-top: 16px; border-bottom: 2px solid #7750E9; padding-bottom: 4px; }
          h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; margin-top: 10px; color: #333; }
          p { font-size: 13px; color: #555; margin-bottom: 8px; }
          ul { list-style: none; padding-left: 0; margin-bottom: 4px; }
          li { font-size: 12px; color: #555; margin-bottom: 2px; padding-left: 14px; position: relative; line-height: 1.4; }
          li::before { content: ''; position: absolute; left: 0; top: 6px; width: 5px; height: 5px; border-radius: 50%; background: #7750E9; }
          .header { background: linear-gradient(135deg, #7c3aed, #6b21a8); color: white; padding: 20px 24px; border-radius: 10px; margin-bottom: 12px; }
          .header h2 { color: white; }
          .header .meta { font-size: 13px; opacity: 0.9; margin-top: 4px; }
          .tech-list { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
          .tech-tag { background: #f3f4f6; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; color: #374151; }
          .achievement-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
          .achievement-item { background: #f9fafb; padding: 6px 10px; border-radius: 6px; font-size: 12px; color: #374151; }
          @media print { body { padding: 16px; } .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; } h3 { page-break-after: avoid; } h4 { page-break-after: avoid; } }
        </style>
      </head>
      <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // 바슈롬 어드민 프로젝트 상세 내용
  const bauschDetails = {
    scale:
      "개발 인원: 4명 (프론트엔드 2명, 백엔드 2명) | 본인 역할: 프론트엔드 개발 (기여도 50%) | 개발 기간: 6개월",

    keyFeatures: [
      {
        title: "아토믹 디자인 패턴 적용",
        details: [
          "컴포넌트의 재사용성과 유지보수성 향상",
          "공통 UI 컴포넌트 라이브러리 구축",
          "일관된 디자인 시스템 확립",
        ],
      },
      {
        title: "커스텀 훅 개발",
        details: [
          "페이지네이션 로직 모듈화",
          "공통 코드 관리를 위한 커스텀 훅 개발",
          "코드 중복 제거 및 재사용성 향상",
        ],
      },
      {
        title: "상태 관리 시스템",
        details: [
          "Redux Toolkit과 Redux-Saga를 활용한 체계적인 상태 관리",
          "비동기 작업 처리 로직 구현",
          "API 통신 및 에러 핸들링",
        ],
      },
      {
        title: "위치 기반 서비스",
        details: [
          "카카오맵 API를 활용한 위치 시각화",
          "백엔드에서 전달받은 위/경도 데이터 기반 현재 위치 표시",
          "지도 내 마커 및 정보창 구현",
        ],
      },
    ],

    achievements: [
      "아토믹 패턴 도입으로 코드 재사용성 30% 향상",
      "커스텀 훅 개발로 중복 코드 40% 감소",
      "직관적인 UI/UX 구현으로 관리자 작업 효율성 개선",
      "위치 기반 서비스 도입으로 매장 관리 효율성 증대",
    ],

    problemSolving: [
      {
        title: "성능 최적화",
        solutions: [
          "불필요한 리렌더링 방지를 위한 메모이제이션 적용",
          "이미지 최적화 및 레이지 로딩 구현",
          "API 응답 데이터 캐싱 처리",
        ],
      },
      {
        title: "코드 품질 관리",
        solutions: [
          "ESLint, Prettier를 활용한 코드 컨벤션 확립",
          "주기적인 코드 리뷰 진행",
        ],
      },
    ],

    significance: [
      "대규모 어드민 시스템의 프론트엔드 아키텍처 설계 경험",
      "아토믹 디자인 패턴을 실제 프로젝트에 적용한 경험",
      "위치 기반 서비스 구현 및 최적화 경험",
      "팀 협업을 통한 대규모 프로젝트 완성",
    ],
  };

  // Lensly 프로젝트 상세 내용
  const lenslyDetails = {
    scale:
      "QA 기간: 1개월 | 본인 역할: QA 기간 프론트엔드 개발 | 참여 시점: 프로젝트 QA 단계",

    keyTasks: [
      {
        title: "메인 페이지 UI 개선",
        details: [
          "슬라이더 컴포넌트 반응형 디자인 수정",
          "네비게이션 바 모바일 대응 개선",
          "전반적인 CSS 구조 수정 및 최적화",
        ],
      },
      {
        title: "매장 리스트 페이지 개발",
        details: [
          "매장 검색 결과를 보여주는 새로운 페이지 구현",
          "검색 결과에 따른 매장 정보 표시",
          "모바일/데스크톱 환경을 고려한 반응형 디자인 적용",
        ],
      },
      {
        title: "위치 기반 기능 개선",
        details: [
          "카카오맵 API 연동 부분 버그 수정",
          "매장 위치 검색 기능 최적화",
          "사용자 현재 위치 기반 검색 개선",
          "지도 마커 UI 수정",
        ],
      },
    ],

    bugFixes: [
      {
        title: "UI/UX 관련",
        items: [
          "메인 페이지 슬라이더 반응형 이슈 해결",
          "네비게이션 바 모바일 뷰 개선",
          "매장 리스트 페이지 레이아웃 최적화",
        ],
      },
      {
        title: "기능 관련",
        items: [
          "위치 기반 검색 정확도 향상",
          "매장 정보 표시 버그 수정",
          "검색 필터 동작 개선",
        ],
      },
    ],

    achievements: [
      "메인 페이지 UI 안정성 확보",
      "모바일 환경 사용성 개선",
      "위치 기반 검색 기능 최적화",
    ],

    significance: [
      "QA 과정에서의 프론트엔드 개발 경험",
      "기존 코드 분석 및 버그 수정 능력 향상",
      "반응형 디자인 최적화 경험",
      "위치 기반 서비스 개선 경험",
    ],
  };
  const bauschAppDetails = {
    scale:
      "개발 인원: 1명 (단독 프론트엔드 개발) | 본인 역할: React Native 앱 마이그레이션 전담 | 개발 기간: 1개월 2주",

    keyFeatures: [
      {
        title: "개발 환경 구축",
        details: [
          "Android Studio를 통한 안드로이드 로컬 개발 환경 설정",
          "Xcode를 통한 iOS 로컬 개발 환경 설정",
          "React Native 디버깅 환경 구축",
        ],
      },
      {
        title: "Expo SDK 마이그레이션",
        details: [
          "App Store 정책 준수를 위한 Expo 37에서 48로 긴급 업그레이드",
          "호환성 이슈 해결 및 의존성 패키지 업데이트",
          "네이티브 모듈 및 API 호환성 검토 및 수정",
          "iOS/Android 빌드 시스템 최신화",
        ],
      },
      {
        title: "앱스토어 대응",
        details: [
          "App Store 정책 요구사항 분석 및 대응",
          "iOS 최신 버전 호환성 확보",
          "앱 심사 기준 준수를 위한 코드 개선",
          "스토어 배포 프로세스 개선",
        ],
      },
      {
        title: "CodePush 통합",
        details: [
          "App Center CodePush 설정 및 구현",
          "긴급 패치 및 핫픽스를 위한 실시간 업데이트 시스템 구축",
          "iOS/Android 플랫폼별 버전 관리 구현",
        ],
      },
    ],

    achievements: [
      "App Store 정책 대응으로 서비스 중단 위기 해결",
      "로컬 개발 환경 구축으로 개발 생산성 향상",
      "Expo SDK 업그레이드를 통한 앱 안정성 확보",
      "크로스 플랫폼(iOS/Android) 개발 환경 최적화",
      "실시간 업데이트 시스템으로 배포 시간 90% 단축",
    ],

    problemSolving: [
      {
        title: "개발 환경 구축",
        solutions: [
          "Android Studio 설정 및 환경 변수 구성",
          "Xcode 개발자 인증 및 프로비저닝 프로파일 설정",
          "플랫폼별 빌드 스크립트 최적화",
        ],
      },
      {
        title: "앱스토어 대응",
        solutions: [
          "iOS 최신 버전 요구사항 분석",
          "앱 심사 가이드라인 준수",
          "버전 호환성 이슈 해결",
          "배포 프로세스 개선",
        ],
      },
    ],

    significance: [
      "위기 상황에서의 신속한 문제 해결 능력 입증",
      "React Native 크로스 플랫폼 개발 환경 구축 경험",
      "레거시 앱 마이그레이션 단독 수행 경험",
      "앱스토어 정책 대응 및 심사 프로세스 이해도 향상",
    ],
  };

  // Fibud Career 프로젝트 상세 내용
  const fibudDetails = {
    scale:
      "개발 기간: 2025.12 - 현재 | 본인 역할: 프론트엔드 엔지니어 | 아키텍처: Turborepo 모노레포 + FSD",

    keyFeatures: [
      {
        title: "Turborepo 모노레포 아키텍처 설계",
        details: [
          "Expert, Consumer, Center, HR, Toss 5개 앱을 단일 레포에서 관리",
          "공통 패키지(UI, utils, config)를 packages 디렉토리로 분리하여 코드 재사용",
          "Turborepo 파이프라인으로 빌드/린트/테스트 병렬 실행 최적화",
          "앱 간 의존성 관리 및 버전 통합",
        ],
      },
      {
        title: "교육 탭 시스템 (자격증·교육·VOD)",
        details: [
          "홈/자격증/교육/VOD 탭 기반 네비게이션 구현",
          "주제·레벨·강의유형·요일·정렬 다중 필터 시스템",
          "React Query의 Infinite Query를 활용한 무한 스크롤 과정 리스트",
          "과정 상세 페이지: 커리큘럼, 일정, 리뷰, 강사 정보 통합 제공",
          "구독/단건 결제 시스템 및 Toss Payments 연동",
        ],
      },
      {
        title: "수강 관리 대시보드 (MyTap)",
        details: [
          "구독중/신청완료/결제완료/수강중/수강완료/수강만료 상태 관리",
          "드래그 기반 카드 슬라이더 컴포넌트 구현",
          "온라인LIVE/오프라인/하이브리드 강의 유형별 UI 분기",
          "카카오맵 SDK 연동으로 오프라인 강의 위치 표시",
        ],
      },
      {
        title: "트레이너 프로필·포트폴리오 시스템",
        details: [
          "트레이너 소개, 경력, 자격증, 수상 이력 프로필 페이지",
          "포트폴리오(임상 데이터) 조회 기능",
          "친절도/전문성/시간 약속 카테고리별 리뷰 시스템",
          "위치 기반 트레이너 검색 및 거리 계산",
          "원포인트/전체 강의 탭 필터링",
        ],
      },
      {
        title: "FSD(Feature-Sliced Design) 아키텍처",
        details: [
          "app/features/entities/widgets/shared 레이어 기반 코드 구조",
          "도메인별 관심사 분리로 확장성과 유지보수성 확보",
          "React Query 기반 서버 상태 관리 및 캐싱 전략",
          "공통 API 클래스 패턴으로 엔드포인트 관리",
        ],
      },
    ],

    achievements: [
      "5개 앱을 모노레포로 통합하여 코드 재사용성 및 개발 효율성 향상",
      "교육 플랫폼 전체 프론트엔드 아키텍처 설계 및 구현",
      "다중 필터 + 무한 스크롤로 사용자 탐색 경험 최적화",
      "FSD 아키텍처 도입으로 팀 간 코드 일관성 확보",
      "트레이너-소비자 연결 플랫폼 전체 플로우 구현",
    ],

    problemSolving: [
      {
        title: "모노레포 빌드 최적화",
        solutions: [
          "Turborepo 캐싱으로 변경된 앱만 선택적 빌드",
          "공통 패키지 변경 시 영향받는 앱 자동 감지",
          "CI/CD 파이프라인에서 병렬 빌드로 배포 시간 단축",
        ],
      },
      {
        title: "교육 데이터 관리 최적화",
        solutions: [
          "React Query의 staleTime/cacheTime 설정으로 불필요한 API 호출 감소",
          "Infinite Query prefetching으로 스크롤 시 로딩 지연 최소화",
          "필터 변경 시 쿼리 키 기반 자동 리페칭",
        ],
      },
      {
        title: "멀티 앱 상태 관리",
        solutions: [
          "앱별 독립적인 상태 관리 + 공통 유틸리티 공유",
          "API 클래스 패턴으로 엔드포인트 중앙 관리",
          "타입 안전성을 위한 공통 타입 패키지 운영",
        ],
      },
    ],

    significance: [
      "대규모 모노레포 아키텍처 설계 및 운영 경험",
      "FSD 아키텍처를 실제 프로덕션 프로젝트에 적용한 경험",
      "교육 플랫폼 도메인의 복잡한 비즈니스 로직 구현 경험",
      "멀티 앱 환경에서의 코드 재사용 및 일관성 관리 경험",
      "결제 시스템 연동 및 구독 모델 구현 경험",
    ],
  };

  // 위즈커넥트 앱 프로젝트 상세 내용
  const wizconnectAppDetails = {
    scale:
      "개발 기간: 2025.06 - 2025.09 (4개월) | 본인 역할: 프론트엔드 엔지니어 | 플랫폼: iOS/Android",

    keyFeatures: [
      {
        title: "소셜 로그인 및 본인인증 시스템",
        details: [
          "카카오, 네이버, 애플 소셜 로그인 연동",
          "PG사 본인인증 시스템 통합",
          "OAuth 2.0 기반 인증 플로우 구현",
          "토큰 기반 세션 관리 및 자동 갱신",
        ],
      },
      {
        title: "효율적인 데이터 관리 시스템",
        details: [
          "React-Query를 활용한 서버 상태 관리 및 자동 캐싱",
          "Optimistic Update로 사용자 경험 개선",
          "Infinite Query를 통한 무한 스크롤 구현",
          "Zustand를 이용한 클라이언트 전역 상태 관리",
        ],
      },
      {
        title: "클럽(커뮤니티) 기능",
        details: [
          "관심사 기반 클럽 생성 및 가입 시스템",
          "클럽 멤버 관리 및 권한 설정",
          "클럽별 피드 및 게시물 관리",
          "클럽 검색 및 추천 알고리즘 구현",
        ],
      },
      {
        title: "소셜 피드 시스템",
        details: [
          "게시물 작성, 수정, 삭제 기능",
          "이미지 업로드 및 최적화",
          "댓글 및 대댓글 시스템",
          "좋아요 및 북마크 기능",
          "실시간 피드 업데이트",
        ],
      },
      {
        title: "푸시 알림 시스템",
        details: [
          "Firebase Cloud Messaging (FCM) 연동",
          "알림 권한 관리 및 설정",
          "클럽 활동, 댓글, 좋아요 등 다양한 알림 유형 지원",
          "백그라운드 및 포어그라운드 알림 처리",
        ],
      },
    ],

    achievements: [
      "소셜 로그인 및 본인인증으로 사용자 인증 편의성 향상",
      "React-Query 도입으로 API 호출 최적화 및 캐싱 효율 개선",
      "클럽 기반 커뮤니티 시스템으로 사용자 참여도 증대",
      "직관적인 UI/UX로 높은 사용자 만족도 달성",
      "App Store/Google Play 정식 출시 및 운영",
    ],

    problemSolving: [
      {
        title: "성능 최적화",
        solutions: [
          "React-Query의 staleTime, cacheTime 설정으로 불필요한 API 호출 감소",
          "이미지 레이지 로딩 및 압축으로 로딩 속도 개선",
          "FlatList 가상화로 대량의 피드 렌더링 성능 향상",
          "메모이제이션을 통한 불필요한 리렌더링 방지",
        ],
      },
      {
        title: "상태 관리 최적화",
        solutions: [
          "React-Query로 서버 상태와 클라이언트 상태 분리",
          "Zustand의 경량 특성을 활용한 전역 상태 관리",
          "선택적 리렌더링으로 성능 개선",
        ],
      },
      {
        title: "사용자 경험 개선",
        solutions: [
          "Optimistic Update로 즉각적인 UI 피드백 제공",
          "로딩 스켈레톤 UI로 체감 대기 시간 감소",
          "에러 바운더리를 통한 안정적인 에러 처리",
          "오프라인 모드 대응 및 재연결 로직 구현",
        ],
      },
    ],

    significance: [
      "소셜 네트워크 서비스의 전반적인 개발 경험",
      "React-Query를 활용한 서버 상태 관리 실무 경험",
      "대규모 사용자 대상 앱 개발 및 최적화 경험",
      "소셜 로그인 및 본인인증 시스템 구현 경험",
      "실시간 알림 시스템 구현 및 운영 경험",
    ],
  };

  // 국립과천과학관 디지털가이드 앱 프로젝트 상세 내용
  const museumAppDetails = {
    scale:
      "개발 기간: 2025.02 - 2025.04 (3개월) | 본인 역할: 프론트엔드 엔지니어 | 플랫폼: iOS/Android",

    keyFeatures: [
      {
        title: "비콘 블루투스 통신 시스템",
        details: [
          "비콘(Beacon) 블루투스 신호를 이용한 실시간 위치 추적",
          "전시물 근접 시 자동으로 해당 전시물 정보 표시",
          "비콘 데이터 수신 및 처리를 위한 커스텀 훅 개발",
          "블루투스 권한 관리 및 연결 상태 모니터링",
        ],
      },
      {
        title: "상태 관리 아키텍처",
        details: [
          "Redux Toolkit을 활용한 전역 상태 관리 시스템 구축",
          "비동기 작업(API 호출, 비콘 데이터 처리) 효율적 관리",
          "zustand를 이용한 다국어(한글/영어) 번역 콘텐츠 상태 관리",
          "상태 지속성(persistence) 구현으로 사용자 경험 개선",
        ],
      },
      {
        title: "전시관 내비게이션",
        details: [
          "실내 지도 기반 관람객 위치 표시",
          "전시물별 위치 정보 및 동선 안내",
          "층별 전시관 구조 시각화",
          "현재 위치에서 전시물까지의 경로 안내",
        ],
      },
      {
        title: "콘텐츠 관리 시스템",
        details: [
          "전시물별 상세 설명, 이미지, 영상 콘텐츠 제공",
          "다국어 지원(한국어/영어) 콘텐츠 관리",
          "오프라인 모드 지원을 위한 로컬 캐싱",
          "관람 이력 및 즐겨찾기 기능",
        ],
      },
    ],

    achievements: [
      "비콘 기반 위치 추적 정확도 95% 이상 달성",
      "Redux Toolkit과 zustand를 활용한 효율적인 상태 관리 구현",
      "다국어 지원으로 외국인 관람객 편의성 향상",
      "직관적인 UI/UX로 전 연령층 사용성 확보",
      "App Store/Google Play 정식 출시 및 운영",
    ],

    problemSolving: [
      {
        title: "비콘 신호 안정성",
        solutions: [
          "비콘 신호 강도에 따른 필터링 알고리즘 개발",
          "다중 비콘 신호 처리 및 우선순위 로직 구현",
          "신호 끊김 대응을 위한 재연결 메커니즘 구현",
        ],
      },
      {
        title: "성능 최적화",
        solutions: [
          "이미지 및 미디어 콘텐츠 레이지 로딩 적용",
          "메모이제이션을 통한 불필요한 리렌더링 방지",
          "비콘 데이터 수신 주기 최적화로 배터리 소모 최소화",
        ],
      },
      {
        title: "상태 관리 최적화",
        solutions: [
          "Redux Toolkit의 createSlice로 보일러플레이트 코드 최소화",
          "zustand의 경량 특성을 활용한 번역 상태 관리",
        ],
      },
    ],

    significance: [
      "비콘 블루투스 통신을 활용한 실시간 위치 기반 서비스 개발 경험",
      "React Native 크로스 플랫폼 앱 개발 실무 경험",
      "Redux Toolkit과 zustand를 함께 활용한 하이브리드 상태 관리 경험",
      "공공기관 프로젝트 개발 및 협업 경험",
      "실제 서비스 출시 및 운영 경험",
    ],
  };

  const isFibudProject = project.id === 1; // Fibud Career 프로젝트
  const isWizconnectAppProject = project.id === 2; // 위즈커넥트 앱 프로젝트
  const isMuseumAppProject = project.id === 3; // 국립과천과학관 디지털가이드 앱 프로젝트
  const isLenslyProject = project.id === 4; // Lensly 프로젝트 ID
  const isBauschProject = project.id === 5; // 바슈롬 프로젝트 ID
  const isBauschAppProject = project.id === 6; // BAUSCH_APP 프로젝트

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* 모달 */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-4 md:inset-8 lg:inset-12 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col`}
          >
            {/* 헤더 */}
            <div className="relative h-48 md:h-64 flex-shrink-0 overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
              />
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-30"
                />
              )}

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">×</span>
              </button>

              {/* 타이틀 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm md:text-base">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.role}</span>
                  {isBauschProject && (
                    <>
                      <span>•</span>
                      <span>2024.05 - 2024.10</span>
                    </>
                  )}
                  {isLenslyProject && (
                    <>
                      <span>•</span>
                      <span>2024.01 - 2024.02</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 컨텐츠 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
              {/* 프로젝트 소개 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-4">프로젝트 소개</h3>
                <p
                  className={`text-lg leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.longDescription}
                </p>
              </motion.div>

              {/* 기술 스택 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-4">기술 스택</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {isFibudProject && (
                <>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {fibudDetails.scale}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 구현 기능</h3>
                    <div className="space-y-6">
                      {fibudDetails.keyFeatures.map((feature, index) => (
                        <div key={index}>
                          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                            {feature.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`} />
                                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fibudDetails.achievements.map((achievement, index) => (
                        <div key={index} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                          <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {index + 1}. {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">문제 해결</h3>
                    <div className="space-y-4">
                      {fibudDetails.problemSolving.map((problem, index) => (
                        <div key={index}>
                          <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                            {problem.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {problem.solutions.map((solution, idx) => (
                              <li key={idx} className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {fibudDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`} />
                          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}

              {isBauschProject && (
                <>
                  {/* 프로젝트 규모 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p
                      className={`text-base ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {bauschDetails.scale}
                    </p>
                  </motion.div>

                  {/* 주요 구현 기능 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 구현 기능</h3>
                    <div className="space-y-6">
                      {bauschDetails.keyFeatures.map((feature, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                                />
                                <span
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 성과 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bauschDetails.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            isDarkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                        >
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {index + 1}. {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 문제 해결 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">문제 해결</h3>
                    <div className="space-y-4">
                      {bauschDetails.problemSolving.map((problem, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {problem.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {problem.solutions.map((solution, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 프로젝트 의의 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {bauschDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}

              {isLenslyProject && (
                <>
                  {/* 프로젝트 규모 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p
                      className={`text-base ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {lenslyDetails.scale}
                    </p>
                  </motion.div>

                  {/* 주요 수행 업무 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 수행 업무</h3>
                    <div className="space-y-6">
                      {lenslyDetails.keyTasks.map((task, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {task.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                                />
                                <span
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 버그 수정 및 개선 사항 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      버그 수정 및 개선 사항
                    </h3>
                    <div className="space-y-4">
                      {lenslyDetails.bugFixes.map((category, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {category.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {category.items.map((item, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 주요 성과 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">주요 성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {lenslyDetails.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            isDarkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                        >
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {index + 1}. {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 프로젝트 의의 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {lenslyDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}
              {isBauschAppProject && (
                <>
                  {/* 프로젝트 규모 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p
                      className={`text-base ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {bauschAppDetails.scale}
                    </p>
                  </motion.div>

                  {/* 주요 구현 기능 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 구현 기능</h3>
                    <div className="space-y-6">
                      {bauschAppDetails.keyFeatures.map((feature, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                                />
                                <span
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 성과 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bauschAppDetails.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              isDarkMode ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {index + 1}. {achievement}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* 문제 해결 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">문제 해결</h3>
                    <div className="space-y-4">
                      {bauschAppDetails.problemSolving.map((problem, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {problem.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {problem.solutions.map((solution, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 프로젝트 의의 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {bauschAppDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}

              {isWizconnectAppProject && (
                <>
                  {/* 프로젝트 규모 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p
                      className={`text-base ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {wizconnectAppDetails.scale}
                    </p>
                  </motion.div>

                  {/* 주요 구현 기능 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 구현 기능</h3>
                    <div className="space-y-6">
                      {wizconnectAppDetails.keyFeatures.map((feature, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                                />
                                <span
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 성과 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wizconnectAppDetails.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              isDarkMode ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {index + 1}. {achievement}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* 문제 해결 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">문제 해결</h3>
                    <div className="space-y-4">
                      {wizconnectAppDetails.problemSolving.map((problem, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {problem.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {problem.solutions.map((solution, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 프로젝트 의의 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {wizconnectAppDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}

              {isMuseumAppProject && (
                <>
                  {/* 프로젝트 규모 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 규모</h3>
                    <p
                      className={`text-base ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {museumAppDetails.scale}
                    </p>
                  </motion.div>

                  {/* 주요 구현 기능 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6">주요 구현 기능</h3>
                    <div className="space-y-6">
                      {museumAppDetails.keyFeatures.map((feature, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                                />
                                <span
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 성과 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {museumAppDetails.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              isDarkMode ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {index + 1}. {achievement}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* 문제 해결 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">문제 해결</h3>
                    <div className="space-y-4">
                      {museumAppDetails.problemSolving.map((problem, index) => (
                        <div key={index}>
                          <h4
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {problem.title}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {problem.solutions.map((solution, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 프로젝트 의의 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">프로젝트 의의</h3>
                    <ul className="space-y-2">
                      {museumAppDetails.significance.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}
              {!isFibudProject && !isBauschProject && !isLenslyProject && !isBauschAppProject && !isMuseumAppProject && !isWizconnectAppProject && (
                /* 다른 프로젝트의 기본 정보 */
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold mb-4">주요 기능</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${project.gradient}`}
                        />
                        <span
                          className={`${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* 액션 버튼 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {project.androidLink ? "iOS 다운로드" : "프로젝트 보기"}
                  </a>
                )}
                {project.androidLink && (
                  <a
                    href={project.androidLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Android 다운로드
                  </a>
                )}
                <button
                  onClick={handlePrintPdf}
                  className={`px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r ${project.gradient} text-white hover:opacity-90`}
                >
                  PDF 저장
                </button>
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                    isDarkMode
                      ? "border-gray-600 text-white hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  닫기
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* 숨겨진 PDF 출력용 콘텐츠 */}
    {project && (
      <div ref={printRef} style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div className="header">
          <h2>{project.title}</h2>
          <div className="meta">{project.year} | {project.role}</div>
        </div>

        <h3>프로젝트 소개</h3>
        <p>{project.longDescription}</p>

        <h3>기술 스택</h3>
        <div className="tech-list">
          {project.tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>

        {(() => {
          const details = isFibudProject ? fibudDetails
            : isWizconnectAppProject ? wizconnectAppDetails
            : isMuseumAppProject ? museumAppDetails
            : isBauschProject ? bauschDetails
            : isBauschAppProject ? bauschAppDetails
            : isLenslyProject ? lenslyDetails
            : null;

          if (!details) {
            return (
              <div className="section">
                <h3>주요 기능</h3>
                <ul>
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            );
          }

          return (
            <>
              <div className="section">
                <h3>프로젝트 규모</h3>
                <p>{details.scale}</p>
              </div>

              <div className="section">
                <h3>주요 구현 기능</h3>
                {("keyFeatures" in details ? details.keyFeatures : "keyTasks" in details ? details.keyTasks : []).map((feature: { title: string; details: string[] }, i: number) => (
                  <div key={i}>
                    <h4>{feature.title}</h4>
                    <ul>
                      {feature.details.map((d: string, j: number) => <li key={j}>{d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="section">
                <h3>성과</h3>
                <div className="achievement-grid">
                  {details.achievements.map((a: string, i: number) => (
                    <div key={i} className="achievement-item">{i + 1}. {a}</div>
                  ))}
                </div>
              </div>

              {"problemSolving" in details && (
                <div className="section">
                  <h3>문제 해결</h3>
                  {details.problemSolving.map((p: { title: string; solutions: string[] }, i: number) => (
                    <div key={i}>
                      <h4>{p.title}</h4>
                      <ul>
                        {p.solutions.map((s: string, j: number) => <li key={j}>{s}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="section">
                <h3>프로젝트 의의</h3>
                <ul>
                  {details.significance.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </>
          );
        })()}
      </div>
    )}
    </>
  );
};

export default ProjectDetailModal;
