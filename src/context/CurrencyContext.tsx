import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  COUNTRY_PRICING,
  FIXED_OFFER_PRICE,
  FIXED_OFFER_PRICE_FORMATTED,
  GeoDetectionResult,
  getInitialGeoState,
  normalizeCountry,
} from '../utils/geolocation';

export interface CurrencyContextProps {
  originalPrice: number;
  convertedPrice: number;
  currencyCode: string;
  currencySymbol: string;
  formattedPrice: string;
  isConverting: boolean;
  rate: number;
  detectedCountry: string;
  countryName: string;
  countryNameFr: string;
  countryFlag: string;
  geoSource: string;
  setCurrency: (code: string) => void;
  setCountry: (countryCode: string) => void;
  convertAndFormat: (value: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Offer fixed at R$ 9,90
  const initialGeo = getInitialGeoState();
  const [activeGeo, setActiveGeo] = useState<GeoDetectionResult>(initialGeo);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('lead_geo_country_data_v2');
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Formats in BRL (e.g. 19.9 -> "R$ 19,90", 97 -> "R$ 97,00")
  const convertAndFormat = useCallback((val: number): string => {
    const formattedNum = Number(val).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `R$ ${formattedNum}`;
  }, []);

  const setCountry = useCallback((code: string) => {
    const normalized = normalizeCountry(code);
    const config = COUNTRY_PRICING[normalized] || COUNTRY_PRICING.BR || COUNTRY_PRICING.DEFAULT;
    setActiveGeo({
      countryCode: normalized,
      config,
      source: 'url_param',
      rawCountry: code,
    });
  }, []);

  const setCurrency = useCallback((_code: string) => {}, []);

  const config = activeGeo.config;

  return (
    <CurrencyContext.Provider
      value={{
        originalPrice: FIXED_OFFER_PRICE,
        convertedPrice: FIXED_OFFER_PRICE,
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        formattedPrice: FIXED_OFFER_PRICE_FORMATTED,
        isConverting: false,
        rate: 1,
        detectedCountry: config.countryCode,
        countryName: config.countryName,
        countryNameFr: config.countryNameFr,
        countryFlag: config.flag,
        geoSource: activeGeo.source,
        setCurrency,
        setCountry,
        convertAndFormat,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
