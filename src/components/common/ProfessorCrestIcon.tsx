import React from 'react';

interface ProfessorCrestIconProps {
  className?: string;
  size?: number;
}

export const ProfessorCrestIcon: React.FC<ProfessorCrestIconProps> = ({
  className = "w-9 h-9 sm:w-10 sm:h-10",
  size = 40
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-xs transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="Dr. Rajnikant S. Dodiya Hero Quill Emblem"
    >
      <defs>
        {/* Burnished Antique Gold Metallic Gradient */}
        <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0B3" />
          <stop offset="30%" stopColor="#F5DC9A" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
      </defs>

      {/* Oxford Navy Rounded Square Base */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="#142236"
        stroke="url(#heroGold)"
        strokeWidth="1.2"
      />

      {/* HERO QUILL FEATHER (The Main Centerpiece Highlight) */}
      {/* Upper & Lower Feather Vane Plumes with Natural Barbs */}
      <path
        d="M29 6C26 8 21 13 17 19C16 20.5 17 21 18.5 20.5C21 19 25 15 27 11.5M29 6C31 8 31 11.5 28.5 14C26.5 16 23 17.5 20.5 18.5M29 6C28 11 23 18 13 28L10 31L13 28C17 24 22 17 29 6Z"
        fill="url(#heroGold)"
      />

      {/* Central Gilded Quill Shaft / Rachis */}
      <line
        x1="29"
        y1="6"
        x2="10.5"
        y2="30.5"
        stroke="#FFF0B3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Calligraphic Nib Tip Poised at the Bottom-Left */}
      <polygon points="10.5,30.5 9,33 13,31.5" fill="url(#heroGold)" />

      {/* Flanking Serif Initials: 'R' Top-Left, 'D' Bottom-Right */}
      <text
        x="11.5"
        y="16"
        fontFamily="'Newsreader', Georgia, serif"
        fontSize="11.5"
        fontWeight="bold"
        fill="url(#heroGold)"
        letterSpacing="0.5"
      >
        R
      </text>

      <text
        x="26.5"
        y="32"
        fontFamily="'Newsreader', Georgia, serif"
        fontSize="11.5"
        fontWeight="bold"
        fill="url(#heroGold)"
        letterSpacing="0.5"
      >
        D
      </text>
    </svg>
  );
};
