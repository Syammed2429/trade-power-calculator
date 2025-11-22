/**
 * TP Calculator Components
 *
 * A modular, type-safe calculator for investment planning with:
 * - Core investment settings
 * - Recurring investment options
 * - Configurable rate tiers
 * - Real-time calculations
 * - Summary visualizations
 */

export { Header } from "./header";
export { CoreSettings } from "./core-settings";
export { RecurringInvestment } from "./recurring-investment";
export { RateTiers } from "./rate-tiers";
export { SummaryCards } from "./summary-cards";
export { DailyBreakdownTable } from "./daily-breakdown-table";
export { InvestmentSummary } from "./investment-summary";
export {
  calculateInvestment,
  getPeriodDays,
  getRate,
  getRateLabel,
} from "./calculations";
export type {
  RateTier,
  Batch,
  DailyData,
  Injection,
  Summary,
  CalculationResult,
  PeriodType,
  PeriodOption,
} from "./types";
