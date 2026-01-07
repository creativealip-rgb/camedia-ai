"use client";

import { categories } from "@/lib/data";
import { useState } from "react";

const CategoryNav = () => {
    const [active, setActive] = useState("streaming");

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all border ${active === cat.id
                            ? "bg-primary text-black font-bold border-primary shadow-[0_0_20px_-5px_var(--color-primary)] scale-105"
                            : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                        }`}
                >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryNav;
