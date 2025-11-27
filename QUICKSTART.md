# ⚡ 빠른 시작 가이드

골프장 날씨 앱을 **5분 안에** 실행하는 가장 빠른 방법입니다.

## 🎯 3단계로 시작하기

### 1️⃣ 의존성 설치 (2-3분)

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
npm install
```

> 💡 **처음 실행하는 경우**: Node.js가 설치되어 있어야 합니다. [Node.js 다운로드](https://nodejs.org/)

### 2️⃣ 개발 서버 실행 (10초)

```bash
npm run dev
```

터미널에 다음과 같은 메시지가 표시됩니다:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### 3️⃣ 브라우저에서 확인 ✅

웹 브라우저를 열고 주소창에 입력:
```
http://localhost:3000
```

**완료!** 🎉 골프장 날씨 앱이 실행됩니다!

---

## 🧪 테스트해보기

앱이 실행되면 다음을 시도해보세요:

1. ✅ **검색**: "스카이72" 또는 "서울" 검색
2. ✅ **필터**: 지역 버튼 클릭 (서울, 경기, 강원 등)
3. ✅ **상세보기**: 골프장 카드 클릭
4. ✅ **예보**: 시간별/주간 날씨 스크롤
5. ✅ **뒤로가기**: "목록으로" 버튼 클릭

---

## 📱 Android 앱 실행 (선택사항)

Android 스마트폰이나 에뮬레이터에서 실행하려면:

### 1️⃣ Android 프로젝트 추가

```bash
npm run cap:add:android
```

### 2️⃣ 앱 빌드 및 실행

```bash
npm run cap:run:android
```

> 💡 **Android Studio가 필요합니다**: [다운로드](https://developer.android.com/studio)

---

## 🛠️ 유용한 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (핫 리로드) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | 코드 검사 |

---

## 🆘 문제가 발생했나요?

### 포트가 이미 사용 중인 경우
```bash
npm run dev -- -p 3001
```
(포트 3000 대신 3001 사용)

### 설치 오류 발생 시
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### 더 자세한 도움이 필요하면
- 📖 [상세 설치 가이드](./SETUP.md)
- 📁 [프로젝트 구조 설명](./PROJECT_STRUCTURE.md)
- 📘 [README](./README.md)

---

## 🎓 다음 단계

앱이 잘 실행되었나요? 이제 다음을 시도해보세요:

1. 🎨 **커스터마이징**: 색상, 테마 변경 (`tailwind.config.ts`)
2. 📊 **데이터 추가**: 골프장 추가 (`src/data/mockData.ts`)
3. 🌐 **API 연동**: 실제 날씨 API 사용
4. 📱 **모바일 배포**: Android 앱으로 빌드

---

**즐거운 개발 되세요!** ⛳🌤️

궁금한 점이 있으면 언제든지 이슈를 등록해주세요!

