import { RotateCcw, ShieldCheck, Tag, Truck } from 'lucide-react'
import React from 'react'

export default function HomeFeatures() {
    return (
        <div>
            <section className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: <Truck size={28} className="text-emerald-500" />, title: "Free Delivery", desc: "On orders over ৳500" },
                        { icon: <ShieldCheck size={28} className="text-sky-500" />, title: "Secure Payment", desc: "100 % secure transactions" },
                        { icon: <RotateCcw size={28} className="text-amber-500" />, title: "Easy Returns", desc: "7-day return policy" },
                        { icon: <Tag size={28} className="text-pink-500" />, title: "Special Offers", desc: "Weekly deals & discounts" },
                    ].map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">{f.icon}</div>
                            <h4 className="font-bold text-gray-800 text-sm">{f.title}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
