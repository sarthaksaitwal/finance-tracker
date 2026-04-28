import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{
        background: '#1c1c2e',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block rounded-full"
          style={{ width: 8, height: 8, background: d.payload.color }}
        />
        <span className="text-xs text-slate-300">{d.payload.name}</span>
        <span className="text-xs font-bold text-white ml-1">{d.value}%</span>
      </div>
    </div>
  )
}

// ─── Legend row ────────────────────────────────────────────────────────────────

function LegendRow({ item }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2.5">
        <span
          className="rounded-full flex-shrink-0"
          style={{ width: 9, height: 9, background: item.color }}
        />
        <span className="text-slate-300" style={{ fontSize: 12.5 }}>
          {item.name}
        </span>
      </div>
      <span className="font-semibold text-slate-300 font-mono" style={{ fontSize: 12.5 }}>
        {item.value}%
      </span>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PieChartComponent({ data }) {
  if (!data?.length) return (
    <div className="flex items-center justify-center h-56 text-slate-500 text-sm">
      Loading chart…
    </div>
  )

  return (
    <div className="flex items-center gap-6">
      {/* Donut chart */}
      <div className="flex-shrink-0">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex-1 min-w-0">
        <div className="divide-y divide-white/[0.05]">
          {data.map((item, idx) => (
            <LegendRow key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
