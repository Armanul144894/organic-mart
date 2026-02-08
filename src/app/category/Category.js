import categories from "@/data/categories";
import React from "react";
import CategoryCard from "../components/CategoryCard";
import SectionTitle from "../components/SectionTitle";

export default function Category() {
  const allCategory = categories;
  return (
    <section className="container mx-auto px-4 py-7">
      <SectionTitle
        title="All Category"
        sub="Browse our fresh collections"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {allCategory.map((cat) => (
          <div key={cat?.id}>
            <CategoryCard cat={cat} />
          </div>
        ))}
      </div>
    </section>
  );
}
