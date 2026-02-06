import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function SectionTitle({ icon, title, sub, viewAll }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          {icon && <span>{icon}</span>} {title}
        </h2>
        {sub && <p className="text-sm text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {viewAll && (
        <Link
          href={`${viewAll}`}
          className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
