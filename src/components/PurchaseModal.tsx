import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, CheckCircle, Download, BookOpen } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { CHECKOUT_URL } from '../data';
import { getUrlWithParams } from '../App';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const { formattedPrice } = useCurrency();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return;
    }
    
    // Redirect to real checkout with params
    const targetUrl = getUrlWithParams(CHECKOUT_URL);
    window.location.href = targetUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
          aria-label="Fechar janela"
        >
          ✕
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">
              ACESSO DIGITAL SEGURO
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight">
            Projeto Livre — Método Prático para Parar de Fumar
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Receba o material completo e todas as ferramentas de acompanhamento no seu e-mail.
          </p>

          {/* Order Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-medium">Guia Digital Projeto Livre (5 Módulos)</span>
              <span className="text-slate-500 font-semibold">Incluso</span>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-700">
              <span className="font-medium">6 Bônus Exclusivos Inclusos</span>
              <span className="font-bold uppercase">100% GRÁTIS</span>
            </div>
            <div className="h-[1px] bg-slate-200 my-2" />
            <div className="flex justify-between items-center font-bold">
              <span className="text-sm sm:text-base text-slate-800">Pagamento único:</span>
              <span
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-3xl text-emerald-700 font-black whitespace-nowrap tracking-tight"
              >
                {formattedPrice}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Seu nome"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                E-mail para entrega do material
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="seuemail@exemplo.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>CONTINUAR PARA O PAGAMENTO SEGURO</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium mt-4">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Transação 100% Segura e Criptografada
            </span>
            <span>•</span>
            <span>Garantia incondicional de 7 dias</span>
          </div>
        </div>

      </div>
    </div>
  );
}
