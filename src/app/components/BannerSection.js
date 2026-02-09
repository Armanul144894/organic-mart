import React from "react";
import Link from "next/link";
import { ArrowRight, Percent, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function BannerSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Large Banner */}
        <div className="md:col-span-7 relative overflow-hidden rounded-3xl shadow-2xl group min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-700/80 to-transparent z-10"></div>
          <Image
            height={400}
            width={600}
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=800&fit=crop"
            alt="Grocery Delivery"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-900 px-4 py-2 rounded-full w-fit mb-4 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">UP TO 50% OFF</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Stock Up On
              <br />
              <span className="text-yellow-300">Essentials</span>
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg">
              Fresh groceries delivered to your door. Shop organic vegetables,
              fruits, dairy & more.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-yellow-400 text-emerald-900 px-10 py-5 rounded-2xl font-extrabold hover:bg-white transition-all w-fit shadow-2xl text-lg"
            >
              SHOP NOW
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5 space-y-6">
          {/* Top Right Banner */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl group h-72">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 to-red-700/85 z-10"></div>
            <Image
              height={400}
              width={600}
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop"
              alt="Fresh Meat"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
              <div className="inline-flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full w-fit">
                <Percent className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-red-600">
                  SPECIAL OFFER
                </span>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-white mb-2">
                  Fresh Fruits
                </h3>
                <p className="text-white/90 mb-4">
                  Premium cuts delivered fresh
                </p>
                <Link
                  href="/fruits"
                  className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all w-fit"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Right Banner */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl group h-72">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/85 to-indigo-700/85 z-10"></div>
            <Image
              height={400}
              width={600}
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop"
              alt="Cooking Spices"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full w-fit">
                <span className="text-xs font-bold">ESSENTIAL ITEMS</span>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-white mb-2">
                  Spices & Oil
                </h3>
                <p className="text-white/90 mb-4">
                  Premium quality ingredients
                </p>
                <Link
                  href="/cooking-and-spices"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all w-fit"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Banners */}
        <div className="md:col-span-4 relative overflow-hidden rounded-3xl shadow-xl group h-56">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/85 to-cyan-700/85 z-10"></div>
          <Image
            height={400}
            width={600}
            src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop"
            alt="Fresh Fish"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
            <h3 className="text-3xl font-extrabold text-white mb-2">
              Fresh Fish
            </h3>
            <p className="text-white/90 text-sm mb-3">Ocean to your plate</p>
            <Link
              href="/meat-and-fish"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-300 transition-all w-fit text-sm"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="md:col-span-4 relative overflow-hidden rounded-3xl shadow-xl group h-56">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-700/85 z-10"></div>
          <Image
            height={400}
            width={600}
            src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=400&fit=crop"
            alt="Snacks"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
            <h3 className="text-3xl font-extrabold text-white mb-2">
              Tasty Snacks
            </h3>
            <p className="text-white/90 text-sm mb-3">
              Chips, nuts & more treats
            </p>
            <Link
              href="/snacks"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-300 transition-all w-fit text-sm"
            >
              Browse All
            </Link>
          </div>
        </div>

        <div className="md:col-span-4 relative overflow-hidden rounded-3xl shadow-xl group h-56">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/85 to-rose-700/85 z-10"></div>
          <Image
            height={400}
            width={600}
            src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop"
            alt="Beverages"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
            <h3 className="text-3xl font-extrabold text-white mb-2">
              Beverages
            </h3>
            <p className="text-white/90 text-sm mb-3">Juices, tea & coffee</p>
            <Link
              href="/beverages"
              className="inline-flex items-center gap-2 bg-white text-pink-600 px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-300 transition-all w-fit text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
