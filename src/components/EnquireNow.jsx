import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { submitEnquiry } from '../lib/backend.js'

const initialForm = { name: '', phone: '', email: '', message: '' }

export default function EnquireNow() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(initialForm)

  async function onSubmit(e) {
    e.preventDefault()
    if (saving) return
    setSaving(true)
    try {
      await submitEnquiry(form)
      toast.success('Enquiry submitted successfully')
      setForm(initialForm)
      setOpen(false)
    } catch (error) {
      toast.error(error?.message || 'Failed to submit enquiry')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 sm:right-6 bottom-5 sm:bottom-7 z-[90] btn-gold shadow-lift gap-2 animate-pulse"
        aria-label="Open enquiry form"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" />
        Enquire Now
      </button>

      <div
        className={[
          'fixed inset-0 z-[100] transition',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div
          className={[
            'absolute inset-0 bg-charcoal/45 transition-opacity duration-200',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setOpen(false)}
        />
        <div className="absolute inset-x-4 sm:inset-x-auto sm:right-6 sm:w-[460px] bottom-5 sm:bottom-7">
          <div
            className={[
              'card p-5 sm:p-6 transition-all duration-200',
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-2xl">Enquire Now</h3>
              <button type="button" className="btn-outline !px-3 !py-1.5" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              {[
                ['name', 'Name', 'text', UserIcon],
                ['phone', 'Phone', 'tel', PhoneIcon],
                ['email', 'Email (optional)', 'email', EnvelopeIcon],
              ].map(([key, label, type, Icon]) => (
                <div key={key}>
                  <label htmlFor={`enq-${key}`} className="text-sm font-semibold">
                    {label}
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-0 grid place-items-center pl-3 text-charcoal/60">
                      <Icon className="h-5 w-5" />
                    </span>
                    <input
                      id={`enq-${key}`}
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                      required={key !== 'email'}
                    />
                  </div>
                </div>
              ))}
              <div>
                <label htmlFor="enq-message" className="text-sm font-semibold">
                  Message
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-0 top-3 grid place-items-center pl-3 text-charcoal/60">
                    <PencilSquareIcon className="h-5 w-5" />
                  </span>
                  <textarea
                    id="enq-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 p-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={saving}>
                {saving ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
