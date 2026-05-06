import { useState } from 'react'
import { motion } from 'framer-motion'

function ToggleRow({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.05]">
      <div>
        <p className="text-slate-200 font-medium text-sm">{label}</p>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        className="rounded-full transition-all duration-200 flex-shrink-0"
        style={{
          width: 40, height: 22,
          background: value ? '#6366f1' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}
      >
        <span
          className="absolute rounded-full bg-white transition-transform duration-200"
          style={{
            width: 16, height: 16,
            top: 2, left: 2,
            transform: value ? 'translateX(18px)' : 'translateX(0)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </button>
    </div>
  )
}

export default function SettingsPage({ dark, onToggleDark }) {
  const [notifs, setNotifs]   = useState(true)
  const [alerts, setAlerts]   = useState(false)
  const [currency, setCurrency] = useState('INR')

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="p-8"
      style={{ maxWidth: 640, margin: '0 auto' }}
    >
      <div className="mb-6">
        <h2 className="text-white font-bold mb-1" style={{ fontSize: 22 }}>Settings</h2>
        <p className="text-slate-500 text-sm">Manage your preferences</p>
      </div>

      {/* Appearance */}
      <section
        className="rounded-2xl p-5 mb-4"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h3 className="text-white font-semibold text-sm mb-1">Appearance</h3>
        <ToggleRow
          label="Dark Mode"
          description="Switch between light and dark themes"
          value={dark}
          onChange={onToggleDark}
        />
      </section>

      {/* Notifications */}
      <section
        className="rounded-2xl p-5 mb-4"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h3 className="text-white font-semibold text-sm mb-1">Notifications</h3>
        <ToggleRow label="Transaction Alerts"    value={notifs} onChange={setNotifs} />
        <ToggleRow label="Monthly Budget Alerts" value={alerts} onChange={setAlerts} />
      </section>

      {/* Currency */}
      {/* <section
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h3 className="text-white font-semibold text-sm mb-3">Preferences</h3>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Default Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full rounded-xl px-3.5 py-2.5 text-sm text-slate-200 outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <option value="USD">USD — US Dollar</option>
          <option value="EUR">EUR — Euro</option>
          <option value="GBP">GBP — British Pound</option>
          <option value="INR">INR — Indian Rupee</option>
        </select>
      </section> */}
    </motion.div>
  )
}
