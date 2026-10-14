import React from 'react';

interface BeyondLogoProps {
  className?: string;
  variant?: 'dark' | 'light'; // dark = plum text (on cream/white), light = cream/white text (on plum)
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BeyondLogo: React.FC<BeyondLogoProps> = ({
  className = '',
  variant = 'dark',
  showTagline = false,
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#35102F' : '#FFF9EF';
  const subColor = isDark ? 'rgba(53, 16, 47, 0.75)' : 'rgba(255, 249, 239, 0.8)';

  // Scale settings
  const sizeClasses = {
    sm: {
      text: 'text-2xl',
      sub: 'text-[9px] tracking-[0.25em] -mt-0.5',
      sunSize: 'w-6 h-6',
      doodleSize: 'w-3 h-3',
    },
    md: {
      text: 'text-3xl sm:text-4xl',
      sub: 'text-[10px] tracking-[0.3em] -mt-1',
      sunSize: 'w-7 h-7 sm:w-8 sm:h-8',
      doodleSize: 'w-4 h-4',
    },
    lg: {
      text: 'text-4xl sm:text-5xl lg:text-6xl',
      sub: 'text-xs tracking-[0.35em] mt-0.5',
      sunSize: 'w-9 h-9 sm:w-12 sm:h-12',
      doodleSize: 'w-5 h-5',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col select-none group ${className}`}>
      <div className="flex items-center relative">
        {/* Little hand-drawn sparkle accent above the wordmark */}
        <svg
          className={`absolute -top-2 -left-2.5 ${sizeClasses.doodleSize} text-[#C7EB49] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6L12 0Z" />
        </svg>

        {/* Wordmark: bey + sunrise 'o' + nd */}
        <span
          className={`font-black tracking-tight leading-none beyond-font-heading flex items-center ${sizeClasses.text}`}
          style={{ color: textColor }}
        >
          <span>bey</span>

          {/* Lime sunrise-inspired 'o' */}
          <span className={`relative inline-flex items-center justify-center mx-[1px] ${sizeClasses.sunSize}`}>
            <svg
              viewBox="0 0 44 44"
              className="w-full h-full transform transition-transform duration-500 group-hover:rotate-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sun rays radiating from sunrise */}
              <path d="M22 2V8" stroke="#C7EB49" strokeWidth="3" strokeLinecap="round" />
              <path d="M7.8 7.8L12 12" stroke="#C7EB49" strokeWidth="3" strokeLinecap="round" />
              <path d="M36.2 7.8L32 12" stroke="#C7EB49" strokeWidth="3" strokeLinecap="round" />
              <path d="M2 22H8" stroke="#C7EB49" strokeWidth="3" strokeLinecap="round" />
              <path d="M36 22H42" stroke="#C7EB49" strokeWidth="3" strokeLinecap="round" />

              {/* Sunrise arc / glowing sun base */}
              <circle cx="22" cy="22" r="14" fill="#C7EB49" />
              {/* Inner horizon glow */}
              <circle cx="22" cy="22" r="7" fill={textColor} />
            </svg>
          </span>

          <span>nd</span>
        </span>

        {/* Small sparkle on right */}
        <svg
          className={`ml-1.5 ${sizeClasses.doodleSize} text-[#C7EB49] opacity-80`}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <circle cx="8" cy="8" r="3" />
        </svg>
      </div>

      {/* "BY FOCSERA" spaced uppercase subtitle */}
      <span
        className={`font-bold uppercase beyond-font-sans transition-opacity duration-200 ${sizeClasses.sub}`}
        style={{ color: subColor }}
      >
        BY FOCSERA
      </span>

      {showTagline && (
        <span className="text-[11px] font-medium text-[#35102F]/65 mt-1 italic beyond-font-serif">
          Beyond Classrooms. Into What's Next.
        </span>
      )}
    </div>
  );
};

export default BeyondLogo;
