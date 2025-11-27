import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '골프장 날씨 - Golf Weather',
  description: '전국 주요 골프장의 실시간 날씨 정보와 예보를 확인하세요. 온도, 습도, 풍속, 강수 확률 등 골프 라운딩에 필요한 모든 날씨 정보를 제공합니다.',
  keywords: '골프장, 날씨, 골프, 기상정보, 날씨예보, 골프장날씨',
  authors: [{ name: 'Golf Weather Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#16a34a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '골프장 날씨',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

