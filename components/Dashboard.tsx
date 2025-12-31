
import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronRight, 
  Plus, 
  Star, 
  Eye, 
  CreditCard, 
  ArrowRightLeft, 
  PiggyBank, 
  UserCircle2,
  ScanQrCode,
  Trash2,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Wallet
} from 'lucide-react';
import { QRScanner } from './QRScanner.tsx';
import { TransferByQR } from './TransferByQR.tsx';
import { Transaction } from '../types.ts';

const HomeIconCustom = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-white" : "text-[#7b7b7b]"}>
    <path 
      d="M12 4C10.5 4 8.5 5 7.5 7.5C6.5 10 7.5 13 11 15C12 15.5 13 15.5 14 15C17.5 13 18.5 10 17.5 7.5C16.5 5 14.5 4 13 4C12.7 4 12.3 4 12 4ZM12 13C10 12 9.5 10 10 8.5C10.5 7 12 7 12.5 7C13 7 14.5 7 15 8.5C15.5 10 15 12 13 13C12.7 13.2 12.3 13.2 12 13Z" 
      fill="currentColor" 
    />
  </svg>
);

const HistoryIconCustom = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-white" : "text-[#7b7b7b]"}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MenuIconCustom = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-white" : "text-[#7b7b7b]"}>
    <rect x="6" y="6" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="6" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="6" y="13" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Dashboard: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'payments' | 'history' | 'menu'>('home');
  const [requisites, setRequisites] = useState<string[]>(['TULPAR 297', 'M-BANK 0555', 'O!Dengi 777']);
  const [selectedReqIndex, setSelectedReqIndex] = useState(0);
  const [newRequisite, setNewRequisite] = useState('');
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'qr',
      title: 'Оплата по QR',
      amount: 200,
      date: new Date(2023, 11, 29, 12, 5),
      requisite: 'ЭК 996555045054',
      category: 'Все категории',
      status: 'success'
    },
    {
      id: '2',
      type: 'qr',
      title: 'Оплата по QR',
      amount: 30,
      date: new Date(2023, 11, 28, 20, 53),
      requisite: 'ЭК 996555045054',
      category: 'Все категории',
      status: 'success'
    }
  ]);

  const addRequisite = () => {
    if (newRequisite.trim()) {
      setRequisites([...requisites, newRequisite.trim()]);
      setNewRequisite('');
    }
  };

  const removeRequisite = (index: number) => {
    const updated = requisites.filter((_, i) => i !== index);
    setRequisites(updated);
    if (selectedReqIndex >= updated.length) {
      setSelectedReqIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleSelectRequisite = (index: number) => {
    setSelectedReqIndex(index);
  };

  const handlePaymentSuccess = (amount: number, requisite: string) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'qr',
      title: 'Оплата по QR',
      amount: amount,
      date: new Date(),
      requisite: 'ЭК 996555045054',
      category: 'Все категории',
      status: 'success'
    };
    setTransactions([newTx, ...transactions]);
    setShowTransfer(false);
    setActiveTab('history');
  };

  if (showTransfer) {
    return (
      <TransferByQR 
        onBack={() => setShowTransfer(false)} 
        onPaymentSuccess={handlePaymentSuccess}
        requisite={requisites[selectedReqIndex] || 'TULPAR 297'} 
      />
    );
  }

  if (showScanner) {
    return (
      <QRScanner 
        onClose={() => setShowScanner(false)} 
        onGalleryClick={() => {
          setShowScanner(false);
          setShowTransfer(true);
        }}
      />
    );
  }

  const renderHome = () => (
    <>
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[19px] font-bold">Карты</h2>
          <button className="flex items-center text-gray-400 text-xs font-medium">
            Все <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
        
        <div className="flex gap-2.5 items-center">
          <div className="w-[200px] h-[130px] bg-[#2264f1] rounded-[24px] p-4 flex flex-col justify-between relative shadow-lg overflow-hidden group">
            <div className="absolute -right-4 -top-2 w-32 h-32 opacity-20 pointer-events-none transform rotate-[-5deg]">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 C10 25 25 10 50 10 H80 V40 H50 C40 40 40 45 40 50" stroke="white" strokeWidth="16" strokeLinecap="round" />
                <path d="M90 50 C90 75 75 90 50 90 H20 V60 H50 C60 60 60 55 60 50" stroke="white" strokeWidth="16" strokeLinecap="round" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[12px] font-normal text-white/80">Кошелек</span>
                <div className="flex flex-col gap-2">
                  <Star className="w-[16px] h-[16px] text-white/90" strokeWidth={1.5} />
                  <Eye className="w-[16px] h-[16px] text-white/90" strokeWidth={1.5} />
                </div>
              </div>
              <div className="mt-0">
                <span className="text-[22px] font-bold leading-none">280 сом</span>
              </div>
              <div className="text-[11px] text-white/60 mt-1 font-normal tracking-wide">+996 555 045 054</div>
            </div>
            <div className="relative z-10 flex items-center justify-center gap-1.5 bg-black/10 rounded-xl py-1 px-2 w-fit mx-auto">
               <ScanQrCode className="w-3 h-3 text-white/80" />
               <span className="text-[12px] font-medium text-white/95">QR-код</span>
            </div>
          </div>
          <button className="w-12 h-12 bg-[#2264f1] rounded-[16px] flex items-center justify-center text-white active:scale-90 transition-all shadow-md">
            <Plus className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </section>

      <div className="px-4 mt-6">
        <div className="flex bg-[#121212] rounded-[18px] p-0.5 h-[42px] items-center">
          <button className="flex-1 h-full rounded-[16px] bg-[#2a2a2a] text-[13px] font-medium text-white flex items-center justify-center shadow-sm">
            Частые
          </button>
          <button className="flex-1 h-full text-[#7b7b7b] text-[13px] font-medium flex items-center justify-center">
            Шаблоны
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-4 mt-6">
        {[
          { icon: <CreditCard className="w-5 h-5 text-white" />, label: "Компаньон", color: "bg-[#1d4ed8]" },
          { icon: <span className="font-extrabold text-[14px]">M</span>, label: "MBANK", color: "bg-[#16a34a]" },
          { icon: <span className="font-extrabold text-[14px]">O!</span>, label: "O!Bank", color: "bg-[#db2777]" },
          { icon: <div className="w-5 h-5 bg-blue-600/20 rounded flex items-center justify-center"><div className="w-3 h-4 border-2 border-blue-500 rounded-sm"></div></div>, label: "Пополне единиц", color: "bg-[#1a1a1a] border border-[#2a2a2a]" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-14 h-14 ${item.color} rounded-[18px] flex items-center justify-center mb-1.5 shadow-sm`}>
              {item.icon}
            </div>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center px-0.5 line-clamp-2">{item.label}</span>
          </div>
        ))}
      </div>

      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[19px] font-bold">Продукты и услуги</h2>
          <button className="flex items-center text-gray-400 text-xs font-medium">
            Все <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Кредиты', iconColor: 'bg-[#16a34a]', icon: '%' },
            { label: 'Копилка', iconColor: 'bg-[#9333ea]', icon: <PiggyBank className="w-4 h-4"/>, badge: 'Новое' },
            { label: 'Переводы - KWIKPAY', iconColor: 'bg-white', icon: <div className="w-4 h-4 rounded-full border-2 border-red-600"></div> },
            { label: 'Депозиты', iconColor: 'bg-[#f97316]', icon: '¤' },
            { label: 'Между счетами', iconColor: 'bg-[#3b82f6]', icon: <ArrowRightLeft className="w-4 h-4"/> },
            { label: 'Переводы из России - ...', iconColor: 'bg-[#ec4899]', icon: '*' },
          ].map((item, i) => (
            <div key={i} className="bg-[#121212] rounded-[18px] p-3 h-[96px] flex flex-col justify-between relative overflow-hidden active:bg-[#1a1a1a] transition-colors">
              {item.badge && (
                <div className="absolute top-2 right-2 bg-[#22c55e] text-[8px] px-1.5 py-0.5 rounded-full text-black font-bold uppercase tracking-tighter">
                  {item.badge}
                </div>
              )}
              <div className={`${item.iconColor} w-7 h-7 rounded-[8px] flex items-center justify-center text-black font-black text-sm`}>
                {item.icon}
              </div>
              <span className="text-[10px] text-gray-300 font-semibold leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderHistory = () => {
    const grouped: Record<string, Transaction[]> = {};
    transactions.forEach(tx => {
      const dateKey = tx.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(tx);
    });

    return (
      <div className="px-4 mt-2 pb-10 animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold mb-6">История</h2>
        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-1 text-sm font-medium">
            Все источники <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          <button className="flex items-center gap-1 text-sm font-medium">
            Все категории <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([date, txs]) => (
            <div key={date}>
              <h3 className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-4">{date}</h3>
              <div className="bg-[#121212] rounded-3xl overflow-hidden divide-y divide-white/5">
                {txs.map(tx => (
                  <div key={tx.id} className="p-4 flex justify-between items-start active:bg-white/5 transition-colors">
                    <div className="flex gap-3.5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                        tx.type === 'qr' 
                        ? 'bg-gradient-to-br from-purple-500 to-cyan-400' 
                        : 'bg-cyan-500/20'
                      }`}>
                        {tx.type === 'qr' ? (
                          <ScanQrCode className="w-6 h-6 text-white" />
                        ) : (
                          <PiggyBank className="w-6 h-6 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold tracking-tight">{tx.title}</span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {tx.category} &nbsp; {tx.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3.5">
                      <span className="text-sm font-bold">-{tx.amount} <span className="underline underline-offset-4 decoration-gray-600">C</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMenu = () => (
    <div className="px-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[19px] font-bold mb-4">Настройка оплаты</h2>
      <div className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Добавить новые реквизиты</div>
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          placeholder="Напр: TULPAR 297"
          className="flex-1 bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          value={newRequisite}
          onChange={(e) => setNewRequisite(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addRequisite()}
        />
        <button 
          onClick={addRequisite}
          className="bg-blue-600 text-white rounded-xl px-4 flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-blue-500/10"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-y-auto pb-16 selection:bg-blue-500/30">
      {activeTab !== 'history' && (activeTab !== 'payments') && (
        <header className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1c1c1c] rounded-full flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-gray-500" />
            </div>
            <span className="text-[17px] font-medium">Март</span>
          </div>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        </header>
      )}

      <main className="flex-1">
        {activeTab === 'home' ? renderHome() : 
         activeTab === 'history' ? renderHistory() :
         activeTab === 'menu' ? renderMenu() : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">В разработке</div>
        )}
      </main>

      {/* REFINED NAVIGATION BAR - MAXIMUM LOWERED (THRESHOLD) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#212121] border-t border-white/[0.03] px-1 pb-0 flex justify-between items-end z-50 h-[56px]">
        {/* Главная */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center flex-1 transition-all h-full justify-center gap-0 pb-1"
        >
          <HomeIconCustom active={activeTab === 'home'} />
          <span className={`text-[8.5px] font-medium transition-colors ${activeTab === 'home' ? 'text-white' : 'text-[#7b7b7b]'}`}>
            Главная
          </span>
        </button>

        {/* Платежи */}
        <button 
          onClick={() => setActiveTab('payments')}
          className="flex flex-col items-center flex-1 transition-all h-full justify-center gap-0 pb-1"
        >
          <Wallet className={`w-5 h-5 ${activeTab === 'payments' ? 'text-white' : 'text-[#7b7b7b]'}`} />
          <span className={`text-[8.5px] font-medium transition-colors ${activeTab === 'payments' ? 'text-white' : 'text-[#7b7b7b]'}`}>
            Платежи
          </span>
        </button>
        
        {/* QR-код (Center) - Lowered even more */}
        <div className="flex flex-col items-center flex-1 relative -top-1">
          <button 
            onClick={() => setShowScanner(true)}
            className="bg-[#2264f1] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
               <path d="M4 8V4H8M16 4H20V8M20 16V20H16M8 20H4V16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
               <rect x="9" y="9" width="2" height="2" rx="0.5" fill="currentColor"/>
               <rect x="13" y="9" width="2" height="2" rx="0.5" fill="currentColor"/>
               <rect x="9" y="13" width="2" height="2" rx="0.5" fill="currentColor"/>
               <rect x="13" y="13" width="2" height="2" rx="0.5" fill="currentColor"/>
            </svg>
          </button>
          <span className="text-[8.5px] font-medium text-[#7b7b7b] mt-0.5">QR-код</span>
        </div>

        {/* История */}
        <button 
          onClick={() => setActiveTab('history')}
          className="flex flex-col items-center flex-1 transition-all h-full justify-center gap-0 pb-1"
        >
          <HistoryIconCustom active={activeTab === 'history'} />
          <span className={`text-[8.5px] font-medium transition-colors ${activeTab === 'history' ? 'text-white' : 'text-[#7b7b7b]'}`}>
            История
          </span>
        </button>

        {/* Меню */}
        <button 
          onClick={() => setActiveTab('menu')}
          className="flex flex-col items-center flex-1 transition-all h-full justify-center gap-0 pb-1"
        >
          <MenuIconCustom active={activeTab === 'menu'} />
          <span className={`text-[8.5px] font-medium transition-colors ${activeTab === 'menu' ? 'text-white' : 'text-[#7b7b7b]'}`}>
            Меню
          </span>
        </button>
      </nav>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};
