import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const contact = {
    name: 'Kamesh Raj . E',
    title: 'Founder & CEO',
    phone: '+91 99441 96216',
    email: 'velmoraoils@gmail.com',
    website: 'www.velmoraoilsandspices.com',
    gstin: '33DRYPK1687M1ZU',
    fssai: '12426997000230',
  }

  useEffect(() => {
    document.title = 'Contact — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Contact Velmora Oils — we’d love to hear from you.')
  }, [])

  return (
    <div className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card p-8 sm:p-12">
          <h1 className="font-heading text-3xl sm:text-4xl">Contact</h1>
          <p className="mt-4 text-sm sm:text-base text-charcoal/75 leading-relaxed">
            Questions about oils, orders, or rituals? Send us a note — we typically respond within 24
            hours.
          </p>
          <div className="mt-8 space-y-3 text-sm text-charcoal/75">
            <p>
              <span className="font-semibold text-charcoal">Email:</span> {contact.email}
            </p>
            <p>
              <span className="font-semibold text-charcoal">Phone:</span> {contact.phone}
            </p>
            <p>
              <span className="font-semibold text-charcoal">Hours:</span> Mon–Sat, 10am–6pm
            </p>
            <p>
              <span className="font-semibold text-charcoal">Website:</span> {contact.website}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5 bg-white/40">
              <p className="text-sm font-semibold text-charcoal">Business</p>
              <p className="mt-2 text-sm text-charcoal/70">
                {contact.name}
                <br />
                {contact.title}
              </p>
            </div>
            <div className="card p-5 bg-white/40">
              <p className="text-sm font-semibold text-charcoal">Compliance</p>
              <p className="mt-2 text-sm text-charcoal/70">
                GSTIN: {contact.gstin}
                <br />
                FSSAI: {contact.fssai}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl overflow-hidden ring-1 ring-forest/10 shadow-soft bg-white/40 p-6">
            <div className="flex items-center gap-4">
              <img
                src="/images/velmora-logo.png"
                alt="Velmora Oils logo"
                className="h-14 w-14 rounded-3xl bg-white/70 p-2 ring-1 ring-forest/10"
                loading="lazy"
              />
              <div>
                <p className="font-heading text-xl">Velmora — Pure Botanical Power</p>
                <p className="text-sm text-charcoal/70">We typically respond within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8 sm:p-12">
          <h2 className="font-heading text-2xl">Send a message</h2>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
                return toast.error('Please fill all fields')
              }
              toast.success('Message sent — we’ll reply soon')
              setForm({ name: '', email: '', message: '' })
            }}
          >
            <div>
              <label className="text-sm font-semibold" htmlFor="cname">
                Name
              </label>
              <input
                id="cname"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="cemail">
                Email
              </label>
              <input
                id="cemail"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="cmsg">
                Message
              </label>
              <textarea
                id="cmsg"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={5}
                className="mt-2 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
              />
            </div>
            <button type="submit" className="btn-primary w-full" aria-label="Submit contact form">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

