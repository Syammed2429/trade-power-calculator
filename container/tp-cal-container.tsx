"use client";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/tp-cal/header";
import { CoreSettings } from "@/components/tp-cal/core-settings";
import { RecurringInvestment } from "@/components/tp-cal/recurring-investment";
import { RateTiers } from "@/components/tp-cal/rate-tiers";
import { SummaryCards } from "@/components/tp-cal/summary-cards";
import { DailyBreakdownTable } from "@/components/tp-cal/daily-breakdown-table";
import { InvestmentSummary } from "@/components/tp-cal/investment-summary";
import {
  calculateInvestment,
  getPeriodDays,
} from "@/components/tp-cal/calculations";
import type { RateTier, PeriodType } from "@/components/tp-cal/types";

export default function TPCalculator() {
  // Core Settings
  const [initialInvestment, setInitialInvestment] = useState<number>(100);
  const [tpLifespan, setTpLifespan] = useState<number>(20);
  const [totalDays, setTotalDays] = useState<number>(120);

  // Re-investment Settings
  const [reinvestEnabled, setReinvestEnabled] = useState<boolean>(true);
  const [additionalInvestment, setAdditionalInvestment] = useState<number>(0);
  const [additionalPeriod, setAdditionalPeriod] = useState<PeriodType>("none");
  const [customPeriodDays, setCustomPeriodDays] = useState<number>(10);

  // Rate Tiers
  const [tiers, setTiers] = useState<RateTier[]>([
    { min: 0, rate: 5.5 },
    { min: 20, rate: 6.0 },
    { min: 300, rate: 6.5 },
    { min: 3000, rate: 7.0 },
  ]);

  const periodDays = getPeriodDays(additionalPeriod, customPeriodDays);

  const { dailyData, summary } = useMemo(
    () =>
      calculateInvestment(
        initialInvestment,
        tpLifespan,
        totalDays,
        tiers,
        reinvestEnabled,
        additionalInvestment,
        periodDays
      ),
    [
      initialInvestment,
      tpLifespan,
      totalDays,
      tiers,
      reinvestEnabled,
      additionalInvestment,
      periodDays,
    ]
  );

  return (
    <div className='p-3 bg-slate-950 min-h-screen space-y-3'>
      <Header />

      <CoreSettings
        initialInvestment={initialInvestment}
        setInitialInvestment={setInitialInvestment}
        tpLifespan={tpLifespan}
        setTpLifespan={setTpLifespan}
        totalDays={totalDays}
        setTotalDays={setTotalDays}
        reinvestEnabled={reinvestEnabled}
        setReinvestEnabled={setReinvestEnabled}
      />

      <RecurringInvestment
        additionalInvestment={additionalInvestment}
        setAdditionalInvestment={setAdditionalInvestment}
        additionalPeriod={additionalPeriod}
        setAdditionalPeriod={setAdditionalPeriod}
        customPeriodDays={customPeriodDays}
        setCustomPeriodDays={setCustomPeriodDays}
        periodDays={periodDays}
        totalDays={totalDays}
      />

      <RateTiers tiers={tiers} setTiers={setTiers} />

      <SummaryCards summary={summary} />

      <DailyBreakdownTable dailyData={dailyData} />

      <InvestmentSummary
        summary={summary}
        initialInvestment={initialInvestment}
      />
    </div>
  );
}
