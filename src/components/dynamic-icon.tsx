'use client';

import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export type IconName = keyof typeof dynamicIconImports;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

const IconCache: Partial<Record<IconName, React.ComponentType<LucideProps>>> = {};

const DynamicLucideIcon = memo(({ name, ...props }: DynamicIconProps) => {
  if (!name || !(name in dynamicIconImports)) {
    return null;
  }

  let LucideIcon = IconCache[name];

  if (!LucideIcon) {
    LucideIcon = dynamic(dynamicIconImports[name], {
      ssr: true,
    });
    IconCache[name] = LucideIcon;
  }

  return (
    <React.Suspense fallback={<Skeleton className={props.className} />}>
      <LucideIcon {...props} />
    </React.Suspense>
  );
});

DynamicLucideIcon.displayName = 'DynamicLucideIcon';

export default DynamicLucideIcon;
