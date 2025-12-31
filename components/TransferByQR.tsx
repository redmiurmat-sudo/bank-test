
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface TransferByQRProps {
  onBack: () => void;
  onPaymentSuccess: (amount: number, requisite: string) => void;
  requisite: string;
}

export const TransferByQR: React.FC<TransferByQRProps> = ({ onBack, onPaymentSuccess, requisite }) => {
  const [amount, setAmount] = useState('17');
  
  // Split requisite into Name and ID (e.g., "TULPAR 297" -> "TULPAR", "297")
  const parts = requisite.split(' ');
  const name = parts[0] || 'Unknown';
  const id = parts.slice(1).join(' ') || '';

  const handlePay = () => {
    onPaymentSuccess(parseFloat(amount), requisite);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black text-white flex flex-col font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center px-4 pt-12 pb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium pr-7">Переводы по QR</h1>
      </header>

      <div className="flex-1 px-4 space-y-3 overflow-y-auto pb-32">
        {/* From Section */}
        <div className="bg-[#121212] rounded-2xl p-4">
          <div className="text-gray-500 text-xs mb-3">Откуда:</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-blue-600 rounded-md relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 right-0 w-6 h-6 bg-white/10 rounded-full -mr-2 -mt-2"></div>
                <div className="text-[6px] text-white/40 mt-3 font-mono">**** 1589</div>
              </div>
              <div>
                <div className="text-gray-400 text-[11px]">Мой кошелек</div>
                <div className="text-lg font-bold flex items-center gap-1">280 <span className="underline decoration-gray-500 underline-offset-4">C</span></div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* To Section */}
        <div className="bg-[#121212] rounded-2xl p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-500 text-xs mb-1">Оплата по QR</div>
            <div className="text-lg font-bold tracking-tight uppercase">{name}</div>
            <div className="text-lg font-bold">{id}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-lg">
             <div className="w-7 h-7 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
             </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="bg-[#121212] rounded-2xl p-4">
          <div className="text-gray-500 text-xs mb-2">Сумма</div>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold w-full outline-none"
            />
            <span className="text-2xl font-bold text-gray-500 underline decoration-gray-500 underline-offset-4">C</span>
          </div>
          <div className="text-gray-500 text-xs mt-2">Комиссия: 0 <span className="underline underline-offset-2">C</span></div>
        </div>
        
        <div className="text-gray-600 text-[11px] px-1">
          от 1 до 200 000 <span className="underline underline-offset-2">C</span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="p-4 bg-black pb-10">
        <button 
          onClick={handlePay}
          className="w-full py-4 bg-[#3b82f6] rounded-2xl text-lg font-medium active:scale-[0.98] transition-transform"
        >
          Оплатить {amount} <span className="underline underline-offset-4 decoration-white/50">C</span>
        </button>
      </div>
    </div>
  );
};
