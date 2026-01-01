
import React from 'react';
import { Delete } from 'lucide-react';
import { KeyValue } from '../types.ts';

interface KeypadProps {
  onKeyPress: (key: KeyValue) => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const keys: (KeyValue | null)[] = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    null, '0', 'delete'
  ];

  return (
    <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-[280px] mx-auto">
      {keys.map((key, index) => {
        if (key === null) return <div key={`empty-${index}`} className="w-[78px] h-[78px]" />;

        return (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className={`flex items-center justify-center w-[78px] h-[78px] rounded-full transition-all duration-100 active:scale-95 ${
              key === 'delete' 
                ? 'bg-transparent active:opacity-60' 
                : 'bg-[#1a1a1a] active:bg-[#333333]'
            }`}
          >
            {key === 'delete' ? (
              <div className="relative flex items-center justify-center opacity-40">
                <Delete className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
            ) : (
              <span className="text-3xl font-normal text-white">{key}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
