# VibeCraft

AI 기반 대화형 데이터 분석 및 시각화 플랫폼입니다. 자연어 채팅을 통해 데이터를 업로드하고, AI가 추천하는 최적의 시각화를 실시간으로 생성할 수 있습니다.

## 🚀 주요 기능

- **대화형 인터페이스**: AI와 채팅을 통한 직관적인 데이터 분석
- **실시간 스트리밍**: SSE(Server-Sent Events)를 통한 실시간 응답
- **다양한 데이터 지원**: CSV 파일 업로드 및 파싱
- **스마트 시각화**: AI가 추천하는 최적의 차트 및 지도 시각화
- **동적 컴포넌트**: 메뉴, 데이터 테이블, 시각화 컴포넌트 실시간 렌더링
- **채널 관리**: 여러 분석 세션을 채널별로 관리

## 🛠 기술 스택

### Frontend

- **React 18** + **TypeScript** + **Vite**
- **Ant Design** + **Tailwind CSS** (UI Framework)
- **Zustand** (상태 관리)
- **React Router DOM** (라우팅)

### 데이터 & 시각화

- **Recharts** (차트 라이브러리)
- **React Leaflet** (지도 시각화)
- **Papa Parse** (CSV 파싱)
- **IndexedDB** (클라이언트 스토리지)

### 통신 & 실시간

- **Axios** (HTTP 클라이언트)
- **EventSource Parser** (SSE 통신)
- **Server-Sent Events** (실시간 스트리밍)

### 개발 도구

- **ESLint** + **TypeScript** (코드 품질)
- **PostCSS** + **Autoprefixer** (CSS 처리)

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/MilkLotion/vibecraft.git
cd vibecraft

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.development
# .env.development 파일을 열고 필요한 값들을 설정하세요

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속 (기본 포트)
```

### 환경 변수 설정

`.env.development` 파일에 다음 환경 변수를 설정하세요:

```bash
# API Server Configuration
VITE_API_BASE_URL=http://localhost:22041
VITE_API_HOST=localhost
VITE_API_PORT=22041

# Client Configuration
VITE_CLIENT_HOST=localhost
VITE_CLIENT_PORT=22042

# Environment
VITE_NODE_ENV=development
```

### 빌드

```bash
# 타입 체크
npm run type-check

# ESLint 실행
npm run lint

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🏗 프로젝트 구조

```
vibecraft/
├── src/
│   ├── components/              # 재사용 가능한 컴포넌트
│   │   ├── Guide.tsx           # 가이드 컴포넌트
│   │   ├── Intro.tsx           # 인트로 컴포넌트
│   │   ├── Process.tsx         # 프로세스 컴포넌트
│   │   └── chat/               # 채팅 관련 컴포넌트
│   │       ├── ComponentRenderer.tsx  # 동적 컴포넌트 렌더러
│   │       ├── DataTable.tsx   # 데이터 테이블
│   │       ├── Markdown.tsx    # 마크다운 렌더러
│   │       ├── Menu.tsx        # 메뉴 컴포넌트
│   │       ├── Uploader.tsx    # 파일 업로더
│   │       └── Visualize.tsx   # 시각화 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Main.tsx           # 메인 페이지
│   │   ├── Sidebar.tsx        # 사이드바
│   │   ├── ChatView.tsx       # 채팅 뷰
│   │   ├── PromptBox.tsx      # 프롬프트 입력박스
│   │   └── Channels.tsx       # 채널 관리
│   ├── core/                   # 핵심 비즈니스 로직
│   │   ├── services/          # 서비스 레이어
│   │   │   ├── dataService.ts      # 데이터 처리 서비스
│   │   │   ├── messageService.ts   # 메시지 서비스
│   │   │   ├── sseService.ts       # SSE 통신 서비스
│   │   │   ├── storageService.ts   # 스토리지 서비스
│   │   │   └── streamService.ts    # 스트림 처리 서비스
│   │   ├── stores/            # Zustand 상태 관리
│   │   │   ├── channelStore.ts     # 채널 상태
│   │   │   ├── chatStore.ts        # 채팅 상태
│   │   │   ├── loadingStore.ts     # 로딩 상태
│   │   │   └── sseStore.ts         # SSE 상태
│   │   └── types/             # 타입 정의
│   │       ├── channel.ts          # 채널 타입
│   │       ├── chat.ts             # 채팅 타입
│   │       └── sse.ts              # SSE 타입
│   ├── hooks/                  # 커스텀 React 훅
│   │   ├── useChannel.ts      # 채널 관리 훅
│   │   ├── useFileUpload.ts   # 파일 업로드 훅
│   │   ├── useSSE.ts          # SSE 통신 훅
│   │   └── useStorage.ts      # 스토리지 훅
│   ├── utils/                  # 유틸리티 함수
│   │   ├── apiEndpoints.ts    # API 엔드포인트
│   │   ├── fileUtils.ts       # 파일 처리 유틸
│   │   └── streamProcessor.ts # 스트림 처리 유틸
│   ├── types/                  # 글로벌 타입
│   │   ├── session.ts         # 세션 타입
│   │   └── upload.ts          # 업로드 타입
│   ├── message/                # 메시지 관련
│   │   ├── chat_option.ts     # 채팅 옵션
│   │   └── prompt.ts          # 프롬프트 설정
│   ├── config/                 # 설정 파일
│   │   └── env.ts             # 환경 설정
│   └── styles/                 # 스타일 파일
│       └── index.css          # 글로벌 스타일
├── sample/                     # 샘플 데이터
│   ├── airtravel.csv          # 항공 여행 데이터
│   ├── sample_data.csv        # 샘플 데이터
│   └── ...                    # 기타 샘플 파일들
├── old_project/                # 아카이브된 이전 버전 파일들
├── dist/                       # 빌드 결과물
└── public/                     # 정적 파일들
```

## 🎯 사용 방법

### 1. 채팅 시작

- 메인 페이지에서 새로운 채팅 채널을 생성하거나 기존 채널을 선택
- 하단의 프롬프트 박스에 데이터 분석 요청을 자연어로 입력

### 2. 데이터 업로드

- AI가 데이터 업로드를 요청하면 파일 업로더 컴포넌트가 나타남
- CSV 파일을 드래그 앤 드롭하거나 클릭하여 업로드

### 3. 데이터 분석

- 업로드된 데이터를 AI가 자동으로 분석
- 데이터 테이블 형태로 미리보기 제공
- 필요한 컬럼을 선택하여 분석 범위 조정

### 4. 시각화 생성

- AI가 데이터 특성에 맞는 최적의 시각화 방법을 추천
- 차트, 지도, 대시보드 등 다양한 형태의 시각화 제공
- 실시간으로 결과를 확인하고 추가 요청 가능

### 5. 채널 관리

- 여러 분석 세션을 채널별로 관리
- 각 채널의 진행 상황과 히스토리 확인
- 언제든지 이전 분석으로 돌아가서 추가 작업 가능

## 🔧 개발 가이드

### 컴포넌트 아키텍처

- **ComponentRenderer**: 서버에서 전송된 컴포넌트 타입에 따라 동적으로 렌더링
- **Chat System**: 실시간 채팅 인터페이스와 메시지 관리
- **State Management**: Zustand를 활용한 전역 상태 관리

### SSE 통신 플로우

```
Client → Send Message → Server
Server → Process → AI Analysis
Server → SSE Stream → Real-time Updates
Client → Render Components → User Interaction
```

### 새로운 컴포넌트 추가

1. `src/core/types/chat.ts`에 새로운 ComponentType 추가
2. `src/components/chat/`에 컴포넌트 구현
3. `ComponentRenderer.tsx`에 렌더링 로직 추가

## 📡 API 연동

### 서버 요구사항

- SSE(Server-Sent Events) 지원
- 다음 엔드포인트 제공:
  - `POST /api/chat` - 채팅 메시지 전송
  - `GET /api/sse` - SSE 스트림 연결
  - `POST /api/upload` - 파일 업로드

### 메시지 형식

```typescript
interface ChatMessage {
  id: string;
  type: "ai" | "human" | "component";
  content?: string;
  componentType?: ComponentType;
  componentData?: any;
  timestamp: string;
}
```

## 🚀 배포

### 환경별 설정

- **개발**: `.env.development`
- **프로덕션**: `.env.production`

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 정적 파일 서빙 (예: nginx, apache)
# 또는 Vercel, Netlify 등 정적 호스팅 서비스 이용
```

### 개발 규칙

- TypeScript 타입 정의 필수
- ESLint 규칙 준수
- 컴포넌트는 함수형으로 작성
- 상태 관리는 Zustand 사용

## 📄 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**VibeCraft** - AI 기반 대화형 데이터 분석의 새로운 경험 🎨✨
