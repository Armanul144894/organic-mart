import React from 'react'
import BrandPage from './BrandPage'
export const metadata = {
  title: "Top Brands - OrganicMart",
  description: "Shop from trusted brands",
};
export default function page() {
  return (
    <div className='min-h-screen'>
        <BrandPage/>
    </div>
  )
}
