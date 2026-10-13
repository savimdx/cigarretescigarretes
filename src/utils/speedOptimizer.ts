import { loadedImageGlobalCache } from '../components/OptimizedImage';

// In-memory cache to keep decoded image instances alive and hot in browser RAM
const imageMemoryCache = new Map<string, HTMLImageElement>();

export const PRIORITY_IMAGES = [
  'https://i.ibb.co/1fdCj3tk/Projeto-Livre-Rumo-Liberdade.png',
  'https://i.ibb.co/hFgNt1M7/Guia-para-Parar-de-Fumar.png',
  'https://i.ibb.co/bjFQr27h/Guia-Adeus-Cigarro-Liberdade-Renovada.png',
  'https://i.ibb.co/Y71jKYhk/Guia-Pr-tico-para-Parar-de-Fumar-Maconha.png',
  'https://i.ibb.co/LBJJzHC/Guia-para-Abandonar-o-V-cio-em-Cigarro-Eletr-nico.png',
  'https://i.ibb.co/MkQZtzj5/Quebre-o-Ciclo-Liberdade-e-Transforma-o-1.png',
  'https://i.ibb.co/kg3Hgyfd/Mapa-Mental-para-Vencer-os-Gatilhos-1.png'
];

export const SECONDARY_IMAGES = [
  '/images/bonus_parar_maconha.jpg',
  '/images/bonus_cigarro_eletronico.jpg',
  '/images/bonus_quebre_o_ciclo.jpg',
  '/images/bonus_mapa_mental.jpg',
  '/images/real_page_cronograma.jpg',
  '/images/real_page_10dicas.jpg',
  '/images/real_page_mapamental.jpg',
  '/images/real_page_adeuscigarro.jpg',
  '/images/real_page_vapepod.jpg',
  '/images/real_page_quebreciclo.jpg',
  '/images/preview_tecnica_fissura.jpg',
  '/images/preview_folha_gatilhos.jpg',
  '/images/preview_recuperacao_corpo.jpg'
];

export const ALL_IMAGES = [...PRIORITY_IMAGES, ...SECONDARY_IMAGES];

/**
 * Preload and hardware-decode an image into browser memory
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || typeof window === 'undefined') return Promise.resolve();

  if (imageMemoryCache.has(src) || loadedImageGlobalCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.decoding = 'async';

      const onDone = () => {
        loadedImageGlobalCache.add(src);
        imageMemoryCache.set(src, img);
        if ('decode' in img && typeof img.decode === 'function') {
          img.decode().then(() => resolve()).catch(() => resolve());
        } else {
          resolve();
        }
      };

      img.onload = onDone;
      img.onerror = () => resolve();
      img.src = src;

      if (img.complete && img.naturalWidth > 0) {
        onDone();
      }
    } catch {
      resolve();
    }
  });
}

/**
 * Ultra-fast non-blocking background preloader with parallel HTTP pipeline
 */
export function initSpeedOptimizer(): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Immediately preload top critical images
    PRIORITY_IMAGES.forEach((src) => {
      preloadImage(src);
    });

    // 2. Preload remaining images quickly in parallel
    const preloadRest = () => {
      SECONDARY_IMAGES.forEach((src) => {
        preloadImage(src);
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadRest, { timeout: 100 });
    } else {
      setTimeout(preloadRest, 10);
    }
  } catch {
    // Fail gracefully
  }
}
