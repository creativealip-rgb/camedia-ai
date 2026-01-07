"use client";

import { products, categories } from "@/lib/data";
import ProductCard from "./ProductCard";
import { useState } from "react";

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);

    const filteredProducts = products.filter(
        (p) => activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase()
    );

    return (
        <section id="catalog" className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Pilih Paket <span className="text-primary">Premium</span> Anda</h2>
                    <p className="text-white/60 text-lg">Harga termurah untuk hiburan & produktivitas tanpa batas.</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all border ${activeCategory === cat.id
                                    ? "bg-primary text-black font-bold border-primary shadow-[0_0_20px_-5px_var(--color-primary)] scale-105"
                                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-10">
                            <p className="text-white/50 text-lg">Produk untuk kategori ini sedang restock.</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Catalog;
