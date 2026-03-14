import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, callback?: () => void) => {
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;

  if (href.includes('#')) {
    const [path, hash] = href.split('#');
    const isHomePage = path === '/' || path === '';
    const isCurrentlyOnHomePage = window.location.pathname === '/';

    const isCurrentPage = (isHomePage && isCurrentlyOnHomePage) || path === window.location.pathname;

    if (isCurrentPage && hash) {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        e.preventDefault();
        callback?.();

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        return;
      }
    }
  }

  callback?.();
};
