'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    const initCrisp = () => {
      setTimeout(() => {
        Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '');
      }, 2000);
    };

    if (document.readyState === 'complete') {
      initCrisp();
    } else {
      window.addEventListener('load', initCrisp);
      return () => window.removeEventListener('load', initCrisp);
    }
  }, []);
  return null;
};

export default CrispChat;
