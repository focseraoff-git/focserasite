import React from 'react';

// Hand-drawn curved arrow pointing to an element
export const DoodleArrow: React.FC<{ className?: string; color?: string; flip?: boolean }> = ({
  className = 'w-16 h-12',
  color = '#C7EB49',
  flip = false,
}) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
  >
    <path
      d="M10 45 C 30 10, 70 15, 88 38"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeDasharray="1 0"
    />
    <path
      d="M74 38 L 88 38 L 86 24"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Sparkle / Star 4-point doodle
export const DoodleSparkle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#C7EB49',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
  </svg>
);

// Underline swoosh doodle for editorial emphasis
export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full h-3',
  color = '#C7EB49',
}) => (
  <svg
    viewBox="0 0 200 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
  >
    <path
      d="M3 11C45 4, 120 2, 197 12C140 8, 70 8, 15 14"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn loop doodle
export const DoodleLoop: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#35102F',
}) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 35 C 10 15, 30 10, 40 25 C 48 37, 25 50, 18 35 C 12 20, 35 15, 52 40"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Sticker badge component
export const StickerBadge: React.FC<{
  text: string;
  className?: string;
  bg?: string;
  textColor?: string;
  rotate?: string;
}> = ({
  text,
  className = '',
  bg = 'bg-[#C7EB49]',
  textColor = 'text-[#35102F]',
  rotate = '-rotate-2',
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-black tracking-wider uppercase rounded-full border-2 border-[#35102F] shadow-[2px_3px_0px_#35102F] select-none ${bg} ${textColor} ${rotate} transition-transform duration-200 hover:scale-105 hover:rotate-0 ${className}`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#35102F] animate-ping" />
    {text}
  </span>
);

// Abstract geometric stamp
export const GeometricStamp: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="50" cy="50" r="44" stroke="#35102F" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="34" fill="#EDE2FA" stroke="#35102F" strokeWidth="2" />
    <polygon points="50,26 58,42 75,44 62,56 66,73 50,64 34,73 38,56 25,44 42,42" fill="#C7EB49" stroke="#35102F" strokeWidth="1.5" />
  </svg>
);
