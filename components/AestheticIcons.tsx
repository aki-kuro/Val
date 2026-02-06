
import React from 'react';

export const RoseIcon = ({ color = "#FFB7C5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22V15" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18C12 18 10 17 9 15" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12C14.5 12 17 10 17 7C17 4 14 2 12 2C10 2 7 4 7 7C7 10 9.5 12 12 12Z" fill={color} stroke={color} strokeWidth="0.5"/>
    <circle cx="12" cy="7" r="2" fill="white" fillOpacity="0.3" />
  </svg>
);

export const HeartIcon = ({ size = 24, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FFB7C5" : "none"} stroke="#FFB7C5" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

export const ChocolateIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#964B00" xmlns="http://www.w3.org/2000/svg" opacity="0.6">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#D2B48C" />
    <rect x="6" y="6" width="5" height="5" rx="1" fill="#8B4513" />
    <rect x="13" y="6" width="5" height="5" rx="1" fill="#8B4513" />
    <rect x="6" y="13" width="5" height="5" rx="1" fill="#8B4513" />
    <rect x="13" y="13" width="5" height="5" rx="1" fill="#8B4513" />
  </svg>
);
