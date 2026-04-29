import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import authService from '../../services/authService'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  const icons = {
    plus:    <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    check:   <polyline points="20 6 9 17 4 12" />,
    spinner: <path d="M12 2a10 10 0 1 0 10 10" />,
    dollar:  <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    tag:     <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    type:    <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    x:       <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    note:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    wallet:  <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" /><path d="M22 10H2" /></>,
  }
  const isSpinner = name === 'spinner'
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      {isSpinner ? (
        <motion.path
          d="M12 2a10 10 0 1 0 10 10"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
          style={{ originX: '50%', originY: '50%' }}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
        />
      ) : icons[name]}
    </svg>
  )
}

// ─── Styled Field Wrapper ─────────────────────────────────────────────────────
function Field({ label, icon, children, error, iconTop = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute', left: 13,
            top: iconTop ? 12 : '50%',
            transform: iconTop ? 'none' : 'translateY(-50%)',
            pointerEvents: 'none', display: 'flex', alignItems: 'center',
            zIndex: 1,
          }}>
            <Icon name={icon} size={14} color="#475569" />
          </div>
        )}
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ fontSize: 11.5, color: '#ff4d6a', marginTop: 1 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Shared input styles ──────────────────────────────────────────────────────
const inputStyle = (hasIcon = true, hasError = false) => ({
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: hasError ? '1px solid rgba(255,77,106,0.5)' : '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  padding: hasIcon ? '10.5px 14px 10.5px 38px' : '10.5px 14px',
  color: '#e2e8f0',
  fontSize: 13.5,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
  appearance: 'none',
  WebkitAppearance: 'none',
})

// ─── Toast notification ────────────────────────────────────────────────────────
function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px', borderRadius: 12,
        background: type === 'success' ? 'rgba(0,214,143,0.12)' : 'rgba(255,77,106,0.12)',
        border: `1px solid ${type === 'success' ? 'rgba(0,214,143,0.25)' : 'rgba(255,77,106,0.25)'}`,
        fontSize: 13, fontWeight: 500,
        color: type === 'success' ? '#00d68f' : '#ff4d6a',
      }}
    >
      <Icon
        name={type === 'success' ? 'check' : 'x'}
        size={14}
        color={type === 'success' ? '#00d68f' : '#ff4d6a'}
        strokeWidth={2.5}
      />
      {message}
    </motion.div>
  )
}

// ─── Type Pill selector ───────────────────────────────────────────────────────
function TypeSelector({ value, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 6, padding: 4,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
    }}>
      {['income', 'expense'].map((t) => {
        const active = value === t
        const color = t === 'income' ? '#00d68f' : '#ff4d6a'
        const bg    = t === 'income' ? 'rgba(0,214,143,0.15)' : 'rgba(255,77,106,0.15)'
        const border = t === 'income' ? 'rgba(0,214,143,0.3)' : 'rgba(255,77,106,0.3)'
        return (
          <motion.button
            key={t}
            onClick={() => onChange(t)}
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1, padding: '8px 0', borderRadius: 9,
              border: active ? `1px solid ${border}` : '1px solid transparent',
              background: active ? bg : 'transparent',
              color: active ? color : '#475569',
              fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.18s',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{t === 'income' ? '📈' : '📉'}</span>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Payment Method Selector ──────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { value: 'cash',  label: 'Cash',  emoji: '💵' },
  { value: 'card',  label: 'Card',  emoji: '💳' },
  { value: 'upi',   label: 'UPI',   emoji: '📱' },
  { value: 'bank',  label: 'Bank',  emoji: '🏦' },
]

function PaymentMethodSelector({ value, onChange }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
    }}>
      {PAYMENT_METHODS.map((m) => {
        const active = value === m.value
        return (
          <motion.button
            key={m.value}
            onClick={() => onChange(m.value)}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: '9px 6px',
              borderRadius: 10,
              border: active ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.07)',
              background: active ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
              color: active ? '#818cf8' : '#475569',
              fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.16s',
              fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{m.emoji}</span>
            {m.label}
          </motion.button>
        )
      })}
    </div>
  )
}


export default function AddTransactionForm({ onTransactionAdded }) {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: '',
    paymentMethod: 'cash',
    date: today,
  })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)  // { message, type }

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid positive amount'
    if (!form.category.trim())
      e.category = 'Category is required'
    if (form.description.length > 200)
      e.description = 'Description must be 200 characters or fewer'
    if (!form.date)
      e.date = 'Date is required'
    return e
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setLoading(true)
    try {
      const payload = {
        amount: Number(form.amount),
        type: form.type,
        category: form.category.trim(),
        description: form.description.trim() || undefined,
        paymentMethod: form.paymentMethod,
        date: form.date,
        title: form.category.trim(),   // backend also accepts title
      }

      const res = await authService.fetchWithAuth(`${API_BASE}/api/transactions`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.message || 'Failed to add transaction')
      }

      // Reset form
      setForm({ amount: '', type: 'expense', category: '', description: '', paymentMethod: 'cash', date: today })
      setErrors({})
      showToast('Transaction added successfully!', 'success')

      // Notify parent to refresh
      if (typeof onTransactionAdded === 'function') onTransactionAdded()

    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  // focus/blur handlers for border glow
  const onFocus = e => {
    e.target.style.borderColor = 'rgba(99,102,241,0.55)'
    e.target.style.boxShadow   = '0 0 0 3px rgba(99,102,241,0.08)'
  }
  const onBlur = (e, hasError) => {
    e.target.style.borderColor = hasError ? 'rgba(255,77,106,0.5)' : 'rgba(255,255,255,0.08)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '22px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top gradient accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, rgba(99,102,241,0.6) 0%, rgba(0,214,143,0.4) 60%, transparent 100%)',
        borderRadius: '20px 20px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="plus" size={15} color="#818cf8" strokeWidth={2.5} />
          </div>
          <div>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.2px' }}>
              Add Transaction
            </h3>
            <p style={{ fontSize: 11.5, color: '#475569', marginTop: 1 }}>
              Record a new income or expense
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <div style={{ marginBottom: 16 }}>
            <Toast message={toast.message} type={toast.type} />
          </div>
        )}
      </AnimatePresence>

      {/* Form grid: 2 cols on wide, stacked on narrow */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 14,
      }}>

        {/* Type selector - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Type">
            <TypeSelector value={form.type} onChange={val => set('type', val)} />
          </Field>
        </div>

        {/* Amount */}
        <Field label="Amount" icon="dollar" error={errors.amount}>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
            onFocus={onFocus}
            onBlur={e => onBlur(e, !!errors.amount)}
            style={{ ...inputStyle(true, !!errors.amount) }}
          />
        </Field>

        {/* Category */}
        <Field label="Category" icon="tag" error={errors.category}>
          <input
            type="text"
            placeholder="e.g. Food & Dining"
            value={form.category}
            onChange={e => set('category', e.target.value)}
            onFocus={onFocus}
            onBlur={e => onBlur(e, !!errors.category)}
            style={{ ...inputStyle(true, !!errors.category) }}
          />
        </Field>

        {/* Date */}
        <Field label="Date" icon="calendar" error={errors.date}>
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            onFocus={onFocus}
            onBlur={e => onBlur(e, !!errors.date)}
            style={{
              ...inputStyle(true, !!errors.date),
              colorScheme: 'dark',
            }}
          />
        </Field>

        {/* Payment Method - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Payment Method" icon="wallet" error={errors.paymentMethod}>
            <PaymentMethodSelector
              value={form.paymentMethod}
              onChange={val => set('paymentMethod', val)}
            />
          </Field>
        </div>

        {/* Description - full width, optional */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Description (optional)" icon="note" error={errors.description} iconTop>
            <div style={{ position: 'relative' }}>
              <textarea
                placeholder="Add a note about this transaction…"
                value={form.description}
                maxLength={200}
                rows={2}
                onChange={e => set('description', e.target.value)}
                onFocus={onFocus}
                onBlur={e => onBlur(e, !!errors.description)}
                style={{
                  ...inputStyle(true, !!errors.description),
                  paddingTop: 10,
                  paddingBottom: 10,
                  resize: 'none',
                  lineHeight: 1.5,
                }}
              />
              {/* Character counter */}
              <span style={{
                position: 'absolute', bottom: 8, right: 12,
                fontSize: 10.5, fontWeight: 500,
                color: form.description.length > 180 ? '#ff4d6a' : '#334155',
                pointerEvents: 'none',
                transition: 'color 0.2s',
              }}>
                {form.description.length}/200
              </span>
            </div>
          </Field>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.015 }}
        whileTap={loading ? {} : { scale: 0.97 }}
        style={{
          marginTop: 18,
          width: '100%',
          padding: '11.5px 20px',
          borderRadius: 12,
          border: 'none',
          background: loading
            ? 'rgba(99,102,241,0.4)'
            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: loading ? 'none' : '0 4px 18px rgba(99,102,241,0.3)',
          transition: 'background 0.2s, box-shadow 0.2s',
          fontFamily: 'inherit',
          letterSpacing: '-0.1px',
        }}
      >
        {loading ? (
          <>
            <Icon name="spinner" size={16} color="#fff" strokeWidth={2.5} />
            Adding…
          </>
        ) : (
          <>
            <Icon name="plus" size={15} color="#fff" strokeWidth={2.5} />
            Add Transaction
          </>
        )}
      </motion.button>
    </motion.div>
  )
}