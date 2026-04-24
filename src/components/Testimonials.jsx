import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const testimonials = [
  {
    name: 'Aarav Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'The Lavender is unbelievably calming. The aroma feels premium and clean — exactly what I wanted for nightly wind-downs.',
  },
  {
    name: 'Isha Kapoor',
    location: 'Delhi',
    rating: 5,
    text: 'Sweet Orange is my morning ritual now. It instantly lifts the mood and makes the whole room feel fresh.',
  },
  {
    name: 'Rohan Nair',
    location: 'Bengaluru',
    rating: 4,
    text: 'Sandalwood Reserve feels luxurious. It layers beautifully with citrus oils and works great for meditation.',
  },
]

function Stars({ value }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? 'text-gold' : 'text-charcoal/20'}>
          ★
        </span>
      ))}
    </div>
  )
}

function InitialsAvatar({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
  return (
    <div className="h-11 w-11 rounded-2xl bg-forest/10 ring-1 ring-forest/10 grid place-items-center font-bold text-forest">
      <span aria-hidden="true">{initials}</span>
      <span className="sr-only">{name}</span>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="container-page mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl">What Our Customers Say</h2>
          <p className="mt-2 text-sm text-charcoal/70">Real rituals. Real results.</p>
        </div>
      </div>

      <div className="mt-6 hidden md:grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="card p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <InitialsAvatar name={t.name} />
                <div>
                  <p className="font-semibold text-charcoal">{t.name}</p>
                  <p className="text-sm text-charcoal/60">{t.location}</p>
                </div>
              </div>
              <Stars value={t.rating} />
            </div>
            <p className="mt-4 text-sm text-charcoal/75 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          spaceBetween={16}
          slidesPerView={1.05}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={t.name} />
                    <div>
                      <p className="font-semibold text-charcoal">{t.name}</p>
                      <p className="text-sm text-charcoal/60">{t.location}</p>
                    </div>
                  </div>
                  <Stars value={t.rating} />
                </div>
                <p className="mt-4 text-sm text-charcoal/75 leading-relaxed">{t.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

