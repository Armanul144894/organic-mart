import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Truck,
  Shield,
  Heart,
  Users,
  Award,
  Leaf,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us - OrganicMart | Fresh & Organic Groceries",
  description:
    "Learn about OrganicMart's mission to deliver fresh, organic groceries to your doorstep. Trusted by thousands of families across Bangladesh.",
};

export default function AboutPage() {
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
            <span className="text-gray-800 font-semibold">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Bringing Freshness to Your Doorstep
            </h1>
            <p className="text-xl text-emerald-50 mb-8">
              We're on a mission to make healthy, organic living accessible to
              everyone in Bangladesh. Fresh products, fair prices, and
              exceptional service - that's the OrganicMart promise.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-3xl font-bold">5000+</span>
                <p className="text-sm text-emerald-50">Happy Customers</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-3xl font-bold">100+</span>
                <p className="text-sm text-emerald-50">Products</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-3xl font-bold">50+</span>
                <p className="text-sm text-emerald-50">Local Farmers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Real Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                From Farm to Your Family
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, OrganicMart started with a simple vision: to
                connect local farmers with health-conscious families. We believe
                that everyone deserves access to fresh, organic produce without
                compromise.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What began as a small weekend market has grown into Bangladesh's
                trusted online grocery platform. We work directly with over 50
                local farmers, ensuring fair prices for them and the freshest
                products for you.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every product we deliver is carefully selected, inspected, and
                handled with care. From farm to your table, we maintain the
                highest standards of quality and freshness.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">100% Organic</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">Locally Sourced</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop"
                  alt="Fresh Vegetables Market"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">100% Fresh</p>
                      <p className="text-sm text-gray-600">Farm to Table</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at OrganicMart
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is carefully
                inspected to meet our strict standards before reaching you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trust & Transparency
              </h3>
              <p className="text-gray-600">
                Know where your food comes from. We provide complete
                transparency about our sourcing and processes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We're committed to sustainable practices that protect our
                environment and support local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                alt="Delivery Service"
                height={200}
                width={400}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                Why Choose OrganicMart?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Fast Delivery
                    </h3>
                    <p className="text-gray-600">
                      Same-day delivery available. Fresh products delivered to
                      your door within hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Quality Guarantee
                    </h3>
                    <p className="text-gray-600">
                      Not satisfied? We offer hassle-free returns and 100% money
                      back guarantee.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Certified Organic
                    </h3>
                    <p className="text-gray-600">
                      All our products are certified organic and pesticide-free.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Supporting Local
                    </h3>
                    <p className="text-gray-600">
                      We work directly with local farmers, ensuring fair prices
                      and fresh produce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to bring you the best
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Rahman Ahmed",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
              },
              {
                name: "Fatima Khan",
                role: "Head of Operations",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
              },
              {
                name: "Karim Hassan",
                role: "Quality Manager",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
              },
              {
                name: "Nazia Rahman",
                role: "Customer Success",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    height={400}
                    width={400}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-emerald-600 font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">
                5000+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">
                100%
              </div>
              <div className="text-gray-600">Organic Certified</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">
                50+
              </div>
              <div className="text-gray-600">Partner Farmers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Join the OrganicMart Family
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Experience the freshness and quality that thousands of families
            trust every day
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-xl"
            >
              Start Shopping
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors border-2 border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
