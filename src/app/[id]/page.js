// app/[id]/page.js
import { notFound } from "next/navigation";
import CategoryPage from "./components/CategoryPage";
import SubcategoryPage from "./components/SubcategoryPage";
import ProductPage from "./components/ProductPage";
import BrandPage from "./components/BrandPage";
import products from "@/data/products";
import { extractCategories, extractSubcategories, extractBrands } from "@/utils/extractData";

// Get dynamic mappings from actual product data
const categories = extractCategories();
const subcategories = extractSubcategories();
const brands = extractBrands();

// Helper function to create slug
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get product by slug
function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

// Get category info by slug
function getCategoryInfo(categorySlug) {
  return categories[categorySlug] || null;
}

// Get subcategory info by slug
function getSubcategoryInfo(subcategorySlug) {
  return subcategories[subcategorySlug] || null;
}

// Get brand info by slug
function getBrandInfo(brandSlug) {
  return brands[brandSlug] || null;
}

// Get products by category
function getProductsByCategory(categoryName) {
  return products.filter((p) => p.category === categoryName);
}

// Get products by subcategory
function getProductsBySubcategory(subcategoryName) {
  return products.filter((p) => p.subcategory === subcategoryName);
}

// Get products by brand
function getProductsByBrand(brandName) {
  return products.filter((p) => p.brand === brandName);
}

export default async function Page({ params }) {
  const { id } = await params;
  
  console.log("PARAMS:", id);

  if (!id || typeof id !== "string") {
    notFound();
  }

  // Priority 1: Check if it's a product slug
  const product = getProductBySlug(id);
  if (product) {
    return <ProductPage productSlug={id} />;
  }

  // Priority 2: Check if it's a brand
  const brandInfo = getBrandInfo(id);
  if (brandInfo) {
    const brandProducts = getProductsByBrand(brandInfo.name);
    return <BrandPage brand={brandInfo} products={brandProducts} />;
  }

  // Priority 3: Check if it's a subcategory
  const subcategoryInfo = getSubcategoryInfo(id);
  if (subcategoryInfo) {
    const subcategoryProducts = getProductsBySubcategory(subcategoryInfo.name);
    return (
      <SubcategoryPage
        subcategory={subcategoryInfo.name}
        category={subcategoryInfo.category}
        categorySlug={subcategoryInfo.categorySlug}
        products={subcategoryProducts}
      />
    );
  }

  // Priority 4: Check if it's a category
  const categoryInfo = getCategoryInfo(id);
  if (categoryInfo) {
    return <CategoryPage category={categoryInfo.name} categoryData={categoryInfo} />;
  }

  // Not found
  notFound();
}

export function generateStaticParams() {
  // Generate params for all categories
  const categoryParams = Object.keys(categories).map((slug) => ({
    id: slug,
  }));

  // Generate params for all subcategories
  const subcategoryParams = Object.keys(subcategories).map((slug) => ({
    id: slug,
  }));

  // Generate params for all brands
  const brandParams = Object.keys(brands).map((slug) => ({
    id: slug,
  }));

  // Generate params for all products
  const productParams = products.map((product) => ({
    id: product.slug,
  }));

  return [...categoryParams, ...subcategoryParams, ...brandParams, ...productParams];
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return {
      title: "Page Not Found - OrganicMart",
    };
  }

  // Check if it's a product
  const product = getProductBySlug(id);
  if (product) {
    return {
      title: `${product.name} - OrganicMart`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [product.images[0]],
      },
    };
  }

  // Check if it's a brand
  const brandInfo = getBrandInfo(id);
  if (brandInfo) {
    return {
      title: `${brandInfo.name} Products - OrganicMart`,
      description: `Shop ${brandInfo.productCount} products from ${brandInfo.name}. Premium quality products at best prices.`,
    };
  }

  // Check if it's a subcategory
  const subcategoryInfo = getSubcategoryInfo(id);
  if (subcategoryInfo) {
    return {
      title: `${subcategoryInfo.name} - ${subcategoryInfo.category} - OrganicMart`,
      description: `Browse ${subcategoryInfo.productCount} fresh ${subcategoryInfo.name.toLowerCase()} products in our ${subcategoryInfo.category} category`,
    };
  }

  // Check if it's a category
  const categoryInfo = getCategoryInfo(id);
  if (categoryInfo) {
    return {
      title: `${categoryInfo.name} - OrganicMart`,
      description: `Browse our fresh ${categoryInfo.name} - ${categoryInfo.productCount} products available`,
    };
  }

  return {
    title: "Page Not Found - OrganicMart",
  };
}