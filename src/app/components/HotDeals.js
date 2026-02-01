import React from 'react'
import ProductCard from './ProductCard'

export default function HotDeals({hotDeals, SectionTitle}) {
  return (
    <div>
        <section className="container mx-auto px-4 py-4">
        <SectionTitle icon="🔥" title="Hot Deals Today" viewAll="#" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotDeals.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>
    </div>
  )
}
