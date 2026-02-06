import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({ cat }) {
  return (
    <div>
      <Link
        href={`${cat.name.toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`}
        className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 "
      >
        {/* background photo */}
        <Image
          src={cat.image}
          alt={cat.name}
          height={200}
          width={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* color-gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-55 group-hover:opacity-70 transition-opacity`}
        />
        {/* label */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 text-white text-center">
          <span className="text-3xl drop-shadow-lg">{cat.emoji}</span>
          <span className="text-xl font-bold mt-1.5 drop-shadow tracking-wide">
            {cat.name}
          </span>
          {/* "Shop →" pill – slides up on hover */}
          <span className="mt-2 text-[10px] font-semibold bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Shop →
          </span>
        </div>
      </Link>
    </div>
  )
}
