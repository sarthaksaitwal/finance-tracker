import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{
        background: '#1c1c2e',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minWidth: 140,
      }}
    >
      <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-full"
              style={{ width: 7, height: 7, background: entry.color }}
            />
            <span className="text-xs text-slate-300 capitalize">{entry.dataKey}</span>
          </div>
          <span
            className="text-xs font-bold font-mono"
            style={{ color: entry.color }}
          >
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Custom Legend ─────────────────────────────────────────────────────────────

function CustomLegend({ payload }) {
  return (
    <div className="flex items-center justify-center gap-5 mt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full"
            style={{ width: 8, height: 8, background: entry.color }}
          />
          <span className="text-xs text-slate-400 capitalize">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LineChartComponent({ data }) {
  if (!data?.length) return (
    <div className="flex items-center justify-center h-56 text-slate-500 text-sm">
      Loading chart…
    </div>
  )

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#00d68f" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#00d68f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ff4d6a" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#ff4d6a" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />

        <YAxis
          tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          dx={-4}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />

        <Legend content={<CustomLegend />} />

        <Area
          type="monotone"
          dataKey="income"
          stroke="#00d68f"
          strokeWidth={2.5}
          fill="url(#incomeGrad)"
          dot={{ r: 4, fill: '#00d68f', stroke: '#0f0f17', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#00d68f', stroke: '#0f0f17', strokeWidth: 2 }}
        />

        <Area
          type="monotone"
          dataKey="expense"
          stroke="#ff4d6a"
          strokeWidth={2.5}
          fill="url(#expenseGrad)"
          dot={{ r: 4, fill: '#ff4d6a', stroke: '#0f0f17', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#ff4d6a', stroke: '#0f0f17', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
