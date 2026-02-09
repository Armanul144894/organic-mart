import StarRating from '@/app/components/StarRating';
import { Heart, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import createSlug from './createSlug';

export default function ProductGridCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const productSlug = product.slug || createSlug(product.name);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link
        href={`/${productSlug}`}
        className="relative overflow-hidden bg-gray-50 block"
        style={{ height: 220 }}
      >

        <Image
         src={product.images[0]}
          alt={product.name}
          height={200}
          width={400}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
              -{product.discount}%
            </span>
          )}
          {product.inStock < 20 && product.inStock > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
              Low Stock
            </span>
          )}
          {product.inStock === 0 && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
              Out of Stock
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </button>
      </Link>

      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide truncate">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-2 leading-snug">
          <Link
            href={`/${productSlug}`}
            className="hover:text-emerald-600 transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-emerald-600">
              ৳{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.oldPrice}
              </span>
            )}
          </div>
          <button
            disabled={product.inStock === 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
              product.inStock > 0
                ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg active:scale-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
