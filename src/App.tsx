import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  ShieldCheck,
  BookOpen,
  Check,
  Plus,
  Minus,
  HelpCircle,
  ArrowRight,
  Eye,
  Sparkles,
  Lock,
  CalendarCheck,
  Compass,
  FileText,
  Star
} from 'lucide-react';

// Custom components
import HeaderBanner from './components/HeaderBanner';
import OptimizedImage from './components/OptimizedImage';
const PurchaseModal = lazy(() => import('./components/PurchaseModal'));
const NotificationToast = lazy(() => import('./components/NotificationToast'));
import { useCurrency } from './context/CurrencyContext';

// Static Data
import {
  HERO_BULLETS,
  BENEFITS,
  MODULES_INFO,
  BONUSES,
  CHALLENGE_INSIGHTS,
  FAQS,
  CHECKOUT_URL
} from './data';

interface ProductPreviewItem {
  src: string;
  alt: string;
  tag: string;
}

const PRODUCT_IMAGES: ProductPreviewItem[] = [
  {
    src: "/images/real_page_cronograma.webp",
    alt: "Plano de 30 Dias: Tabela Prática de Hábitos e Metas",
    tag: "PRODUTO PRINCIPAL"
  },
  {
    src: "/images/real_page_10dicas.webp",
    alt: "10 Dicas Essenciais: Respiração Rítmica & Regra dos 5 Minutos",
    tag: "BÔNUS 1"
  },
  {
    src: "/images/real_page_mapamental.webp",
    alt: "Mapa Mental: Gatilhos, Horários Críticos e Reposição Saudável",
    tag: "BÔNUS 6"
  },
  {
    src: "/images/real_page_adeuscigarro.webp",
    alt: "Adeus, Cigarro: Exercício de Reprogramação do Hábito",
    tag: "BÔNUS 2"
  },
  {
    src: "/images/real_page_vapepod.webp",
    alt: "Protocolo de Desmame Gradual: Redução de Vape & Pod",
    tag: "BÔNUS 4"
  },
  {
    src: "/images/real_page_quebreciclo.webp",
    alt: "Ficha de Emergência: Plano Anti-Recaída Passo a Passo",
    tag: "BÔNUS 5"
  },
  {
    src: "/images/preview_tecnica_fissura.webp",
    alt: "Técnica de 4 Minutos Contra a Fissura: Guia Prático",
    tag: "AÇÃO IMEDIATA"
  },
  {
    src: "/images/preview_folha_gatilhos.webp",
    alt: "Mapa Diário de Gatilhos & Ações Substitutas",
    tag: "EXERCÍCIO PRÁTICO"
  },
  {
    src: "/images/preview_recuperacao_corpo.webp",
    alt: "Linha do Tempo: A Recuperação do Seu Organismo",
    tag: "SAÚDE CORPORAL"
  }
];

declare global {
  interface Window {
    redirectWithParams: (destination: string) => void;
  }
}

export function getUrlWithParams(destination: string): string {
  if (typeof window === 'undefined') return destination;
  const currentParams = window.location.search;

  if (currentParams) {
    const separator = destination.includes("?") ? "&" : "?";
    return destination + separator + currentParams.substring(1);
  }

  return destination;
}

export function redirectWithParams(destination: string) {
  const finalUrl = getUrlWithParams(destination);
  try {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
  } catch (err) {
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  window.location.href = finalUrl;
}

if (typeof window !== 'undefined') {
  window.redirectWithParams = redirectWithParams;
}

interface UtmifyLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  baseUrl: string;
  children?: React.ReactNode;
}

function UtmifyLink({ baseUrl, children, onClick, className, ...props }: UtmifyLinkProps) {
  const finalHref = getUrlWithParams(baseUrl);

  const handleWarmup = () => {
    try {
      const target = getUrlWithParams(baseUrl);
      if (!document.querySelector(`link[data-warmup="${target}"]`)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = target;
        link.setAttribute('data-warmup', target);
        document.head.appendChild(link);
      }
    } catch (e) {
      // Ignored
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    const targetUrl = getUrlWithParams(baseUrl);

    try {
      if (window.self !== window.top) {
        e.preventDefault();
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch (err) {
      e.preventDefault();
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      window.location.href = targetUrl;
    }
  };

  return (
    <a
      href={finalHref}
      onClick={handleClick}
      onMouseEnter={handleWarmup}
      onTouchStart={handleWarmup}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export default function App() {
  const { formattedPrice } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const checkoutUrl = CHECKOUT_URL;

  useEffect(() => {
    document.title = "Projeto Livre — Método Prático para Parar de Fumar";
  }, []);

  const scrollToPrice = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('precio-oferta') || document.getElementById('scroll-target-oferta');
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-600 selection:text-white overflow-x-hidden">
      {/* SEÇÃO 0: Sticky Banner */}
      <HeaderBanner />

      {/* Abstract radial background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/40 via-white to-white pointer-events-none -z-10" />

      {/* --- SEÇÃO 1: HERO --- */}
      <header className="relative py-8 md:py-14 lg:py-16 px-4 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 flex flex-col items-center">
          {/* Top category pill */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>MÉTODO DE 30 DIAS • GUIA PRÁTICO DIGITAL</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.1] max-w-4xl mx-auto break-words">
            Quer parar de fumar, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800">
              mas não sabe por onde começar?
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Conheça o método prático desenvolvido para ajudar você a <span className="font-semibold text-emerald-800">parar de fumar em 30 dias</span>: identifique seus gatilhos, organize sua rotina e enfrente os desafios cotidianos com ferramentas estruturadas.
          </p>

          {/* Hero Pack Image */}
          <div className="my-6 flex justify-center w-full max-w-3xl sm:max-w-4xl relative mx-auto">
            <OptimizedImage 
              src="https://i.ibb.co/1fdCj3tk/Projeto-Livre-Rumo-Liberdade.png" 
              fallbackSrc="/images/hero_projeto_livre.jpg"
              fallbackSources={[
                "https://i.ibb.co/1fdCj3tk/Projeto-Livre-Rumo-Liberdade.png",
                "/images/hero_projeto_livre.jpg"
              ]}
              alt="Projeto-Livre-Rumo-Liberdade" 
              className="w-full max-w-2xl h-auto max-h-[550px] object-contain rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="600"
              height="600"
            />
          </div>

          {/* Credibility checklist bullets */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left pt-2 w-full">
            {HERO_BULLETS.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-3.5 text-sm sm:text-base text-slate-900 font-bold bg-white border border-emerald-100/80 shadow-sm rounded-2xl p-4 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md flex items-center justify-center text-sm font-black flex-shrink-0">
                  ✓
                </div>
                <span className="tracking-tight">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Scroll to Offer Button - Abaixo dos benefícios da primeira seção */}
          <div className="pt-6 w-full max-w-md mx-auto">
            <button
              onClick={scrollToPrice}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-4 px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center cursor-pointer group"
            >
              <span>QUERO CONHECER O MÉTODO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium mt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Pagamento 100% seguro
              </span>
              <span>•</span>
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </div>

        </div>
      </header>

      {/* --- SEÇÃO 3: TRANSFORMAÇÃO (A diferença entre tentar sem método e seguir um plano organizado) --- */}
      <section className="py-14 md:py-20 px-4 border-t border-b border-slate-100 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 relative overflow-hidden lazy-render-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Centralized Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-flex text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              PLANEJAMENTO E COMPORTAMENTO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              A diferença entre tentar no impulso e seguir um método organizado
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Muitas tentativas de parar de fumar são interrompidas não por falta de vontade, mas por <span className="font-bold text-slate-800">falta de preparo prévio</span> para lidar com gatilhos, rotinas automáticas e momentos de estresse. Com o Projeto Livre, você tem um plano estruturado para guiar sua decisão dia após dia.
            </p>
            
            <div className="inline-flex flex-col bg-white border border-emerald-100 shadow-sm px-6 py-4 rounded-2xl items-center gap-2 text-sm sm:text-base font-bold text-slate-800">
              <Compass className="w-7 h-7 text-emerald-600 mb-0.5" />
              <span className="text-center">Guia prático focado em auto-observação, rotina e ferramentas de apoio</span>
            </div>
          </div>

          {/* Centralized Grid list - 3-column bento style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <div 
                key={benefit.id} 
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-between hover:-translate-y-0.5 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xs font-extrabold font-mono mb-4 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5 Modules Overview Grid */}
          <div className="mt-14 pt-10 border-t border-slate-200/60 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest font-mono">
                CONTEÚDO DO MÉTODO
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Conheça um dos Principais Métodos para Parar de Fumar em 30 Dias
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {MODULES_INFO.map((mod) => (
                <div key={mod.number} className="w-full md:w-[calc(50%-0.6rem)] lg:w-[calc(33.333%-0.75rem)] bg-white border border-emerald-100/80 p-5 rounded-2xl shadow-sm hover:border-emerald-300 transition-colors flex flex-col items-center text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {mod.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5 text-center">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed text-center">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SEÇÃO 4: BÔNUS EXCLUSIVOS --- */}
      <section className="py-10 md:py-14 px-4 bg-gradient-to-b from-white to-emerald-50/20 border-t border-slate-100 lazy-render-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest font-mono shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>MATERIAIS COMPLEMENTARES INCLUSOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              6 Bônus Exclusivos Inclusos no Projeto Livre
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Além do método principal, você recebe 6 ferramentas e guias complementares criados para acelerar seus resultados, blindar sua mente contra recaídas e libertar você de qualquer forma de vício.
            </p>
          </div>

          {/* Bonuses layout */}
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {BONUSES.map((bonus, index) => (
              <div
                key={bonus.id}
                className="bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between p-5 relative group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]"
              >
                <div>
                  {/* Image container on top */}
                  <div className="flex items-center justify-center mb-5 h-[320px] sm:h-[360px] w-full p-3 overflow-hidden bg-slate-50/50 border border-slate-100/80 rounded-2xl relative group-hover:bg-slate-100/30 transition-colors">
                    <OptimizedImage 
                      src={bonus.image || ""} 
                      fallbackSrc={bonus.fallbackImage}
                      fallbackSources={[bonus.image, bonus.fallbackImage]}
                      alt={bonus.title} 
                      className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-md transform transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchPriority={index < 3 ? "high" : "auto"}
                      decoding="async"
                      width="320"
                      height="320"
                    />
                  </div>

                  {/* Title and Badge Row */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-2.5 justify-center sm:justify-start text-center sm:text-left">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 sm:mt-1">
                      {bonus.number}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug text-center sm:text-left">
                      {bonus.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-3 text-center sm:text-left pl-0">
                    {bonus.description}
                  </p>
                </div>

                {/* Price anchoring in footer */}
                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Preço original:
                    </span>
                    <span className="text-xs sm:text-sm font-black text-red-600 line-through">
                      R$ {bonus.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      ✓ INCLUÍDO DE GRAÇA
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll to Offer Button - Abaixo dos bônus */}
          <div className="mt-10 sm:mt-12 text-center max-w-md mx-auto">
            <button
              onClick={scrollToPrice}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-4 px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center cursor-pointer group"
            >
              <span>QUERO GARANTIR TODOS OS BÔNUS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium mt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Acesso imediato
              </span>
              <span>•</span>
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- SEÇÃO 6: VISTA PREVIA DO CONTEÚDO (Visualização do Material) --- */}
      <section className="pt-4 pb-10 md:pt-5 md:pb-12 px-4 bg-[#f8fafc] border-t border-b border-slate-100 overflow-hidden lazy-render-section" id="muestra">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest font-mono shadow-sm">
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>VISTA PRÉVIA DO MATERIAL</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-center text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            Descubra o <span className="text-emerald-700">Interior do Projeto Livre</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
            Visualize a organização visual, os exercícios práticos e as tabelas de acompanhamento prontas para você preencher e consultar quando precisar.
          </p>

          {/* Infinite Scroll Area */}
          <div className="relative overflow-hidden w-full py-4">
            {/* Gradient overlay left/right */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First track */}
              <div className="flex gap-6">
                {PRODUCT_IMAGES.map((imgItem, idx) => (
                  <div
                    key={`track1-${idx}`}
                    className="w-[260px] sm:w-[330px] h-[370px] sm:h-[470px] shrink-0 border border-slate-200/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden bg-white transition-all duration-300 transform hover:-translate-y-1.5 p-2.5 relative group"
                  >
                    <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                      <OptimizedImage 
                        src={imgItem.src} 
                        alt={imgItem.alt || `Página de exemplo ${idx + 1}`} 
                        className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.03] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        width="330"
                        height="470"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate track for seamless infinite scroll */}
              <div className="flex gap-6">
                {PRODUCT_IMAGES.map((imgItem, idx) => (
                  <div
                    key={`track2-${idx}`}
                    className="w-[260px] sm:w-[330px] h-[370px] sm:h-[470px] shrink-0 border border-slate-200/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden bg-white transition-all duration-300 transform hover:-translate-y-1.5 p-2.5 relative group"
                  >
                    <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                      <OptimizedImage 
                        src={imgItem.src} 
                        alt={imgItem.alt ? `${imgItem.alt} - cópia` : `Página de exemplo ${idx + 1}`} 
                        className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.03] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        width="330"
                        height="470"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SEÇÃO 7: DEPOIMENTOS REAIS (Histórias de Sucesso) --- */}
      <section className="pt-4 pb-10 md:pt-5 md:pb-12 px-4 bg-white border-b border-slate-100 lazy-render-section">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-6">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              DEPOIMENTOS REAIS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              O que dizem as pessoas que aplicaram o Projeto Livre
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Histórias reais de quem transformou a rotina, venceu os gatilhos do dia a dia e conquistou a liberdade definitiva.
            </p>
          </div>

          {/* Testimonial cards in marquee */}
          <div className="relative overflow-hidden w-full py-4">
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First track */}
              <div className="flex gap-6">
                {CHALLENGE_INSIGHTS.map((item) => (
                  <div
                    key={`track1-${item.id}`}
                    className="w-[290px] sm:w-[360px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between relative shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                          {item.achievement}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Person footer */}
                    <div className="border-t border-slate-200 pt-4 mt-6 flex items-center gap-3">
                      {item.avatarUrl ? (
                        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-500/20 shadow-sm bg-slate-100">
                          <OptimizedImage
                            src={item.avatarUrl}
                            fallbackSrc={item.avatarFallback}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            fallbackIcon={
                              <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center text-sm">
                                {item.name.charAt(0)}
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate track for seamless infinite scroll */}
              <div className="flex gap-6">
                {CHALLENGE_INSIGHTS.map((item) => (
                  <div
                    key={`track2-${item.id}`}
                    className="w-[290px] sm:w-[360px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between relative shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                          {item.achievement}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Person footer */}
                    <div className="border-t border-slate-200 pt-4 mt-6 flex items-center gap-3">
                      {item.avatarUrl ? (
                        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-500/20 shadow-sm bg-slate-100">
                          <OptimizedImage
                            src={item.avatarUrl}
                            fallbackSrc={item.avatarFallback}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            fallbackIcon={
                              <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center text-sm">
                                {item.name.charAt(0)}
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECCIÓN 5: OFERTA DO PRODUTO (Preço e O que está incluso) --- */}
      <section id="oferta" className="py-10 md:py-14 px-4 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 relative lazy-render-section">
        <div className="max-w-4xl mx-auto">

          {/* Section title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight max-w-4xl mx-auto mb-6 text-center tracking-tight">
            Tudo o Que Você Precisa Para Organizar Sua Tentativa
          </h2>

          {/* Offer card with emerald border */}
          <div className="bg-white border-2 border-emerald-600 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 shadow-[0_20px_50px_rgba(16,185,129,0.12)] relative">
            
            {/* OFERTA overlap badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase px-5 py-1.5 rounded-full tracking-widest shadow-md">
              ACESSO DIGITAL COMPLETO
            </div>

            <div className="text-center space-y-1 mb-8 pt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-wide">
                Projeto Livre — Método Prático para Parar de Fumar
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-semibold italic">
                O método prático estruturado em 5 módulos e ferramentas de rotina para ajudar a pessoa a parar de fumar em 30 dias.
              </p>
            </div>

            {/* Product image */}
            <div className="flex justify-center mb-8 relative w-full min-h-[300px] sm:min-h-[420px] md:min-h-[480px]">
              <OptimizedImage
                src="https://i.ibb.co/1fdCj3tk/Projeto-Livre-Rumo-Liberdade.png"
                fallbackSrc="/images/hero_projeto_livre.jpg"
                fallbackSources={[
                  "https://i.ibb.co/1fdCj3tk/Projeto-Livre-Rumo-Liberdade.png",
                  "/images/hero_projeto_livre.jpg"
                ]}
                alt="Projeto-Livre-Rumo-Liberdade"
                referrerPolicy="no-referrer"
                className="max-w-full h-full max-h-[500px] object-contain rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="800"
                height="480"
              />
            </div>

            {/* Checklist of what is included */}
            <div className="max-w-md mx-auto space-y-3.5 mb-8 text-left text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Método Completo Projeto Livre — 5 Módulos para Parar de Fumar em 30 Dias</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 1: 10 Dicas Essenciais Para Parar De Fumar</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 2: Adeus, Cigarro (Guia de Reprogramação Mental)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 3: Como Parar De Fumar Maconha (Passo a Passo)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 4: Guia Para Abandonar O Vício em Cigarro Eletrônico</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 5: Quebre O Ciclo (Protocolo Anti-Recaída Definitivo)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bônus 6: Mapa Mental para Vencer os Gatilhos no Vício em Cigarro</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Acesso digital imediato para ler no celular, tablet ou computador</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Material pronto para impressão pessoal em papel</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Pagamento único sem mensalidades, assinaturas ou renovações</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[3.5] mt-0.5" />
                <span className="text-emerald-800">Garantia incondicional de 7 dias</span>
              </div>
            </div>

            {/* Divider */}
            <div id="scroll-target-oferta" className="h-[1px] bg-slate-100 max-w-md mx-auto my-4 scroll-mt-24" />

            {/* Price section */}
            <div id="precio-oferta" className="text-center space-y-2 mb-5 max-w-2xl mx-auto w-full px-2 scroll-mt-24">
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                PAGAMENTO ÚNICO
              </span>
              <div className="w-full flex items-center justify-center py-0">
                <div
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-center select-none text-emerald-700 font-black tracking-tighter whitespace-nowrap text-6xl min-[360px]:text-7xl sm:text-8xl md:text-[7.5rem] leading-none drop-shadow-sm transition-all"
                >
                  {formattedPrice}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Sem assinaturas nem cobranças recorrentes. Acesso completo a todo o material.
              </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-slate-100 max-w-md mx-auto my-4" />

            {/* CTA Button */}
            <div className="max-w-md mx-auto space-y-4">
              <UtmifyLink
                baseUrl={checkoutUrl}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-4 px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center cursor-pointer"
              >
                QUERO CONHECER O MÉTODO <ArrowRight className="w-5 h-5" />
              </UtmifyLink>
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" /> Pagamento 100% seguro
                </span>
                <span>•</span>
                <span>Entrega imediata por e-mail</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEÇÃO 8: GARANTIA INCONDICIONAL DE 7 DÍAS --- */}
      <section id="garantia" className="py-12 md:py-16 px-4 bg-gradient-to-b from-white via-emerald-50/20 to-white border-t border-slate-100 lazy-render-section">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(16,185,129,0.08)] relative">
            
            {/* Guarantee Badge */}
            <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase px-5 sm:px-6 py-1 sm:py-1.5 rounded-full tracking-widest shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap w-max max-w-[95%] z-10">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="whitespace-nowrap font-black">GARANTIA INCONDICIONAL DE 7 DIAS</span>
            </div>

            <div className="flex flex-col items-center text-center gap-6 pt-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-50 border-2 border-emerald-400/40 flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-600" />
              </div>

              <div className="max-w-2xl mx-auto space-y-3 text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Experimente o Material por 7 Dias com Tranquilidade
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto text-center">
                  Baixe o Projeto Livre, leia os módulos e avalie os exercícios no seu ritmo. Se dentro dos primeiros 7 dias você considerar que o material não atendeu às suas expectativas, basta solicitar o reembolso diretamente na plataforma para receber <span className="font-bold text-slate-900">100% do seu dinheiro de volta</span>, sem burocracia.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs sm:text-sm font-bold text-slate-800">
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" /> Reembolso integral de 100%
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" /> Processamento 100% seguro
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" /> Acesso digital imediato
                  </span>
                </div>
              </div>
            </div>

            {/* CTA inside Guarantee card */}
            <div className="mt-8 pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                  Pronto para organizar sua tentativa?
                </span>
                <span className="text-[11px] text-slate-500">
                  Acesse todo o conteúdo com 7 dias de garantia
                </span>
              </div>
              <UtmifyLink
                baseUrl={checkoutUrl}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-3.5 px-7 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center shrink-0 cursor-pointer"
              >
                QUERO CONHECER O MÉTODO <ArrowRight className="w-4 h-4" />
              </UtmifyLink>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEÇÃO: PERGUNTAS FREQUENTES (FAQ) --- */}
      <section id="faq" className="py-10 md:py-14 px-4 bg-white lazy-render-section">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              TIRA-DÚVIDAS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-slate-600">
              Respostas claras e transparentes para as dúvidas mais comuns sobre o Projeto Livre.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100 border-t border-slate-200/40 p-5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box below FAQs */}
          <div className="mt-8 text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <UtmifyLink
                baseUrl={checkoutUrl}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 group border border-emerald-500 text-center cursor-pointer"
              >
                QUERO CONHECER O MÉTODO <ArrowRight className="w-4 h-4" />
              </UtmifyLink>
            </div>
            <div className="space-y-1.5 pt-2">
              <p className="text-sm md:text-base text-slate-600 font-medium">
                Tem alguma dúvida antes de começar? Fale conosco pelo e-mail de suporte:
              </p>
              <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800 tracking-tight break-all">
                contato@projeto-livre.site
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SEÇÃO 10: RODAPÉ --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span className="font-extrabold tracking-tight text-slate-900 uppercase text-sm">
              PROJETO LIVRE — MÉTODO PRÁTICO PARA PARAR DE FUMAR
            </span>
          </div>

          <div className="h-[1px] bg-slate-200 my-4" />

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Projeto Livre. Todos os direitos reservados. • Contato: <span className="font-semibold text-slate-700">contato@projeto-livre.site</span>
          </p>
          <p className="text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Aviso Legal: O Projeto Livre é um material digital educativo focado em desenvolvimento de hábitos, auto-observação e planejamento pessoal. O conteúdo não constitui aconselhamento médico, diagnóstico clínico ou tratamento de saúde, e não substitui a consulta e o acompanhamento de profissionais médicos ou psicólogos habilitados.
          </p>

        </div>
      </footer>

      {/* Checkout Simulator Dialog Portal Modal */}
      <Suspense fallback={null}>
        {isModalOpen && <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </Suspense>

      {/* Informative method tip notification toast */}
      <Suspense fallback={null}>
        <NotificationToast />
      </Suspense>
    </div>
  );
}
