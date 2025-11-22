import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, ArrowUpCircle } from "lucide-react";
import type { DailyData } from "./types";

interface DailyBreakdownTableProps {
  dailyData: DailyData[];
}

export function DailyBreakdownTable({ dailyData }: DailyBreakdownTableProps) {
  return (
    <Card className='bg-slate-900 border-slate-800'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-amber-400 text-sm flex items-center gap-2'>
          <TrendingUp className='h-4 w-4' /> Daily Breakdown
          <Badge variant='secondary' className='text-xs ml-auto'>
            {dailyData.length} days
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='relative overflow-auto max-h-[400px] border-t border-slate-800'>
          <Table>
            <TableHeader>
              <TableRow className='border-slate-700'>
                <TableHead className='text-slate-300 text-xs sticky top-0 bg-slate-800 z-10'>
                  Day
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  Active TP
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-center sticky top-0 bg-slate-800 z-10'>
                  Rate
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  Daily Profit
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  New TP
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  Injected
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  Cumulative
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  Batches
                </TableHead>
                <TableHead className='text-slate-300 text-xs text-right sticky top-0 bg-slate-800 z-10'>
                  To Expire
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyData.map((d) => {
                const isExpireDay = d.hasInitialExpiring;
                const isInjectionDay = d.injectedToday > 0 && d.day > 1;
                const rowClass = isExpireDay
                  ? "bg-red-950/40"
                  : isInjectionDay
                  ? "bg-cyan-950/30"
                  : "hover:bg-slate-800/50";

                return (
                  <TableRow
                    key={d.day}
                    className={`border-slate-800 ${rowClass}`}
                  >
                    <TableCell className='text-white font-medium text-xs'>
                      {d.day}
                      {isInjectionDay && (
                        <ArrowUpCircle className='h-3 w-3 inline ml-1 text-cyan-400' />
                      )}
                    </TableCell>
                    <TableCell className='text-amber-300 text-xs text-right'>
                      {d.totalTP.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Badge
                        variant='outline'
                        className='text-purple-400 border-purple-600 text-xs'
                      >
                        {d.rate}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-emerald-400 text-xs text-right'>
                      ${d.dailyProfit.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-cyan-400 text-xs text-right'>
                      +{d.newTP.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-xs text-right'>
                      {d.injectedToday > 0 ? (
                        <span className='text-cyan-400 font-bold'>
                          +${d.injectedToday}
                        </span>
                      ) : (
                        <span className='text-slate-600'>-</span>
                      )}
                    </TableCell>
                    <TableCell className='text-emerald-300 text-xs text-right'>
                      ${d.cumProfit.toFixed(2)}
                    </TableCell>
                    <TableCell className='text-blue-300 text-xs text-right'>
                      {d.batches}
                    </TableCell>
                    <TableCell className='text-red-400 text-xs text-right'>
                      {d.expiring > 0 ? d.expiring.toFixed(4) : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
