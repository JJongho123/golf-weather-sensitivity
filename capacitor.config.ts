import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.golfweather.app',
  appName: '골프장 날씨',
  
  // SSR 사용 시: webDir을 제거하고 server.url 사용
  // 정적 빌드 사용 시: webDir: 'out' 사용
  // webDir: 'out',
  
  server: {
    androidScheme: 'https',
    
    // 개발 환경: 로컬 Next.js 서버에 연결
    // npm run dev 실행 후 Android 앱에서 테스트 가능
    url: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://your-production-server.com', // 프로덕션 서버 URL
    
    // 개발 중 HTTP 사용을 위해 cleartext 활성화
    cleartext: process.env.NODE_ENV === 'development',
  },
  
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    },
  },
};

export default config;

