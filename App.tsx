import React, { useState, useCallback } from 'react';
import { LogOut, User } from 'lucide-react';
import { PinDots } from './components/PinDots.tsx';
import { Keypad } from './components/Keypad.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { KeyValue } from './types.ts';

const MAX_PIN_LENGTH = 4;

type AppView = 'pin' | 'loading' | 'dashboard';

const App: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [view, setView] = useState<AppView>('pin');

  const handleKeyPress = useCallback((key: KeyValue) => {
    if (key === 'delete') {
      setPin(prev => prev.slice(0, -1));
      setIsError(false);
      return;
    }

    if (pin.length < MAX_PIN_LENGTH) {
      const newPin = pin + key;
      setPin(newPin);
      
      // When 4 digits are entered, simulate "logging in"
      if (newPin.length === MAX_PIN_LENGTH) {
        setView('loading');
        // Simulate a small delay for loading effect
        setTimeout(() => {
          setView('dashboard');
        }, 1800);
      }
    }
  }, [pin]);

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white p-6 safe-area-inset overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-start pt-4">
        <button className="p-2 text-blue-500 hover:text-blue-400 transition-colors">
          <LogOut className="w-7 h-7" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-medium tracking-tight">
            Привет, Март <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </h1>
        </div>

        {/* PIN Indicators / Loading state */}
        <div className="mb-12 h-8 flex items-center justify-center">
          {view === 'loading' ? (
            <div className="flex gap-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-200"></div>
            </div>
          ) : (
            <PinDots length={pin.length} maxLength={MAX_PIN_LENGTH} isError={isError} />
          )}
        </div>

        {/* Numeric Keypad - Only show if not loading */}
        {view === 'pin' && (
          <div className="w-full flex justify-center mb-10">
            <Keypad onKeyPress={handleKeyPress} />
          </div>
        )}

        {/* Footer Link */}
        {view === 'pin' && (
          <div className="mt-auto pb-8">
            <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors">
              Забыли ПИН код?
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave {
          0% { transform: rotate( 0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
          animation-iteration-count: 3;
        }
        .safe-area-inset {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }
        .delay-75 { animation-delay: 150ms; }
        .delay-150 { animation-delay: 300ms; }
        .delay-200 { animation-delay: 450ms; }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default App;