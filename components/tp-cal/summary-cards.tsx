import React from "react";
import { TrendingUp, Wallet, DollarSign, Target } from "lucide-react";
import type { Summary } from "./types";

interface SummaryCardsProps {
  summary: Summary;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  bgColor: string;
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  textColor,
  bgColor,
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${bgColor} border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${gradient} opacity-10`} />

      {/* Content */}
      <div className='relative p-4 space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
            {label}
          </span>
          <div className={`p-2 rounded-lg ${bgColor} border border-white/10`}>
            {icon}
          </div>
        </div>
        <div className={`text-2xl font-bold ${textColor} tracking-tight`}>
          {value}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 w-full ${gradient}`} />
    </div>
  );
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const stats = [
    {
      label: "Total Profit",
      value: `$${summary.totalProfit.toFixed(2)}`,
      icon: <TrendingUp className='h-4 w-4 text-emerald-400' />,
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-950/30",
    },
    {
      label: "Final TP",
      value: summary.finalTP.toFixed(2),
      icon: <Target className='h-4 w-4 text-amber-400' />,
      gradient: "bg-gradient-to-r from-amber-500 to-orange-500",
      textColor: "text-amber-400",
      bgColor: "bg-amber-950/30",
    },
    {
      label: "Total Invested",
      value: `$${summary.totalInjected.toFixed(0)}`,
      icon: <Wallet className='h-4 w-4 text-blue-400' />,
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      bgColor: "bg-blue-950/30",
    },
    {
      label: "ROI",
      value: `${summary.roi}%`,
      icon: <DollarSign className='h-4 w-4 text-purple-400' />,
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      bgColor: "bg-purple-950/30",
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
