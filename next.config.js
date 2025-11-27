/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR 사용 시: output: 'export' 제거
  // 정적 빌드 사용 시: output: 'export' 주석 해제
  // output: 'export',
  
  // SSR 사용 시에는 distDir 설정 불필요 (기본값: .next)
  // distDir: 'out',
  
  images: {
    // SSR 사용 시에는 최적화 사용 가능
    // unoptimized: true,
  },
  
  trailingSlash: true,
}

module.exports = nextConfig

