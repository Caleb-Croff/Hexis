import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { WeightEntry } from '../types';
import styles from './WeightChart.module.css';

type Range = '1W' | '1M' | '3M' | '1Y' | 'ALL';

const RANGES: { label: string; value: Range }[] = [
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: 'All', value: 'ALL' },
];

function getCutoff(range: Range): Date | null {
  const now = new Date();
  switch (range) {
    case '1W': return new Date(now.setDate(now.getDate() - 7));
    case '1M': return new Date(now.setMonth(now.getMonth() - 1));
    case '3M': return new Date(now.setMonth(now.getMonth() - 3));
    case '1Y': return new Date(now.setFullYear(now.getFullYear() - 1));
    case 'ALL': return null;
  }
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

interface Props {
  entries: WeightEntry[];
}

export function WeightChart({ entries }: Props) {
  const [range, setRange] = useState<Range>('1M');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cutoff = getCutoff(range);

  const filtered = entries
    .filter((e) => {
      if (!cutoff) return true;
      return parseLocalDate(e.entry_date) >= cutoff;
    })
    .slice()
    .sort((a, b) => a.entry_date.localeCompare(b.entry_date));

  const chartData = filtered.map((e) => ({
    date: formatAxisDate(e.entry_date),
    weight: e.weight_value,
  }));

  const weights = filtered.map((e) => e.weight_value);
  const min = weights.length ? Math.floor(Math.min(...weights) - 2) : 0;
  const max = weights.length ? Math.ceil(Math.max(...weights) + 2) : 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Progress</h2>
        <div className={styles.rangeButtons}>
          {RANGES.map((r) => (
            <button
              key={r.value}
              className={range === r.value ? `${styles.rangeBtn} ${styles.active}` : styles.rangeBtn}
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {chartData.length < 2 ? (
        <p className={styles.empty}>
          {entries.length < 2
            ? 'Log at least 2 entries to see your chart.'
            : 'No entries in this time range.'}
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#222' : '#f3f4f6'} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: isDark ? '#555' : '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[min, max]}
              tick={{ fontSize: 12, fill: isDark ? '#555' : '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#1a1a1a' : '#fff',
                border: `1px solid ${isDark ? '#2e2e2e' : '#e5e7eb'}`,
                borderRadius: 8,
                fontSize: 13,
                color: isDark ? '#f5f5f5' : '#111827',
              }}
              formatter={(value) => [`${value} lbs`, 'Weight']}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function formatAxisDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
