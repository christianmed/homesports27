
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

type Currency = 'USD' | 'VES';

interface CurrencyContextType {
  currency: Currency;
  exchangeRate: number;
  toggleCurrency: () => void;
  convertPrice: (priceUSD: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback rate in case API fails (Updated regularly manually if needed)
  const FALLBACK_RATE = 60.00; 

  useEffect(() => {
    // 1. Load saved preference
    const savedCurrency = localStorage.getItem('hsp_currency') as Currency;
    if (savedCurrency) setCurrency(savedCurrency);

    // 2. Fetch Exchange Rate
    const fetchRate = async () => {
      try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        const data = await res.json();
        if (data && data.promedio) {
          setExchangeRate(data.promedio);
        } else {
            console.warn("API Error, using fallback");
            setExchangeRate(FALLBACK_RATE);
        }
      } catch (error) {
        console.error("Failed to fetch rate:", error);
        setExchangeRate(FALLBACK_RATE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
  }, []);

  const toggleCurrency = () => {
    const newCurrency = currency === 'USD' ? 'VES' : 'USD';
    setCurrency(newCurrency);
    localStorage.setItem('hsp_currency', newCurrency);
  };

  const convertPrice = (priceUSD: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceUSD);
    } else {
      const priceVES = priceUSD * exchangeRate;
      return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(priceVES);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, toggleCurrency, convertPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
