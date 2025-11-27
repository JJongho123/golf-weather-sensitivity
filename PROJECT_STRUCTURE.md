# 📁 골프장 날씨 앱 - 프로젝트 구조

이 문서는 프로젝트의 전체 구조와 각 파일의 역할을 설명합니다.

## 🗂️ 디렉토리 구조

```
golf-weather-sensitivity/
│
├── app/                          # Next.js App Router (페이지 및 레이아웃)
│   ├── globals.css              # 전역 스타일 (Tailwind CSS 포함)
│   ├── layout.tsx               # 루트 레이아웃 (메타데이터, HTML 구조)
│   └── page.tsx                 # 메인 페이지 (골프장 날씨 앱 진입점)
│
├── src/                          # 소스 코드 (컴포넌트, 데이터, 타입)
│   ├── components/              # React 컴포넌트
│   │   ├── CourseListView.tsx       # 골프장 목록 뷰 (검색, 필터)
│   │   ├── CourseDetailView.tsx     # 골프장 상세 뷰 (날씨 상세 정보)
│   │   ├── GolfCourseCard.tsx       # 골프장 카드 컴포넌트
│   │   ├── RegionFilter.tsx         # 지역 필터 버튼
│   │   ├── WeatherIcon.tsx          # 날씨 아이콘 (조건부 렌더링)
│   │   ├── HourlyForecast.tsx       # 24시간 시간별 예보
│   │   ├── WeeklyForecast.tsx       # 7일 주간 예보
│   │   └── ui/                      # shadcn/ui 재사용 컴포넌트
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ... (기타 UI 컴포넌트)
│   │
│   ├── data/                    # 데이터 관련 파일
│   │   └── mockData.ts             # 골프장 목 데이터 (10개 골프장)
│   │
│   └── types.ts                 # TypeScript 타입 정의
│
├── lib/                          # 유틸리티 함수
│   └── utils.ts                 # cn 함수 (className 병합)
│
├── public/                       # 정적 파일 (이미지, 아이콘 등)
│   └── manifest.json            # PWA 매니페스트
│
├── android/                      # Android 프로젝트 (cap:add:android 실행 후 생성)
│
├── .eslintrc.json               # ESLint 설정
├── .gitignore                   # Git 무시 파일
├── capacitor.config.ts          # Capacitor 설정 (앱 ID, 서버 URL)
├── next.config.js               # Next.js 설정
├── next-env.d.ts                # Next.js 타입 정의
├── package.json                 # 프로젝트 의존성 및 스크립트
├── postcss.config.js            # PostCSS 설정 (Tailwind CSS)
├── tailwind.config.ts           # Tailwind CSS 설정 (테마, 색상)
├── tsconfig.json                # TypeScript 설정
│
├── README.md                    # 프로젝트 개요 및 사용 방법
├── SETUP.md                     # 설치 가이드
└── PROJECT_STRUCTURE.md         # 이 파일 (프로젝트 구조 설명)
```

## 📄 주요 파일 설명

### 루트 설정 파일

#### `package.json`
- 프로젝트 의존성 및 스크립트 정의
- 주요 의존성: React, Next.js, Capacitor, Tailwind CSS, Lucide React
- 스크립트: dev, build, cap:sync, cap:run:android 등

#### `tsconfig.json`
- TypeScript 컴파일러 설정
- ES2020 타겟, JSX preserve, path aliases (`@/*`)

#### `next.config.js`
- Next.js 프레임워크 설정
- SSR 모드 (기본값), 정적 빌드 옵션 주석 처리

#### `tailwind.config.ts`
- Tailwind CSS 테마 설정
- 색상, 반경, 다크 모드 설정
- shadcn/ui 색상 변수 포함

#### `capacitor.config.ts`
- Capacitor 설정 (앱 ID, 이름, 서버 URL)
- 개발 환경: localhost:3000
- 프로덕션 환경: 사용자 서버 URL

### App Router (`app/`)

#### `app/layout.tsx`
- 루트 레이아웃 컴포넌트
- HTML 구조, 메타데이터 (제목, 설명, 키워드)
- PWA 설정 (테마 색상, 앱 아이콘)

#### `app/page.tsx`
- 메인 페이지 컴포넌트
- CourseListView와 CourseDetailView 간 전환
- Capacitor 네이티브 기능 초기화 (StatusBar, Keyboard)

#### `app/globals.css`
- Tailwind CSS 기본 설정 (@tailwind base, components, utilities)
- CSS 변수 (색상, 반경 등)
- 커스텀 유틸리티 (scrollbar-hide, active:scale-98)

### 소스 코드 (`src/`)

#### `src/types.ts`
- TypeScript 인터페이스 및 타입 정의
- `GolfCourse`: 골프장 데이터 구조
- `WeatherData`: 현재 날씨 정보
- `HourlyWeather`: 시간별 예보
- `DailyWeather`: 일별 예보
- `WeatherCondition`: 날씨 상태 (sunny, cloudy, rainy 등)
- `Region`: 지역 (seoul, gyeonggi, gangwon 등)

#### `src/data/mockData.ts`
- 10개 골프장의 샘플 데이터
- 각 골프장별 현재 날씨, 24시간 예보, 7일 예보
- 실제 API 연동 시 이 파일을 API 호출로 교체

### 컴포넌트 (`src/components/`)

#### `CourseListView.tsx`
- 골프장 목록 표시
- 검색 기능: 골프장 이름, 위치 검색
- 지역 필터: 전체, 서울, 경기 등
- 골프장 클릭 시 `onSelectCourse` 콜백 호출

#### `CourseDetailView.tsx`
- 선택한 골프장의 상세 날씨 정보
- 현재 날씨 카드 (온도, 습도, 풍속, 풍향)
- 시간별 예보 (HourlyForecast)
- 주간 예보 (WeeklyForecast)
- 뒤로가기 버튼 (`onBack` 콜백)

#### `GolfCourseCard.tsx`
- 골프장 카드 UI 컴포넌트
- 골프장 이름, 위치, 현재 날씨 요약
- 클릭 가능한 버튼 형태

#### `RegionFilter.tsx`
- 지역 필터 버튼 그룹
- 수평 스크롤 가능
- 선택된 지역 강조 표시

#### `WeatherIcon.tsx`
- 날씨 상태에 따라 아이콘 표시
- Lucide React 아이콘 사용 (Sun, Cloud, CloudRain 등)
- 색상 코드: 맑음(노란색), 흐림(회색), 비(파란색)

#### `HourlyForecast.tsx`
- 24시간 시간별 예보 카드
- 수평 스크롤 가능
- 시간, 날씨 아이콘, 온도, 강수 확률 표시

#### `WeeklyForecast.tsx`
- 7일 주간 예보 리스트
- 날짜, 요일, 날씨, 최고/최저 기온, 강수 확률
- 각 항목 사이 구분선

### 유틸리티 (`lib/`)

#### `lib/utils.ts`
- `cn()` 함수: className 병합 유틸리티
- `clsx`로 조건부 클래스 처리
- `tailwind-merge`로 중복 Tailwind 클래스 최적화
- 예: `cn('px-4', isActive && 'bg-blue-500')`

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Green (#16a34a) - 골프장 테마
- **Background**: Blue to Green Gradient - 하늘에서 잔디로
- **Text**: Gray shades - 가독성 최적화
- **Weather Icons**: 조건별 색상 (Sun: Yellow, Cloud: Gray, Rain: Blue)

### 타이포그래피
- **Font**: 시스템 기본 폰트 (antialiased)
- **Heading Sizes**: h1 (2xl), h2 (xl), h3 (lg)
- **Body Text**: Base size (16px)

### 레이아웃
- **Max Width**: 448px (md) - 모바일 최적화
- **Padding**: 16px (px-4)
- **Border Radius**: 16-24px (rounded-2xl, rounded-3xl) - 부드러운 곡선
- **Shadow**: md, lg - 카드 깊이감

## 🔄 데이터 흐름

```
app/page.tsx (메인)
  │
  ├─ selectedCourse === null
  │   └─> CourseListView
  │       ├─ RegionFilter (지역 선택)
  │       ├─ Search Input (검색)
  │       └─ GolfCourseCard[] (목록)
  │           └─ onClick -> setSelectedCourse(course)
  │
  └─ selectedCourse !== null
      └─> CourseDetailView
          ├─ Current Weather (현재 날씨)
          ├─ HourlyForecast (시간별 예보)
          └─ WeeklyForecast (주간 예보)
              └─ onBack -> setSelectedCourse(null)
```

## 🛠️ 기술 스택 상세

### 프론트엔드
- **React 18.3**: Hooks (useState, useEffect)
- **TypeScript 5.5**: 타입 안전성, 인터페이스, 타입 정의
- **Tailwind CSS 3.4**: 유틸리티 클래스 기반 스타일링

### 프레임워크
- **Next.js 14.2**: App Router, SSR, 파일 기반 라우팅
- **Capacitor 6.0**: 웹 to 모바일 변환, 네이티브 API 접근

### 라이브러리
- **Lucide React**: 아이콘 (600+ 아이콘)
- **clsx + tailwind-merge**: className 유틸리티
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트

### 개발 도구
- **ESLint**: 코드 품질 검사
- **PostCSS**: CSS 전처리
- **TypeScript Compiler**: 타입 검사

## 📱 Capacitor 통합

### 네이티브 기능
- **Status Bar**: 상단 상태바 스타일 (밝음/어두움)
- **Keyboard**: 키보드 설정 (악세서리바)
- **App**: 앱 생명주기 관리
- **Haptics**: 햅틱 피드백 (진동)

### 빌드 프로세스
1. `npm run build` - Next.js 빌드 (.next 또는 out)
2. `npm run cap:sync` - 빌드를 android/로 복사
3. Android Studio - 네이티브 빌드 및 서명

## 🚀 향후 확장 가능성

### API 연동
- `src/data/mockData.ts` → API 호출 함수로 교체
- OpenWeatherMap, 기상청 API 사용
- 실시간 데이터 업데이트

### 추가 기능
- 즐겨찾기 (로컬 스토리지 또는 백엔드)
- 위치 기반 추천 (Geolocation API)
- 푸시 알림 (Capacitor Push Notifications)
- 오프라인 모드 (Service Worker, PWA)
- 다크 모드 (Tailwind dark: 클래스)

### 플랫폼 확장
- iOS 지원 (Capacitor iOS 추가)
- 웹 앱 최적화 (SEO, 성능)
- 데스크톱 앱 (Electron 통합)

## 📚 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Capacitor 문서](https://capacitorjs.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)

---

이 프로젝트 구조는 확장 가능하고 유지보수하기 쉽게 설계되었습니다. 각 컴포넌트는 단일 책임 원칙을 따르며, 재사용 가능하도록 작성되었습니다.

