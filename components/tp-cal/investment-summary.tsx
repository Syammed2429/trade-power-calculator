import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Target } from "lucide-react";
import type { Summary } from "./types";

interface InvestmentSummaryProps {
  summary: Summary;
  initialInvestment: number;
}

export function InvestmentSummary({
  summary,
  initialInvestment,
}: InvestmentSummaryProps) {
  return (
    <Card className='bg-linear-to-r from-slate-900 to-slate-800 border-slate-700'>
      <CardContent className='p-3'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-amber-400 font-semibold text-sm mb-2 flex items-center gap-1'>
              <Layers className='h-4 w-4' /> Investment Summary
            </p>
            <div className='text-xs space-y-1 text-slate-300'>
              <p>
                • Initial:{" "}
                <span className='text-white font-bold'>
                  ${initialInvestment}
                </span>
              </p>
              <p>
                • Additional injected:{" "}
                <span className='text-cyan-400 font-bold'>
                  ${summary.additionalInvested.toFixed(0)}
                </span>
              </p>
              <p>
                • Total invested:{" "}
                <span className='text-blue-400 font-bold'>
                  ${summary.totalInjected.toFixed(0)}
                </span>
              </p>
            </div>
          </div>
          <div>
            <p className='text-emerald-400 font-semibold text-sm mb-2 flex items-center gap-1'>
              <Target className='h-4 w-4' /> Returns
            </p>
            <div className='text-xs space-y-1 text-slate-300'>
              <p>
                • Gross profit:{" "}
                <span className='text-emerald-400 font-bold'>
                  ${summary.totalProfit.toFixed(2)}
                </span>
              </p>
              <p>
                • Final daily:{" "}
                <span className='text-emerald-400 font-bold'>
                  ${summary.finalDaily.toFixed(2)}/day
                </span>
              </p>
              <p>
                • ROI:{" "}
                <span className='text-purple-400 font-bold'>
                  {summary.roi}%
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
