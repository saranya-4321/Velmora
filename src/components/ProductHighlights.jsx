const essentialOils = ['Eucalyptus', 'Rosemary', 'Lavender', 'Peppermint', 'Tea Tree Oil', 'Lemon Grass - Coming Soon']

const giftBoxes = ['Gift Box 1 - Eucalyptus + Rosemary', 'Gift Box 2 - Select 2 or 3 Products']

const certifications = ['GC/MS Tested', 'FSSAI', 'Cruelty Free', 'Vegan']

export default function ProductHighlights() {
  return (
    <section className="container-page mt-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <article className="card p-6">
          <h3 className="font-heading text-2xl">Essential Oils</h3>
          <p className="mt-2 text-sm text-charcoal/70">Pure, steam distilled oils for daily wellness rituals.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {essentialOils.map((item) => (
              <span key={item} className="rounded-full bg-forest/10 px-3 py-1.5 text-sm font-semibold text-forest">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="card p-6">
          <h3 className="font-heading text-2xl">Gift Boxes</h3>
          <p className="mt-2 text-sm text-charcoal/70">Wellness gifting combos by Velmora.</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            {giftBoxes.map((item) => (
              <li key={item} className="rounded-xl bg-white/70 px-3 py-2 ring-1 ring-forest/10">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="card p-6">
          <h3 className="font-heading text-2xl">Trust & Certifications</h3>
          <p className="mt-2 text-sm text-charcoal/70">Quality and ethics at every step.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {certifications.map((item) => (
              <span key={item} className="rounded-full bg-gold/25 px-3 py-1.5 text-sm font-semibold text-charcoal">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-charcoal/75">
            Velmora essential oils are designed for aromatherapy, hair care, skincare, and gifting.
          </p>
        </article>
      </div>
    </section>
  )
}
