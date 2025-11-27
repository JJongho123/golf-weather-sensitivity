# ⚙️ 골프장 날씨 앱 설치 가이드

이 문서는 골프장 날씨 앱을 처음부터 설치하고 실행하는 방법을 안내합니다.

## 📋 사전 요구사항

### 필수 설치 항목

1. **Node.js** (v18.0.0 이상)
   - [Node.js 공식 웹사이트](https://nodejs.org/)에서 다운로드
   - 설치 확인: `node --version`

2. **npm** 또는 **yarn**
   - Node.js 설치 시 npm은 자동으로 설치됩니다
   - 확인: `npm --version`

### Android 앱 빌드를 위한 추가 요구사항 (선택사항)

3. **Android Studio**
   - [Android Studio 다운로드](https://developer.android.com/studio)
   - Android SDK 및 에뮬레이터 설치

4. **Java Development Kit (JDK)** (버전 17 권장)
   - Android Studio에 포함되어 있습니다

## 🚀 설치 단계

### 1단계: 프로젝트 클론 또는 다운로드

```bash
# Git을 사용하는 경우
git clone <repository-url>
cd golf-weather-sensitivity

# 또는 ZIP 파일을 다운로드하고 압축 해제
```

### 2단계: 의존성 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
npm install
```

이 명령어는 다음을 설치합니다:
- React, Next.js, TypeScript (핵심 프레임워크)
- Tailwind CSS (스타일링)
- Capacitor (모바일 앱 변환)
- Lucide React (아이콘)
- 기타 필요한 라이브러리

**설치 시간**: 약 2-5분 (인터넷 속도에 따라 다름)

### 3단계: 개발 서버 실행

```bash
npm run dev
```

웹 브라우저에서 다음 주소를 엽니다:
```
http://localhost:3000
```

✅ **성공!** 골프장 날씨 앱이 브라우저에서 실행됩니다.

## 📱 Android 앱 빌드 (선택사항)

Android 앱으로 변환하려면 다음 단계를 따르세요.

### 1단계: Android 프로젝트 추가

```bash
npm run cap:add:android
```

이 명령어는 `android/` 폴더를 생성하고 Capacitor Android 프로젝트를 초기화합니다.

### 2단계: 앱 빌드

```bash
npm run build
```

Next.js 앱을 프로덕션 모드로 빌드합니다.

### 3단계: Capacitor 동기화

```bash
npm run cap:sync
```

빌드된 웹 앱을 Android 프로젝트에 복사합니다.

### 4단계: Android Studio에서 열기

```bash
npm run cap:open:android
```

Android Studio가 자동으로 열립니다.

### 5단계: Android 앱 실행

Android Studio에서:
1. 에뮬레이터를 선택하거나 실제 Android 기기를 연결합니다
2. 상단의 ▶ (Run) 버튼을 클릭합니다
3. 앱이 빌드되고 설치됩니다 (첫 빌드는 5-10분 소요)

## 🔧 문제 해결

### 문제: `npm install` 실패

**해결 방법:**
```bash
# 캐시 삭제 후 재시도
npm cache clean --force
npm install
```

### 문제: 포트 3000이 이미 사용 중

**해결 방법:**
```bash
# 다른 포트 사용 (예: 3001)
npm run dev -- -p 3001
```

### 문제: Android 빌드 실패

**해결 방법:**
1. Android Studio에서 SDK Manager를 열고 필요한 SDK를 설치합니다
2. JDK 17이 설치되어 있는지 확인합니다
3. `android/` 폴더를 삭제하고 `npm run cap:add:android`를 다시 실행합니다

### 문제: Tailwind 스타일이 적용되지 않음

**해결 방법:**
```bash
# 개발 서버 재시작
# Ctrl+C로 서버 중지 후
npm run dev
```

## 📝 환경 변수 설정 (선택사항)

프로젝트 루트에 `.env.local` 파일을 생성합니다:

```env
# 개발 환경
NODE_ENV=development

# 프로덕션 서버 URL (배포 시 필요)
NEXT_PUBLIC_API_URL=https://your-server.com

# 향후 날씨 API 사용 시
# NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
```

## 🎯 다음 단계

1. **코드 이해하기**
   - `src/components/` - React 컴포넌트
   - `src/data/mockData.ts` - 샘플 데이터
   - `src/types.ts` - TypeScript 타입 정의

2. **커스터마이징**
   - `tailwind.config.ts` - 색상 및 테마 변경
   - `app/globals.css` - 전역 스타일 수정
   - `src/data/mockData.ts` - 골프장 데이터 추가/수정

3. **실제 API 연동**
   - OpenWeatherMap API 또는 기상청 API 사용
   - `src/data/mockData.ts` 대신 API 호출로 교체

## 📚 유용한 명령어 모음

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린트 검사
npm run lint

# Capacitor 동기화
npm run cap:sync

# Android Studio 열기
npm run cap:open:android

# 빌드 후 Android 앱 실행
npm run cap:run:android
```

## 🆘 추가 도움이 필요하신가요?

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Capacitor 공식 문서](https://capacitorjs.com/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [React 공식 문서](https://react.dev/)

## 🎉 축하합니다!

골프장 날씨 앱 설치가 완료되었습니다. 즐거운 개발 되세요! ⛳🌤️

