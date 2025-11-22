import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";

export function Header() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-lg'>
          <Calculator className='h-5 w-5 text-white' />
        </div>
        <div>
          <h1 className='text-lg font-bold text-white'>
            TP Investment Calculator
          </h1>
          <p className='text-xs text-slate-500'>Pro Edition • God Mode</p>
        </div>
      </div>
      <Badge className='bg-linear-to-r from-purple-600 to-pink-600 text-white border-0'>
        v2.0
      </Badge>
    </div>
  );
}
