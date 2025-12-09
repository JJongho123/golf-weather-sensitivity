'use client';

import { useEffect } from 'react';

/**
 * Capacitor 네이티브 기능 초기화 컴포넌트
 * 클라이언트에서만 실행되어야 하므로 별도 컴포넌트로 분리
 */
export function CapacitorInitializer() {
  useEffect(() => {
    // Capacitor가 브라우저에서 실행 중인지 확인
    if (typeof window !== 'undefined') {
      import('@capacitor/core').then(({ Capacitor }) => {
        if (Capacitor.isNativePlatform()) {
          console.log('네이티브 앱에서 실행 중');
          // 네이티브 기능 초기화
          initializeNativeFeatures();
        } else {
          console.log('웹 브라우저에서 실행 중');
        }
      }).catch(err => {
        console.log('Capacitor 로드 실패:', err);
      });
    }
  }, []);

  const initializeNativeFeatures = async () => {
    try {
      // StatusBar 설정
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#16a34a' });
      
      // Keyboard 설정
      const { Keyboard } = await import('@capacitor/keyboard');
      Keyboard.setAccessoryBarVisible({ isVisible: true });
    } catch (error) {
      console.log('네이티브 기능 초기화 실패:', error);
    }
  };

  return null; // UI 렌더링 없음
}

