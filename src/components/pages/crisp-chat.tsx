'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('53194034-1b90-4d18-8613-81e9a54d3fdf');
  }, []);
  return null;
};

export default CrispChat;
