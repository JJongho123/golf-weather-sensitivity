# ⛳ 골프장 날씨 앱 (Golf Weather Sensitivity)

Next.js + Capacitor를 사용한 골프장 날씨 정보 모바일 앱입니다.

## 📱 주요 기능

- ✅ 전국 주요 골프장 날씨 정보 제공
- ✅ 지역별 골프장 필터링 (서울, 경기, 강원, 충청, 전라, 경상, 제주)
- ✅ 골프장 이름/위치 검색 기능
- ✅ 현재 날씨 정보 (온도, 습도, 풍속, 풍향)
- ✅ 24시간 시간별 날씨 예보
- ✅ 7일 주간 날씨 예보
- ✅ 강수 확률 표시


## 🛠️ 기술 스택

- **React 18.3.1**: 사용자 인터페이스 구축
- **Next.js 14.2.5**: React 기반의 서버 사이드 렌더링 프레임워크
- **TypeScript 5.5.3**: 타입 안정성을 위한 JavaScript 확장 언어
- **Tailwind CSS 3.4**: 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리
- **Capacitor 6.0**: 웹 앱을 네이티브 모바일 앱으로 변환하는 크로스 플랫폼 프레임워크
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트 시스템

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. Android 프로젝트 추가 (선택사항)

```bash
npm run cap:add:android
```

### 4. Android Studio에서 열기

```bash
npm run cap:open:android
```

### 5. 빌드 및 Android 앱 실행

```bash
# Next.js 앱 빌드
npm run build

# Capacitor 동기화
npm run cap:sync

# Android Studio에서 실행하거나
npm run cap:run:android
```

## 📂 프로젝트 구조

```
.
├── app/                      # Next.js App Router 디렉토리
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 메인 페이지 (골프장 날씨 앱)
│   └── globals.css           # 전역 스타일 (Tailwind CSS)
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── CourseListView.tsx       # 골프장 목록 뷰
│   │   ├── CourseDetailView.tsx     # 골프장 상세 뷰
│   │   ├── GolfCourseCard.tsx       # 골프장 카드 컴포넌트
│   │   ├── RegionFilter.tsx         # 지역 필터
│   │   ├── WeatherIcon.tsx          # 날씨 아이콘
│   │   ├── HourlyForecast.tsx       # 시간별 예보
│   │   ├── WeeklyForecast.tsx       # 주간 예보
│   │   └── ui/                      # shadcn/ui 컴포넌트
│   ├── data/
│   │   └── mockData.ts       # 골프장 목 데이터
│   └── types.ts              # TypeScript 타입 정의
├── lib/
│   └── utils.ts              # 유틸리티 함수 (cn 등)
├── public/                   # 정적 파일
├── capacitor.config.ts       # Capacitor 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── next.config.js            # Next.js 설정
└── package.json              # 프로젝트 의존성
```

## 🎨 주요 컴포넌트

### CourseListView
- 골프장 목록 표시
- 검색 기능 (이름, 위치)
- 지역별 필터링
- 골프장 카드 클릭 시 상세 페이지로 이동

### CourseDetailView
- 선택한 골프장의 상세 날씨 정보
- 현재 날씨 (온도, 습도, 풍속, 풍향)
- 24시간 시간별 예보 (스크롤 가능)
- 7일 주간 예보

### WeatherIcon
- 날씨 상태에 따른 아이콘 표시
- 맑음, 구름 조금, 흐림, 비, 폭우, 눈

## 📊 데이터 타입

```typescript
// 골프장 타입
interface GolfCourse {
  id: string;
  name: string;
  location: string;
  region: Region;
  currentWeather: WeatherData;
  hourlyForecast: HourlyWeather[];
  weeklyForecast: DailyWeather[];
}

// 날씨 상태
type WeatherCondition = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "stormy" | "snowy";

// 지역
type Region = "all" | "seoul" | "gyeonggi" | "gangwon" | "chungcheong" | "jeolla" | "gyeongsang" | "jeju";
```

## 🎯 주요 스크립트

- `npm run dev`: 개발 서버 실행 (포트 3000)
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 실행
- `npm run cap:sync`: Capacitor 동기화
- `npm run cap:open:android`: Android Studio 열기
- `npm run cap:run:android`: 빌드 후 Android 앱 실행
- `npm run dev:android`: 개발 서버 + Android Studio 동시 실행

