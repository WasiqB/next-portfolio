import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, callback?: () => void) => {
  callback?.();
  const href = e.currentTarget.getAttribute('href');
  if (href?.includes('#')) {
    const targetId = href.split('#')[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();
      const headerOffset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
};
