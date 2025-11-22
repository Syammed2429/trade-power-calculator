import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Coins, DollarSign, Clock, Calendar, RefreshCw } from "lucide-react";

interface CoreSettingsProps {
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  tpLifespan: number;
  setTpLifespan: (value: number) => void;
  totalDays: number;
  setTotalDays: (value: number) => void;
  reinvestEnabled: boolean;
  setReinvestEnabled: (value: boolean) => void;
}

export function CoreSettings({
  initialInvestment,
  setInitialInvestment,
  tpLifespan,
  setTpLifespan,
  totalDays,
  setTotalDays,
  reinvestEnabled,
  setReinvestEnabled,
}: CoreSettingsProps) {
  return (
    <Card className='bg-slate-900 border-slate-800'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-amber-400 text-sm flex items-center gap-2'>
          <Coins className='h-4 w-4' /> Core Settings
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-0 md:space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 items-end'>
          <div className='md:space-y-1'>
            <Label className='text-slate-400 text-xs flex items-center gap-1'>
              <DollarSign className='h-3 w-3' />
              Initial Investment
            </Label>
            <Input
              type='number'
              value={initialInvestment === 0 ? "" : initialInvestment}
              onChange={(e) =>
                setInitialInvestment(
                  e.target.value === "" ? 0 : parseFloat(e.target.value) || 0
                )
              }
              className='bg-slate-800 border-slate-700 text-white h-9'
              placeholder='Enter amount'
            />
          </div>
          <div className='md:space-y-1'>
            <Label className='text-slate-400 text-xs flex items-center gap-1'>
              <Clock className='h-3 w-3' />
              TP Lifespan (days)
            </Label>
            <Input
              type='number'
              value={tpLifespan === 0 ? "" : tpLifespan}
              onChange={(e) =>
                setTpLifespan(
                  e.target.value === "" ? 0 : parseInt(e.target.value) || 0
                )
              }
              className='bg-slate-800 border-slate-700 text-white h-9'
              placeholder='Enter days'
            />
          </div>
          <div className='md:space-y-1'>
            <Label className='text-slate-400 text-xs flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              Simulation Days
            </Label>
            <Input
              type='number'
              value={totalDays === 0 ? "" : totalDays}
              onChange={(e) =>
                setTotalDays(
                  e.target.value === "" ? 0 : parseInt(e.target.value) || 0
                )
              }
              className='bg-slate-800 border-slate-700 text-white h-9'
              placeholder='Enter days'
            />
          </div>
        </div>

        <div className='flex items-center justify-between p-2 bg-slate-800/50 rounded-lg'>
          <div className='flex items-center gap-2'>
            <RefreshCw
              className={`h-4 w-4 ${
                reinvestEnabled ? "text-emerald-400" : "text-slate-500"
              }`}
            />
            <span className='text-sm text-slate-300'>
              Auto-reinvest daily profits
            </span>
          </div>
          <Switch
            checked={reinvestEnabled}
            onCheckedChange={setReinvestEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
