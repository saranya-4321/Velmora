import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const contact = {
  name: 'Kamesh Raj . E',
  title: 'Founder & CEO',
  phone: '+91 99441 96216',
  email: 'velmoraoils@gmail.com',
  website: 'www.velmoraoilsandspices.com',
}

const T = {
  greenDark: '#1B4332',
  green: '#2D6A4F',
  greenMid: '#40916C',
  greenTint: '#F0FAF4',
  gold: '#C9961A',
  goldLight: '#F0C84A',
  white: '#FFFFFF',
  offWhite: '#F8F6F0',
  muted: '#5C6B5E',
  charcoal: '#1A1A1A',
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:wght@400;500&display=swap');

  .contact-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: sans-serif;
  }

  /* ── LEFT PANEL ── */
  .contact-left {
    background: linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #1a3d2e 100%);
    padding: 4rem 3.5rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .contact-left::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240,200,74,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .contact-left::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240,200,74,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .contact-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .contact-eyebrow-line {
    width: 2rem;
    height: 2px;
    background: #F0C84A;
    flex-shrink: 0;
  }

  .contact-eyebrow-text {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #F0C84A;
  }

  .contact-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 4vw, 3.2rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    margin: 0 0 1rem;
  }

  .contact-subtext {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.8;
    margin: 0 0 2.5rem;
    max-width: 26rem;
  }

  .contact-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .contact-info-item {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1rem;
    padding: 1.1rem 1.25rem;
    backdrop-filter: blur(4px);
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .contact-info-item:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(240,200,74,0.3);
  }

  .contact-info-label {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #F0C84A;
    margin: 0 0 0.4rem;
  }

  .contact-info-value {
    font-family: 'Lora', serif;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.85);
    line-height: 1.5;
    margin: 0;
    word-break: break-all;
  }

  .contact-divider {
    height: 1px;
    background: linear-gradient(to right, rgba(240,200,74,0.4), transparent);
    margin: 1.75rem 0;
  }

  .contact-person-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1rem;
    padding: 1.25rem 1.4rem;
  }

  .contact-person-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C9961A, #F0C84A);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #1B4332;
    flex-shrink: 0;
  }

  .contact-person-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.2rem;
  }

  .contact-person-title {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.5);
    margin: 0;
    letter-spacing: 0.05em;
  }

  .contact-response-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(240,200,74,0.12);
    border: 1px solid rgba(240,200,74,0.25);
    border-radius: 999px;
    padding: 0.35rem 0.9rem;
    margin-top: 1.25rem;
  }

  .contact-response-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #F0C84A;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .contact-response-text {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #F0C84A;
  }

  /* ── RIGHT PANEL ── */
  .contact-right {
    background: #F8F6F0;
    padding: 4rem 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contact-form-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #1B4332;
    margin: 0 0 0.5rem;
  }

  .contact-form-sub {
    font-family: 'Lora', serif;
    font-size: 0.88rem;
    color: #5C6B5E;
    margin: 0 0 2rem;
    line-height: 1.7;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #1B4332;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    height: 48px;
    border-radius: 0.875rem;
    background: #fff;
    border: 1.5px solid rgba(45,106,79,0.15);
    padding: 0 1rem;
    font-size: 0.9rem;
    color: #1A1A1A;
    font-family: 'Lora', serif;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .form-input:focus {
    border-color: #C9961A;
    box-shadow: 0 0 0 3px rgba(201,150,26,0.12);
  }

  .form-textarea {
    width: 100%;
    border-radius: 0.875rem;
    background: #fff;
    border: 1.5px solid rgba(45,106,79,0.15);
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
    color: #1A1A1A;
    font-family: 'Lora', serif;
    outline: none;
    resize: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    line-height: 1.7;
  }

  .form-textarea:focus {
    border-color: #C9961A;
    box-shadow: 0 0 0 3px rgba(201,150,26,0.12);
  }

  .form-submit {
    width: 100%;
    height: 52px;
    border-radius: 999px;
    background: linear-gradient(135deg, #1B4332, #2D6A4F);
    color: #fff;
    font-family: sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 8px 24px rgba(27,67,50,0.25);
    margin-top: 0.5rem;
  }

  .form-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(27,67,50,0.35);
  }

  .form-submit:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .contact-wrap { grid-template-columns: 1fr; }
    .contact-left { padding: 3rem 1.5rem; }
    .contact-right { padding: 3rem 1.5rem; }
    .contact-info-grid { grid-template-columns: 1fr; }
  }
`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    document.title = 'Contact Velmora | Essential Oils Manufacturer India | Bulk Orders'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', "Contact Velmora for pure essential oils, bulk orders, and wholesale enquiries. India's leading therapeutic essential oils manufacturer.")
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return toast.error('Please fill all fields')
    }
    toast.success("Message sent — we'll reply soon")
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      <style>{css}</style>
      <div className="contact-wrap">

        {/* ══ LEFT PANEL ══ */}
        <div className="contact-left">

          {/* Top section */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="contact-eyebrow">
              <div className="contact-eyebrow-line" />
              <span className="contact-eyebrow-text">Get in Touch</span>
            </div>

            <h1 className="contact-heading">
              Let's Build Something<br />Great Together
            </h1>

            <p className="contact-subtext">
              Whether you're sourcing premium spices, exploring bulk partnerships, or need compliance documentation — our team is ready to support your requirements.
            </p>

            {/* Info grid */}
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <p className="contact-info-label">📧 Email</p>
                <p className="contact-info-value">{contact.email}</p>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">📞 Phone</p>
                <p className="contact-info-value">{contact.phone}</p>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">🕐 Hours</p>
                <p className="contact-info-value">Mon–Sat<br />10am – 6pm IST</p>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">🌐 Website</p>
                <p className="contact-info-value">{contact.website}</p>
              </div>
            </div>

            <div className="contact-divider" />

            {/* Person card */}
            <div className="contact-person-card">
              <div className="contact-person-avatar">K</div>
              <div>
                <p className="contact-person-name">{contact.name}</p>
                <p className="contact-person-title">{contact.title} · Velmora Oils & Spices</p>
              </div>
            </div>
          </div>

          {/* Bottom badge */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="contact-response-badge">
              <div className="contact-response-dot" />
              <span className="contact-response-text">Typically responds within 24 hours</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="contact-right">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2rem', height: '2px', background: T.gold, flexShrink: 0 }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold }}>Send a Message</span>
            </div>
            <h2 className="contact-form-heading">How Can We Help?</h2>
            <p className="contact-form-sub">
              Fill in your details and we'll get back to you with pricing, samples, or compliance documentation.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cname">Your Name</label>
                <input
                  id="cname"
                  className="form-input"
                  placeholder="e.g. John Smith"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cemail">Email Address</label>
                <input
                  id="cemail"
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cmsg">Your Message</label>
                <textarea
                  id="cmsg"
                  className="form-textarea"
                  rows={5}
                  placeholder="Tell us about your requirements — spice type, quantity, destination market..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                />
              </div>

              <button type="submit" className="form-submit">
                Send Message →
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.7rem', color: T.muted, fontFamily: 'sans-serif' }}>
                🔒 Your information is kept private and never shared.
              </p>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}