# 포트폴리오 Copilot 작업 가이드

## 빌드, 테스트 & 린트

### 필수 요구사항
- Node.js 24 LTS 필수
- npm (Node.js와 함께 설치됨)

### 명령어
```bash
npm install          # 의존성 설치 (클론 후 필수 실행)
npm run dev          # Vite 개발 서버 시작 (http://localhost:5173)
npm run build        # 프로덕션 빌드 → dist/ 폴더 생성
npm run lint         # OxLint 코드 품질 체크
npm run preview      # 프로덕션 빌드 로컬에서 미리보기
```

**중요**: 이 워크트리에서 명령어를 실행할 때 Node.js를 PATH에 포함해야 할 수 있습니다:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

## 아키텍처

단일 페이지 React 포트폴리오로 클라이언트 사이드 라우팅(해시 기반 네비게이션)을 사용합니다.

**핵심 구조:**
- **단일 컴포넌트 (`App.jsx`)** - `useSyncExternalStore`를 사용해 `window.location.hash`와 동기화되는 모든 라우팅 및 페이지 상태 관리
- **별도의 라우팅 라이브러리 없음** - 해시로 라우트 결정: `#/about`, `#/portfolio`, `#/portfolio/{style}`
- **정적 콘텐츠** - 모든 프로젝트, 텍스트, 설명은 App.jsx의 `projects` 배열에 저장 (CMS나 데이터베이스 없음)
- **React 19** - 최신 React를 사용하므로 현대적인 패턴 활용 가능 (클래스 컴포넌트 불필요)

**페이지 상태:**
1. **홈** (기본 해시 또는 `#home`) - 소개 및 행동 유도 섹션
2. **자기소개** (`#/about`) - 개인 소개 페이지
3. **포트폴리오 목록** (`#/portfolio`) - 모든 프로젝트의 그리드 표시
4. **프로젝트 상세** (`#/portfolio/{style}`) - 개별 프로젝트의 소개, 목표, 과정, 배운점

## 주요 규칙 및 패턴

### 디자인 시스템
- **색상** (`index.css`의 `:root`에 정의):
  - `--green: #315c44` (주요 강조색; 버튼, 링크, 하이라이트에 사용)
  - `--muted: #72786c` (보조 텍스트, 설명문)
  - `--line: #dfe1d8` (테두리, 구분선)
  - `background: #faf9f6` (따뜻한 오프화이트)
  
- **타이포그래피**:
  - 폰트 스택: `Pretendard`, 시스템 폰트 (CJK 언어 최적화)
  - 크기는 `clamp()`로 반응형 확대/축소 (예: `clamp(36px, 4.1vw, 57px)`)
  - 별도의 폰트 파일 없음; 시스템 웹 안전 폰트 사용

- **간격**:
  - 컨테이너 최대 너비: `1160px` + 패딩 (`.page-width` 유틸리티로 적용)
  - 반응형 패딩: `calc(100% - 96px)` (모바일 호환성)

### 컴포넌트 패턴
- **네비게이션 상태** - `useSyncExternalStore`로 React와 브라우저 해시 변화 동기화 (App.jsx 참고)
- **접근성** - 각 주요 섹션에 시맨틱 HTML (`<section>`, `<article>`) + `aria-labelledby`, `aria-current` 속성
- **포커스 관리** - 제목에 `tabIndex={-1}`을 사용해 새 페이지 이동 시 프로그래밍 방식으로 포커스 받을 수 있도록 함
- **줄어들기 모션 지원** - `prefers-reduced-motion: reduce` 미디어 쿼리 존중 (index.css 참고)

### 프로젝트 데이터 구조
`projects` 배열의 각 프로젝트 객체는 다음 필드를 포함합니다:
- `number`: "01", "02", "03" (표시 순서)
- `category`: "WEB · 웹사이트" 같은 문자열 (한국어 레이블 권장)
- `title`: 프로젝트 이름
- `description`: 한 줄짜리 요약
- `style`: "website", "idea", 또는 "creative" (`ProjectArtwork`의 시각 디자인 결정)
- `overview`, `goal`, `process` (배열), `learning`: 프로젝트 상세 페이지에 표시될 내용

### 스타일링 규칙
- **CSS 전용 컴포넌트** - 시맨틱 HTML + CSS 스타일링 (컴포넌트 라이브러리 없음)
- **그리드 레이아웃** - CSS Grid로 다중 컬럼 레이아웃 구성 (예: `.project-grid`는 `grid-template-columns: repeat(3, 1fr)`)
- **애니메이션** - 호버 상태에서 `transform: translateY()`로 미묘한 리프트 효과
- **Z-index 관리** - 스티키 헤더 `z-index: 10`, 오버레이와 부유 요소는 더 높은 z-index
- **격리** - 포지셔닝된 자식이 있는 컨테이너에 `isolation: isolate` 사용해 스택 컨텍스트 제어

### HTML 구조
- 시맨틱 요소 사용: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- 접근성을 위한 스킵 링크 포함 (`.skip-link`로 `#main`으로 이동)
- 네비게이션과 동적 콘텐츠에 항상 `aria-label`, `aria-labelledby`, `aria-current` 포함
- 버튼 텍스트는 설명적이어야 함; 아이콘만 필요한 경우 `<span aria-hidden="true">` 사용

## 자주 수정하는 부분

**개인 정보 업데이트:**
- 헤더 로고와 푸터: App.jsx의 `최호인` 참조 변경 (wordmark, footer)
- 홈 히어로 텍스트: 히어로 섹션의 `<h1>`과 설명문 편집
- 브라우저 탭 제목: useEffect의 document.title 로직 수정

**프로젝트 추가/편집:**
- `projects` 배열에 새 객체 추가 (필수 필드 포함)
- 새로운 `style` 카테고리 추가 시 `ProjectArtwork` 컴포넌트도 업데이트
- 새 `style` 값에 해당하는 CSS 클래스 추가

**색상 변경:**
- `index.css`의 `:root`에서 CSS 변수 수정
- 모든 색상 참조는 `var(--green)`, `var(--muted)`, `var(--line)` 사용 (일관성 유지)

**레이아웃/간격 조정:**
- 컨테이너 너비와 패딩: App.css의 `.page-width`
- 섹션 패딩: 해당 `padding-block` 값 수정
- 반응형 중단점: 현재 고정 미디어 쿼리 없이 `clamp()`로 유동적 확대/축소
