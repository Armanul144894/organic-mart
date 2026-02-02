import { MailIcon } from 'lucide-react'
import React from 'react'

export default function Newsletter() {
  return (
    <div>
        <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <h3 className="text-xl font-extrabold flex items-center gap-2 justify-center sm:justify-start">
              <MailIcon size={22}/> Subscribe to Our Newsletter
            </h3>
            <p className="text-emerald-200 text-sm mt-1">Get the latest offers and updates delivered to your inbox.</p>
          </div>
          <div className="flex w-full sm:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-l-xl px-4 py-2.5 text-sm outline-none"
            />
            <button className="bg-white text-emerald-700 font-bold text-sm px-5 rounded-r-xl hover:bg-gray-100 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
