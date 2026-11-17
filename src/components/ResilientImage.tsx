import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'AASTRA Digital Architecture',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F3FF] via-white to-[#00CBA0]/10 dark:from-black dark:via-[#0A0A0A] dark:to-[#00CBA0]/15 border border-[#031634]/10 dark:border-white/10 p-8 text-center ${className}`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-[#111111] border border-[#031634]/10 dark:border-white/10 text-[#00876A] dark:text-[#00CBA0]">
          <Layers className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-[#031634] dark:text-white">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
