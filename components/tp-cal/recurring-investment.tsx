import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpCircle, Zap } from "lucide-react";
import type { PeriodType, PeriodOption } from "./types";

interface RecurringInvestmentProps {
  additionalInvestment: number;
  setAdditionalInvestment: (value: number) => void;
  additionalPeriod: PeriodType;
  setAdditionalPeriod: (value: PeriodType) => void;
  customPeriodDays: number;
  setCustomPeriodDays: (value: number) => void;
  periodDays: number;
  totalDays: number;
}

const periodOptions: PeriodOption[] = [
  { value: "none", label: "No Additional", icon: null },
  { value: "daily", label: "Every Day", icon: "24h" },
  { value: "weekly", label: "Every Week", icon: "7d" },
  { value: "biweekly", label: "Every 2 Weeks", icon: "14d" },
  { value: "monthly", label: "Every Month", icon: "30d" },
  { value: "custom", label: "Custom Days", icon: "?" },
];

export function RecurringInvestment({
  additionalInvestment,
  setAdditionalInvestment,
  additionalPeriod,
  setAdditionalPeriod,
  customPeriodDays,
  setCustomPeriodDays,
  periodDays,
  totalDays,
}: RecurringInvestmentProps) {
  const totalAdditional =
    additionalPeriod !== "none" && additionalInvestment > 0 && periodDays > 0
      ? Math.floor((totalDays - 1) / periodDays) * additionalInvestment
      : 0;

  return (
    <Card className='bg-slate-900 border-slate-800 border-l-4 border-l-cyan-500'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-cyan-400 text-sm flex items-center gap-2'>
          <ArrowUpCircle className='h-4 w-4' /> Recurring Investment
          <Badge
            variant='outline'
            className='text-xs border-cyan-600 text-cyan-400 ml-auto'
          >
            NEW
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='space-y-1'>
            <Label className='text-slate-400 text-xs'>
              Amount per Period ($)
            </Label>
            <Input
              type='number'
              value={additionalInvestment === 0 ? "" : additionalInvestment}
              onChange={(e) =>
                setAdditionalInvestment(
                  e.target.value === "" ? 0 : parseFloat(e.target.value) || 0
                )
              }
              className='bg-slate-800 border-slate-700 text-white h-9'
              placeholder='Enter amount'
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-slate-400 text-xs'>Frequency</Label>
            <Select
              value={additionalPeriod}
              onValueChange={(value) =>
                setAdditionalPeriod(value as PeriodType)
              }
            >
              <SelectTrigger className='bg-slate-800 border-slate-700 text-white h-9'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-slate-800 border-slate-700'>
                {periodOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className='flex items-center justify-between text-white hover:bg-slate-700'
                  >
                    <div className=' gap-2'>{opt.label}</div>
                    {opt.icon && (
                      <Badge variant='secondary' className='text-xs ml-1'>
                        {opt.icon}
                      </Badge>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {additionalPeriod === "custom" && (
          <div className='space-y-1'>
            <Label className='text-slate-400 text-xs'>
              Custom Period (every X days)
            </Label>
            <Input
              type='number'
              value={customPeriodDays === 0 ? "" : customPeriodDays}
              onChange={(e) =>
                setCustomPeriodDays(
                  e.target.value === "" ? 0 : parseInt(e.target.value) || 0
                )
              }
              className='bg-slate-800 border-slate-700 text-white h-9'
              min='1'
              placeholder='Enter days'
            />
          </div>
        )}

        {additionalPeriod !== "none" &&
          additionalInvestment > 0 &&
          periodDays > 0 && (
            <div className='p-2 bg-cyan-950/30 rounded-lg border border-cyan-800/50'>
              <p className='text-xs text-cyan-300'>
                <Zap className='h-3 w-3 inline mr-1' />
                You&apos;ll inject{" "}
                <span className='font-bold text-cyan-400'>
                  ${additionalInvestment}
                </span>{" "}
                every{" "}
                <span className='font-bold text-cyan-400'>
                  {periodDays} day(s)
                </span>
                → Total additional:{" "}
                <span className='font-bold text-emerald-400'>
                  ${totalAdditional.toFixed(0)}
                </span>{" "}
                over {totalDays} days
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
