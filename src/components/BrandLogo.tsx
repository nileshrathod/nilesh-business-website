import { siteConfig } from '../config/siteConfig';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="32"
          height="32"
          rx="8"
          className="fill-[#031634] dark:fill-white transition-colors duration-200"
        />
        <path
          d="M16 6.5L25 24.5H20.75L16 14.75L11.25 24.5H7L16 6.5Z"
          className="fill-white dark:fill-black transition-colors duration-200"
        />
        <path
          d="M16 17.5L19.5 24.5H12.5L16 17.5Z"
          className="fill-[#00CBA0] transition-colors duration-200"
        />
      </svg>
      <span className="font-display text-lg tracking-tight text-[#031634] dark:text-white transition-colors duration-200">
        <span className="font-bold">{siteConfig.brand.wordmarkPrimary}</span>{' '}
        <span className="font-medium text-[#031634]/70 dark:text-zinc-400">
          {siteConfig.brand.wordmarkSecondary}
        </span>
      </span>
    </span>
  );
}
