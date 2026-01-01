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
  History as HistoryIcon, 
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

// Custom icons matching the reference image style
const HomeIconCustom = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-white" : "text-[#7b7b7b]"}>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const HistoryIconCustom = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-[#3b82f6]" : "text-[#7b7b7b]"}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MenuIconCustom = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? "text-white" : "text-[#7b7b7b]"}>
    <rect x="5" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="5" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Dashboard: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'payments' | 'history' | 'menu'>('history');
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
    },
    {
      id: '3',
      type: 'qr',
      title: 'Оплата по QR',
      amount: 70,
      date: new Date(2023, 11, 28, 19, 52),
      requisite: 'ЭК 996555045054',
      category: 'Все категории',
      status: 'success'
    },
    {
      id: '4',
      type: 'piggybank',
      title: 'Копилка',
      amount: 3,
      date: new Date(2023, 11, 28, 18, 44),
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
    <div className="px-4">
      {/* Cards Section */}
      <section className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[19px] font-bold">Карты</h2>
          <button className="flex items-center text-gray-400 text-xs font-medium">
            Все <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
        
        <div className="flex gap-2.5 items-center">
          <div className="w-[200px] h-[130px] bg-[#2264f1] rounded-[24px] p-4 flex flex-col justify-between relative shadow-lg overflow-hidden group">
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

      {/* Grid Menu */}
      <div className="grid grid-cols-4 gap-2 mt-8">
        {[
          { icon: <CreditCard className="w-5 h-5 text-white" />, label: "Компаньон", color: "bg-[#1d4ed8]" },
          { icon: <span className="font-extrabold text-[14px]">M</span>, label: "MBANK", color: "bg-[#16a34a]" },
          { icon: <span className="font-extrabold text-[14px]">O!</span>, label: "O!Bank", color: "bg-[#db2777]" },
          { icon: <Wallet className="w-5 h-5" />, label: "Единицы", color: "bg-[#1a1a1a]" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-14 h-14 ${item.color} rounded-[18px] flex items-center justify-center mb-1.5 shadow-sm`}>
              {item.icon}
            </div>
            <span className="text-[10px] text-gray-400 font-medium text-center line-clamp-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => {
    const grouped: Record<string, Transaction[]> = {};
    transactions.forEach(tx => {
      const dateKey = tx.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(tx);
    });

    return (
      <div className="px-3 mt-2 pb-10 animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold mb-4 px-1">История</h2>

        <div className="flex gap-4 mb-6 px-1">
          <button className="flex items-center gap-1 text-[13px] font-semibold text-gray-300">
            Все источники <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          <button className="flex items-center gap-1 text-[13px] font-semibold text-gray-300">
            Все категории <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Period Selector */}
        <div className="bg-[#121212] rounded-2xl p-4 flex items-center justify-between mb-6 mx-1">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-sm font-medium text-gray-300">Период</span>
          </div>
          <div className="bg-white rounded-full px-4 py-1.5 text-[10px] font-bold text-black uppercase tracking-wider">
            1 Янв. - 21 Янв.
          </div>
        </div>

        {/* Transactions List - Full Width to edges */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, txs]) => (
            <div key={date}>
              <h3 className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.1em] mb-4 px-1">{date}</h3>
              <div className="bg-[#121212] rounded-[28px] overflow-hidden divide-y divide-white/[0.03]">
                {txs.map(tx => (
                  <div key={tx.id} className="p-4 flex justify-between items-start active:bg-white/[0.02] transition-colors">
                    <div className="flex gap-3.5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                        tx.type === 'qr' 
                        ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]' 
                        : 'bg-cyan-500/20'
                      }`}>
                        {tx.type === 'qr' ? (
                          <ScanQrCode className="w-6 h-6 text-white" />
                        ) : (
                          <PiggyBank className="w-6 h-6 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold tracking-tight">{tx.title}</span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {tx.category} &nbsp; {tx.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {tx.requisite && (
                          <div className="mt-2.5 bg-black/30 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.05em] w-fit text-gray-400 border border-white/[0.05]">
                            {tx.requisite}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[14px] font-bold">-{tx.amount} <span className="underline underline-offset-4 decoration-gray-600">C</span></span>
                      <span className="text-[10px] text-gray-600 font-medium">Успешный платёж</span>
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
      <h2 className="text-[19px] font-bold mb-4">Меню</h2>
      <div className="bg-[#121212] rounded-2xl p-4 border border-white/5">
        <div className="text-[11px] text-blue-500/60 uppercase font-bold mb-1">Активный реквизит:</div>
        <div className="text-sm font-semibold">{requisites[selectedReqIndex] || 'Не выбрано'}</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Header */}
      {activeTab !== 'history' && (
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

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'home' ? renderHome() : 
         activeTab === 'history' ? renderHistory() :
         activeTab === 'menu' ? renderMenu() : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">В разработке</div>
        )}
      </main>

      {/* UPDATED NAVIGATION BAR - BASED ON BLUE BOX */}
      <nav className="shrink-0 bg-[#0f0f0f] border-t border-white/[0.05] flex justify-around items-center pt-2 pb-6 px-2 z-50">
        <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-1">
          <HomeIconCustom active={activeTab === 'home'} />
          <span className={`text-[9px] font-medium ${activeTab === 'home' ? 'text-white' : 'text-[#7b7b7b]'}`}>Главная</span>
        </button>

        <button onClick={() => setActiveTab('payments')} className="flex flex-col items-center gap-1">
          <Wallet className={`w-6 h-6 ${activeTab === 'payments' ? 'text-white' : 'text-[#7b7b7b]'}`} />
          <span className={`text-[9px] font-medium ${activeTab === 'payments' ? 'text-white' : 'text-[#7b7b7b]'}`}>Платежи</span>
        </button>
        
        <div className="relative -top-3">
          <button 
            onClick={() => setShowScanner(true)}
            className="bg-[#2264f1] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(34,100,241,0.3)] active:scale-90 transition-transform"
          >
            <ScanQrCode className="w-7 h-7 text-white" strokeWidth={2.5} />
          </button>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-[#7b7b7b]">QR-код</span>
        </div>

        <button onClick={() => setActiveTab('history')} className="flex flex-col items-center gap-1">
          <HistoryIconCustom active={activeTab === 'history'} />
          <span className={`text-[9px] font-medium ${activeTab === 'history' ? 'text-[#3b82f6]' : 'text-[#7b7b7b]'}`}>История</span>
        </button>

        <button onClick={() => setActiveTab('menu')} className="flex flex-col items-center gap-1">
          <MenuIconCustom active={activeTab === 'menu'} />
          <span className={`text-[9px] font-medium ${activeTab === 'menu' ? 'text-white' : 'text-[#7b7b7b]'}`}>Меню</span>
        </button>
      </nav>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};