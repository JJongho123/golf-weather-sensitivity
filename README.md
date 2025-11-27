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
- ✅ 모바일 친화적인 UI/UX
- ✅ Android 앱 변환 지원

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

## 🔄 SSR vs 정적 빌드

이 프로젝트는 현재 **SSR(Server-Side Rendering) 모드**로 설정되어 있습니다.

### SSR 모드 (현재 설정)
- ✅ 서버 사이드 렌더링 사용 가능
- ✅ 동적 라우팅, API Routes 사용 가능
- ✅ 실시간 데이터 업데이트 가능
- ⚠️ 프로덕션에서 Next.js 서버 필요
- ⚠️ 네트워크 연결 필요

**사용 방법:**
1. 개발: `npm run dev` 실행 후 Android 앱에서 테스트
2. 프로덕션: Next.js 서버를 배포하고 `capacitor.config.ts`의 `server.url`을 프로덕션 URL로 변경

### 정적 빌드 모드 (선택사항)
오프라인 작동이 필요하거나 서버 없이 배포하려면:

1. `next.config.js`에서 `output: 'export'` 주석 해제
2. `capacitor.config.ts`에서 `webDir: 'out'` 주석 해제 및 `server.url` 제거
3. `npm run build` 실행 후 `npm run cap:sync`

## 🎨 디자인 특징

- **모바일 우선 디자인**: 터치 친화적인 UI
- **그라데이션 배경**: 파란색에서 초록색으로 부드러운 전환
- **카드 기반 레이아웃**: 정보를 명확하게 구분
- **스크롤 가능한 예보**: 24시간 및 주간 예보를 스크롤로 확인
- **직관적인 아이콘**: Lucide React 아이콘 사용
- **반응형 애니메이션**: 호버 및 클릭 효과

## 🔮 향후 개발 계획

- [ ] 실제 날씨 API 연동 (OpenWeatherMap, 기상청 API 등)
- [ ] 골프장 즐겨찾기 기능
- [ ] 위치 기반 가까운 골프장 추천
- [ ] 푸시 알림 (날씨 변화 알림)
- [ ] 다크 모드 지원
- [ ] iOS 앱 지원
- [ ] 골프장 상세 정보 (홀 수, 요금 등)
- [ ] 사용자 리뷰 및 평점

## 🐛 주의사항

- SSR 모드 사용 시 프로덕션 서버 URL을 `capacitor.config.ts`에 설정해야 합니다
- 개발 중에는 `localhost:3000`으로 자동 연결됩니다 (같은 네트워크에 있어야 함)
- `capacitor.config.ts`에서 `appId`를 고유한 값으로 변경하세요
- Android Studio와 Android SDK가 설치되어 있어야 Android 앱 빌드가 가능합니다

## 📝 라이선스

이 프로젝트는 학습 및 개발 목적으로 제작되었습니다.

## 👨‍💻 개발자

코드에 대한 질문이나 개선 사항이 있으면 이슈를 등록해주세요!
