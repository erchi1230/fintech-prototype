/**
 * Format a number as USD currency.
 * Uses Intl.NumberFormat for locale-aware formatting.
 */
export function useFormatCurrency() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return {
    format: (value: number) => formatter.format(value),
    formatCompact: (value: number) => {
      if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
      if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
      if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
      return formatter.format(value);
    },
    formatPercent: (value: number) => `${(value * 100).toFixed(1)}%`,
  };
}
