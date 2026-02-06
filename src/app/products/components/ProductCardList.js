import StarRating from '@/app/components/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function ProductCardList({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row h-full">
      <Link href={`/${product.slug}`}>
        {/* Image */}
        <div
          className="relative overflow-hidden bg-gray-50 sm:w-64 flex-shrink-0"
          style={{ height: 200 }}
        >
          <Image src={product.images[0]}
            alt={product.name.toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}
            height={200}
            width={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                -{product.discount}%
              </span>
            )}
            {product.featured && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                Featured
              </span>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
          >
            <Heart
              size={16}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              }
            />
          </button>
        </div>

      </Link>


      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/${product.slug}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                {product.brand}
              </p>
              <h3 className="text-base font-bold text-gray-800 mt-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{product.weight}</p>
            </div>
            {!product.inStock && (
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={product.rating} size={14} />
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">
              ৳{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ৳{product.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${product.inStock
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
