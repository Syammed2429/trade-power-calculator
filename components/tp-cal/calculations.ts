import type {
  RateTier,
  Batch,
  DailyData,
  Injection,
  CalculationResult,
} from "./types";

export function getPeriodDays(period: string, customDays: number): number {
  switch (period) {
    case "daily":
      return 1;
    case "weekly":
      return 7;
    case "biweekly":
      return 14;
    case "monthly":
      return 30;
    case "custom":
      return customDays;
    default:
      return 0;
  }
}

export function getRate(tp: number, sortedTiers: RateTier[]): number {
  for (const tier of sortedTiers) {
    if (tp >= tier.min) return tier.rate / 100;
  }
  return sortedTiers[sortedTiers.length - 1].rate / 100;
}

export function getRateLabel(tp: number, sortedTiers: RateTier[]): string {
  for (const tier of sortedTiers) {
    if (tp >= tier.min) return `${tier.rate}%`;
  }
  return `${sortedTiers[sortedTiers.length - 1].rate}%`;
}

export function calculateInvestment(
  initialInvestment: number,
  tpLifespan: number,
  totalDays: number,
  tiers: RateTier[],
  reinvestEnabled: boolean,
  additionalInvestment: number,
  periodDays: number
): CalculationResult {
  const sortedTiers = [...tiers].sort((a, b) => b.min - a.min);
  const batches: Batch[] = [];
  const data: DailyData[] = [];
  const inj: Injection[] = [];
  let cumProfit = 0;
  let totalInjected = initialInvestment;

  for (let day = 1; day <= totalDays; day++) {
    const active = batches.filter((b) => day - b.day < tpLifespan);
    batches.length = 0;
    batches.push(...active);

    let injectedToday = 0;

    // Initial investment on day 1
    if (day === 1) {
      batches.push({ day: 1, amount: initialInvestment, type: "initial" });
      injectedToday = initialInvestment;
    }

    // Additional periodic investment
    if (
      additionalInvestment > 0 &&
      periodDays > 0 &&
      day > 1 &&
      (day - 1) % periodDays === 0
    ) {
      batches.push({ day, amount: additionalInvestment, type: "additional" });
      totalInjected += additionalInvestment;
      injectedToday = additionalInvestment;
      inj.push({ day, amount: additionalInvestment });
    }

    const totalTP = batches.reduce((s, b) => s + b.amount, 0);
    const rate = getRate(totalTP, sortedTiers);
    const rateLabel = getRateLabel(totalTP, sortedTiers);
    const dailyProfit = totalTP * rate;
    cumProfit += dailyProfit;

    const expiring = batches
      .filter((b) => day - b.day === tpLifespan - 1)
      .reduce((s, b) => s + b.amount, 0);
    const expiringTypes = batches
      .filter((b) => day - b.day === tpLifespan - 1)
      .map((b) => b.type);

    data.push({
      day,
      totalTP,
      rate: rateLabel,
      dailyProfit,
      newTP: reinvestEnabled ? dailyProfit : 0,
      cumProfit,
      batches: batches.length,
      expiring,
      injectedToday,
      totalInjected,
      hasInitialExpiring: expiringTypes.includes("initial"),
      hasAdditionalExpiring: expiringTypes.includes("additional"),
    });

    // Reinvest profit
    if (reinvestEnabled && dailyProfit > 0) {
      batches.push({ day, amount: dailyProfit, type: "profit" });
    }
  }

  const final = data[data.length - 1];
  const netProfit = cumProfit - (totalInjected - initialInvestment);

  return {
    dailyData: data,
    injections: inj,
    summary: {
      totalProfit: cumProfit,
      finalTP: final?.totalTP || 0,
      finalDaily: final?.dailyProfit || 0,
      roi: ((cumProfit / totalInjected) * 100).toFixed(2),
      totalInjected,
      additionalInvested: totalInjected - initialInvestment,
      netProfit,
      netROI: ((netProfit / totalInjected) * 100).toFixed(2),
    },
  };
}
