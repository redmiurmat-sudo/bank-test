
import React from 'react';

interface PinDotsProps {
  length: number;
  maxLength: number;
  isError?: boolean;
}

export const PinDots: React.FC<PinDotsProps> = ({ length, maxLength, isError }) => {
  return (
    <div className={`flex justify-center gap-6 ${isError ? 'animate-shake' : ''}`}>
      {Array.from({ length: maxLength }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full border-[1.5px] transition-all duration-200 ${
            i < length
              ? 'bg-[#3b82f6] border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              : 'border-[#1e40af] bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};
