const items = [
  {
    icon: '🌿',
    title: '100% Pure & Natural',
    text: 'Carefully sourced botanicals with therapeutic-grade quality.',
  },
  {
    icon: '🚚',
    title: 'Free Shipping above ₹499',
    text: 'Fast dispatch and safe packaging for every order.',
  },
  {
    icon: '🔬',
    title: 'GC/MS Tested & FSSAI',
    text: 'Strict quality checks for consistency, purity, and safety.',
  },
  {
    icon: '💚',
    title: 'Cruelty Free & Vegan',
    text: 'Always ethical ingredients and never tested on animals.',
  },
]

export default function Benefits() {
  return (
    <section className="mt-14">
      <div className="container-page">
        <div className="rounded-3xl bg-forest text-cream shadow-lift overflow-hidden relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_220px_at_20%_20%,rgba(201,168,76,0.7),transparent_60%),radial-gradient(520px_220px_at_85%_25%,rgba(143,175,106,0.6),transparent_60%)]" />
          <div className="relative p-8 sm:p-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((i) => (
              <div
                key={i.title}
                className="rounded-2xl bg-white/10 ring-1 ring-white/10 p-6 backdrop-blur"
              >
                <div className="text-2xl" aria-hidden="true">
                  {i.icon}
                </div>
                <h3 className="mt-3 font-heading text-lg text-cream">{i.title}</h3>
                <p className="mt-2 text-sm text-cream/80">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

