import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const CURRENCIES = {
  USD: { code: 'usd', symbol: '$', label: 'United States', display: 'USD $' },
  GEL: { code: 'gel', symbol: '₾', label: 'Georgia', display: 'GEL ₾' },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      const stored = localStorage.getItem('currency');
      return stored ? JSON.parse(stored) : CURRENCIES.USD;
    } catch {
      return CURRENCIES.USD;
    }
  });

  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  const getPrice = (priceObj) => {
    if (!priceObj) return null;
    if (typeof priceObj === 'number') return priceObj;
    return priceObj[currency.code] ?? priceObj.usd ?? 0;
  };

  const formatPrice = (priceObj) => {
    const value = getPrice(priceObj);
    if (value === null) return '';
    return `${currency.symbol}${value.toFixed(2)}`;
  };

  // ✅ added — formats a plain already-resolved number
  const formatNumber = (value) => `${currency.symbol}${value.toFixed(2)}`;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, CURRENCIES, getPrice, formatPrice, formatNumber }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
