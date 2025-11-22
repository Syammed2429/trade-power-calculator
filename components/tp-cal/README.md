# TP Calculator Components

A modular, type-safe investment calculator built with React and TypeScript.

## 📁 Structure

```
components/tp-cal/
├── types.ts                    # TypeScript interfaces and types
├── calculations.ts             # Pure calculation functions
├── header.tsx                  # Header component
├── core-settings.tsx           # Core investment settings
├── recurring-investment.tsx    # Recurring investment configuration
├── rate-tiers.tsx             # Rate tier management
├── summary-cards.tsx          # Summary statistics cards
├── daily-breakdown-table.tsx  # Detailed daily breakdown table
├── investment-summary.tsx     # Investment summary component
└── index.ts                   # Barrel exports
```

## 🎯 Features

- **Type-Safe**: Full TypeScript support with proper types
- **Modular**: Each component is independent and reusable
- **Optimized**: Uses memoization for expensive calculations
- **Responsive**: Mobile-friendly design
- **Dark Theme**: Modern dark UI with gradient accents

## 🧩 Components

### Header

Displays the calculator title and version badge.

### CoreSettings

Configure:

- Initial investment amount
- TP lifespan (days)
- Simulation period (days)
- Auto-reinvest toggle

### RecurringInvestment

Set up recurring investments:

- Daily, weekly, biweekly, monthly, or custom periods
- Variable investment amounts
- Real-time total calculation

### RateTiers

Define rate tiers based on investment amount:

- Add/remove tiers dynamically
- Configure minimum amounts and rates
- Automatic sorting by minimum amount

### SummaryCards

Display key metrics:

- Total profit
- Final TP amount
- Total invested
- ROI percentage

### DailyBreakdownTable

Detailed daily breakdown showing:

- Active TP per day
- Current rate
- Daily profit
- New TP (if reinvesting)
- Injections
- Cumulative profit
- Expiring batches

### InvestmentSummary

Overview of:

- Investment breakdown (initial + additional)
- Returns summary
- ROI calculation

## 🔧 Usage

```tsx
import TPCalculator from "@/container/tp-cal-container";

export default function Page() {
  return <TPCalculator />;
}
```

Or use individual components:

```tsx
import {
  CoreSettings,
  RateTiers,
  calculateInvestment,
} from "@/components/tp-cal";
import type { RateTier } from "@/components/tp-cal";

// Use components individually
```

## 📦 Calculations

The `calculations.ts` file contains pure functions:

- `getPeriodDays(period, customDays)`: Convert period type to days
- `getRate(tp, sortedTiers)`: Get rate for given TP amount
- `getRateLabel(tp, sortedTiers)`: Get rate label string
- `calculateInvestment(...)`: Main calculation function

## 🎨 Styling

Uses Tailwind CSS with custom dark theme:

- Slate color palette
- Gradient accents (emerald, cyan, amber, purple)
- Responsive grid layouts
- Smooth transitions

## 📝 Types

All types are exported from `types.ts`:

- `RateTier`: Rate tier configuration
- `Batch`: Investment batch tracking
- `DailyData`: Daily calculation results
- `Summary`: Summary statistics
- `PeriodType`: Investment period options
- And more...

## 🚀 Performance

- Memoized calculations prevent unnecessary recalculations
- Optimized re-renders with proper React patterns
- Efficient data structures for batch tracking
