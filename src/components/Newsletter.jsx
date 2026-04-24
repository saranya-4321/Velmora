import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section className="mt-14">
      <div className="container-page">
        <div className="rounded-3xl bg-forest text-cream shadow-lift overflow-hidden relative">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(700px_260px_at_15%_20%,rgba(201,168,76,0.75),transparent_60%),radial-gradient(640px_260px_at_85%_35%,rgba(143,175,106,0.6),transparent_60%)]" />
          <div className="relative p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl text-cream">
                Get 10% off your first order
              </h2>
              <p className="mt-2 text-sm text-cream/80">
                Join the Velmora list for new drops, rituals, and exclusive offers.
              </p>
            </div>

            <form
              className="w-full max-w-xl"
              onSubmit={(e) => {
                e.preventDefault()
                if (!email.trim()) return toast.error('Please enter your email')
                toast.success('Subscribed — welcome to Velmora')
                setEmail('')
              }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-full bg-white/10 ring-1 ring-white/15 px-5 text-cream placeholder:text-cream/60 focus:outline-none focus:ring-2 focus:ring-gold/70"
                />
                <button type="submit" className="btn-gold h-12 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-cream/70">No spam, unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

