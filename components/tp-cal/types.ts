export interface RateTier {
  min: number;
  rate: number;
}

export interface Batch {
  day: number;
  amount: number;
  type: "initial" | "additional" | "profit";
}

export interface DailyData {
  day: number;
  totalTP: number;
  rate: string;
  dailyProfit: number;
  newTP: number;
  cumProfit: number;
  batches: number;
  expiring: number;
  injectedToday: number;
  totalInjected: number;
  hasInitialExpiring: boolean;
  hasAdditionalExpiring: boolean;
}

export interface Injection {
  day: number;
  amount: number;
}

export interface Summary {
  totalProfit: number;
  finalTP: number;
  finalDaily: number;
  roi: string;
  totalInjected: number;
  additionalInvested: number;
  netProfit: number;
  netROI: string;
}

export interface CalculationResult {
  dailyData: DailyData[];
  injections: Injection[];
  summary: Summary;
}

export type PeriodType =
  | "none"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "custom";

export interface PeriodOption {
  value: PeriodType;
  label: string;
  icon: string | null;
}
