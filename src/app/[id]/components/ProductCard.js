'use client'
import { Heart, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import Link from 'next/link';
import StarRating from '@/app/components/StarRating';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <Link href={`${product?.slug}`}>
        {/* image */}
        <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>

          <Image
            src={product.images[0]}
            alt={product.name}
            height={200}
            width={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          {/* discount badge */}
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
              -{product.discount}%
            </span>
          )}
          {/* wishlist */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
          >
            <Heart size={16} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>
          {/* quick-view overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center pb-3">
            <button className="bg-white text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg hover:bg-emerald-600 hover:text-white transition-colors">
              Quick View
            </button>
          </div>
        </div>

        {/* body */}
        <div className="p-3.5 flex flex-col flex-1">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide truncate">{product.brand}</p>
          <h3 className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-2 leading-snug">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>

          <div className="flex items-center gap-1.5 mt-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          {/* price + add */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-emerald-600">৳{product.price}</span>
              <span className="text-xs text-gray-400 line-through">৳{product.oldPrice}</span>
            </div>
            <button className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-90">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
