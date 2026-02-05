import Link from 'next/link';
import React from 'react'

const weeklyOffers = [
  { id: 1, title: "Fresh Vegetables", discount: "30% OFF", desc: "On all organic vegetables", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=700&h=400&fit=crop", badge: "Limited" },
  { id: 2, title: "Dairy Products", discount: "25% OFF", desc: "Fresh milk, cheese & butter", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=700&h=400&fit=crop", badge: "Hot" },
  { id: 3, title: "Snacks & Treats", discount: "20% OFF", desc: "Your favourite snack combos", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=700&h=400&fit=crop", badge: "New" },
];
export default function WeeklyOffer({ SectionTitle }) {
  return (
    <div>
      <Link href='/products'>
        <section className="container mx-auto px-4 py-6">
          <SectionTitle icon="💰" title="Weekly Special Offers" sub="Limited time deals – grab them fast!" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeklyOffers.map(offer => (
              <div
                key={offer.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ height: 240 }}
              >
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-center px-5 text-white">
                  <span className="inline-flex bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full w-fit">{offer.badge}</span>
                  <h3 className="text-lg font-extrabold mt-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>{offer.title}</h3>
                  <p className="text-xs text-gray-300 mt-0.5">{offer.desc}</p>
                  <span className="text-2xl font-extrabold text-emerald-300 mt-1">{offer.discount}</span>
                  <button className="mt-3 w-fit bg-white text-gray-800 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Link>

    </div>
  )
}
