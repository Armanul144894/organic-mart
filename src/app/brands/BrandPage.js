// app/brands/page.js
import React from "react";
import Link from "next/link";
import { extractBrands } from "@/utils/extractData";
import { ChevronRight } from "lucide-react";

export default function BrandsPage() {
  const brands = extractBrands();
  const brandsArray = Object.values(brands).sort((a, b) => b.productCount - a.productCount);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-semibold">Brands</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            🏆 Top Brands
          </h1>
          <p className="text-lg text-gray-600">
            Trusted by millions • {brandsArray.length} premium brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center items-center gap-6">
          {brandsArray.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${brand.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-40 flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                {/* Brand Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: brand.color }}
                >
                  {brand.name.charAt(0)}
                </div>
                
                {/* Brand Name */}
                <h3 className="text-sm font-bold text-gray-800 text-center line-clamp-2 mb-1">
                  {brand.name}
                </h3>
                
                {/* Product Count */}
                <span className="text-xs text-gray-500 font-medium">
                  {brand.productCount} {brand.productCount === 1 ? 'product' : 'products'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600 mb-2">
              {brandsArray.length}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Trusted Brands
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600 mb-2">
              {brandsArray.reduce((sum, b) => sum + b.productCount, 0)}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Total Products
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600 mb-2">
              100%
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Quality Assured
            </div>
          </div>
        </div>

        {/* Featured Brands Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Brands
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandsArray.slice(0, 6).map((brand) => (
              <Link
                key={brand.slug}
                href={`/${brand.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Brand Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: brand.color }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  
                  {/* Brand Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {brand.productCount} products across {brand.categories.length} {brand.categories.length === 1 ? 'category' : 'categories'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {brand.categories.slice(0, 3).map((category, idx) => (
                        <span
                          key={idx}
                          className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                      {brand.categories.length > 3 && (
                        <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          +{brand.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <ChevronRight 
                    className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
                    size={20} 
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}