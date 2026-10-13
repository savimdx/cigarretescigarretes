import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

interface PurchaseAlert {
  name: string;
  location: string;
  timeAgo: string;
}

const PURCHASE_POOL: PurchaseAlert[] = [
  { name: "Mariana S.", location: "São Paulo, SP", timeAgo: "há 2 min" },
  { name: "Lucas M.", location: "Belo Horizonte, MG", timeAgo: "há 4 min" },
  { name: "Carlos R.", location: "Curitiba, PR", timeAgo: "há 1 min" },
  { name: "Fernanda A.", location: "Rio de Janeiro, RJ", timeAgo: "há 3 min" },
  { name: "Rodrigo P.", location: "Salvador, BA", timeAgo: "há 30 seg" },
  { name: "Juliana F.", location: "Porto Alegre, RS", timeAgo: "há 5 min" },
  { name: "Eduardo T.", location: "Campinas, SP", timeAgo: "há 2 min" },
  { name: "Camila N.", location: "Florianópolis, SC", timeAgo: "há 6 min" }
];

export default function NotificationToast() {
  const [current, setCurrent] = useState<PurchaseAlert>(PURCHASE_POOL[0]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Delay first toast showing
    const firstShowTimeout = setTimeout(() => {
      setVisible(true);
    }, 3500);

    const interval = setInterval(() => {
      setVisible(false);
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * PURCHASE_POOL.length);
        setCurrent(PURCHASE_POOL[randomIndex]);
        setVisible(true);
      }, 1000);
      
    }, 11000);

    return () => {
      clearTimeout(firstShowTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed top-14 left-3 z-40 max-w-[195px] bg-white/45 backdrop-blur-md border border-white/60 rounded-lg p-1.5 shadow-sm transition-all duration-500 ease-out flex items-center gap-2 ${
        visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-emerald-600/15 flex items-center justify-center text-emerald-700 border border-emerald-500/20">
          <ShoppingBag className="w-3 h-3 text-emerald-700" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-800 truncate leading-tight">
          {current.name}
        </p>
        <p className="text-[8.5px] text-slate-600 truncate leading-tight">
          {current.location}
        </p>
        <p className="text-[8.5px] text-emerald-800 font-bold mt-0.5 flex items-center gap-0.5 leading-tight truncate">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
          <span>Comprou • {current.timeAgo}</span>
        </p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-slate-400 hover:text-slate-700 transition-colors ml-0.5 self-start text-[11px] font-bold leading-none p-0.5"
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}
