import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Percent } from "lucide-react";
import type { RateTier } from "./types";

interface RateTiersProps {
  tiers: RateTier[];
  setTiers: (tiers: RateTier[]) => void;
}

export function RateTiers({ tiers, setTiers }: RateTiersProps) {
  const updateTier = (index: number, field: keyof RateTier, value: string) => {
    const updatedTiers = [...tiers];
    updatedTiers[index][field] = value === "" ? 0 : parseFloat(value) || 0;
    setTiers(updatedTiers);
  };

  const addTier = () => {
    setTiers([...tiers, { min: 0, rate: 5.0 }]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, idx) => idx !== index));
  };

  return (
    <Card className='bg-slate-900 border-slate-800'>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-purple-400 text-sm flex items-center gap-2'>
            <Percent className='h-4 w-4' /> Rate Tiers
          </CardTitle>
          <Button
            onClick={addTier}
            size='sm'
            variant='outline'
            className='h-7 text-xs border-purple-600 text-purple-400 hover:bg-purple-900'
          >
            <PlusCircle className='h-3 w-3 mr-1' /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-2'>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className='flex items-center gap-1 p-2 bg-slate-800/50 rounded'
            >
              <span className='text-slate-500 text-xs'>≥$</span>
              <Input
                type='number'
                value={tier.min === 0 ? "" : tier.min}
                onChange={(e) => updateTier(i, "min", e.target.value)}
                className='w-20 h-7 bg-slate-800 border-slate-700 text-white text-xs'
                placeholder='0'
              />
              <span className='text-slate-500 text-xs'>→</span>
              <Input
                type='number'
                step='0.1'
                value={tier.rate === 0 ? "" : tier.rate}
                onChange={(e) => updateTier(i, "rate", e.target.value)}
                className='w-16 h-7 bg-slate-800 border-slate-700 text-white text-xs'
                placeholder='0'
              />
              <span className='text-slate-500 text-xs'>%</span>
              {tiers.length > 1 && (
                <Button
                  onClick={() => removeTier(i)}
                  size='sm'
                  variant='ghost'
                  className='h-6 w-6 p-0 text-red-400 hover:bg-red-900/30'
                >
                  <Trash2 className='h-3 w-3' />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
