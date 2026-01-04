'use client';

import { useVariableValue } from '@devcycle/nextjs-sdk';
import type { ReactNode } from 'react';

interface ConditionalSectionProps {
  variableKey: string;
  defaultValue: boolean;
  children: ReactNode;
}

export function ConditionalSection({ variableKey, defaultValue, children }: ConditionalSectionProps) {
  const showSection = useVariableValue(variableKey, defaultValue);

  if (!showSection) {
    return null;
  }

  return <>{children}</>;
}
