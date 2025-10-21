// @ts-nocheck
import React from 'react';

const CurvedLogo = ({ className = '', size = 96, title = 'Focsera' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            width={size}
            height={size}
            role="img"
            aria-label={title}
            className={className}
        >
            <defs>
                <linearGradient id="curvedGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#00C2FF" />
                    <stop offset="100%" stopColor="#0052CC" />
                </linearGradient>
                <filter id="softDrop" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.12" />
                </filter>
            </defs>

            {/* rounded square background with soft drop shadow */}
            <rect x="6" y="6" rx="20" ry="20" width="108" height="108" fill="url(#curvedGrad)" filter="url(#softDrop)" />

            {/* subtle inner highlight */}
            <rect x="10" y="10" rx="16" ry="16" width="100" height="100" fill="rgba(255,255,255,0.06)" />

            {/* monogram 'F' centered */}
            <g transform="translate(60,66)">
                <path d="M-18 -26 L-2 -26 C6 -26 14 -22 14 -10 C14 2 6 6 -2 6 L-18 6 Z" fill="#fff" opacity="0.95" />
                <rect x="-20" y="-4" width="40" height="8" rx="2" fill="#fff" opacity="0.9" transform="translate(0,6)" />
            </g>
        </svg>
    );
};

export default CurvedLogo;
