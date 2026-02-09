import StarRating from "@/app/components/StarRating";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import createSlug from "./createSlug";

export default function ProductListCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const productSlug = product.slug || createSlug(product.name);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row">
      <Link
        href={`/${productSlug}`}
        className="relative overflow-hidden bg-gray-50 block sm:w-64 h-48 sm:h-auto flex-shrink-0"
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
        {/* Badges */}

        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(product.id)}
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

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <Link href={`/${productSlug}`}>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                {product.category}
              </p>
              <h3 className="text-base font-bold text-gray-800 mt-1 mb-1">
                <div className="hover:text-emerald-600 transition-colors">
                  {product.name}
                </div>
              </h3>
              <p className="text-xs text-gray-400">{product.weight}</p>
            </Link>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            className="bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition-transform"
          >
            <Heart
              size={18}
              className={
                wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              }
            />
          </button>
        </div>

        <Link href={`/${productSlug}`}>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} size={14} />
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
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
              disabled={product.inStock === 0}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                product.inStock > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg active:scale-95"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
