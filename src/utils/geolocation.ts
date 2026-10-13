/**
 * Fixed Offer Pricing Configuration for Projeto Livre
 *
 * Offer price is fixed at R$ 14,90 (pagamento único)
 */

export interface CountryPricingConfig {
  countryCode: string;
  countryName: string;
  countryNameFr: string;
  price: number;
  formattedPrice: string;
  currencyCode: 'BRL';
  currencySymbol: 'R$';
  crossedPriceFormatted: string;
  flag: string;
}

export const FIXED_OFFER_PRICE = 14.90;
export const FIXED_OFFER_PRICE_FORMATTED = 'R$ 14,90';
export const FIXED_CROSSED_PRICE_FORMATTED = 'R$ 97,00';

export const COUNTRY_PRICING: Record<string, CountryPricingConfig> = {
  BR: {
    countryCode: 'BR',
    countryName: 'Brasil / BRL',
    countryNameFr: 'Brésil / BRL',
    price: FIXED_OFFER_PRICE,
    formattedPrice: FIXED_OFFER_PRICE_FORMATTED,
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    crossedPriceFormatted: FIXED_CROSSED_PRICE_FORMATTED,
    flag: '🇧🇷',
  },
  DEFAULT: {
    countryCode: 'DEFAULT',
    countryName: 'Brasil / BRL',
    countryNameFr: 'Brésil / BRL',
    price: FIXED_OFFER_PRICE,
    formattedPrice: FIXED_OFFER_PRICE_FORMATTED,
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    crossedPriceFormatted: FIXED_CROSSED_PRICE_FORMATTED,
    flag: '🇧🇷',
  },
};

export interface GeoDetectionResult {
  countryCode: string;
  config: CountryPricingConfig;
  source: 'default' | 'url_param' | 'local_cache';
  rawCountry?: string;
}

export function normalizeCountry(_code?: string | null): string {
  return 'BR';
}

export function detectFromUrlParams(): GeoDetectionResult | null {
  return {
    countryCode: 'BR',
    config: COUNTRY_PRICING.BR,
    source: 'url_param',
    rawCountry: 'BR',
  };
}

export function detectFromCache(): GeoDetectionResult | null {
  return null;
}

export function saveToCache(_countryCode: string, _rawCountry?: string): void {}

export function detectFromBrowserHeuristics(): GeoDetectionResult {
  return {
    countryCode: 'BR',
    config: COUNTRY_PRICING.BR,
    source: 'default',
    rawCountry: 'standard',
  };
}

export async function detectFromNetwork(): Promise<{ countryCode: string; source: GeoDetectionResult['source']; rawCountry: string } | null> {
  return null;
}

export function getInitialGeoState(): GeoDetectionResult {
  return {
    countryCode: 'BR',
    config: COUNTRY_PRICING.BR,
    source: 'default',
    rawCountry: 'BR',
  };
}
