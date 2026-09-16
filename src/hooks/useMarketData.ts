import { useEffect, useState } from "react";
import { fetchCryptoQuotes, fetchForexQuotes, fetchTwelveDataQuotes, Quote } from "../lib/marketData";

export function useMarketData(refreshMs = 60000) {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.allSettled([
        fetchCryptoQuotes(),
        fetchForexQuotes(),
        fetchTwelveDataQuotes(),
      ]);

      if (cancelled) return;

      const merged: Record<string, Quote> = {};
      for (const r of results) {
        if (r.status === "fulfilled" && r.value) {
          for (const q of r.value) merged[q.symbol] = q;
        }
      }
      if (Object.keys(merged).length > 0) {
        setQuotes((prev) => ({ ...prev, ...merged }));
      }
    }

    load();
    const id = setInterval(load, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshMs]);

  return quotes;
}
