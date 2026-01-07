"use client";

import { Check, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";
import { useState } from "react";

interface ProductProps {
    id: number;
    title: string;
    price: string;
    originalPrice?: string;
    features: string[];
    isBestSeller?: boolean;
    category: string;
    imageColor: string;
}

const ProductCard = ({ id, title, price, originalPrice, features, isBestSeller, category, imageColor }: ProductProps) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        const product: Product = {
            id,
            title,
            price,
            originalPrice,
            features,
            isBestSeller,
            category,
            imageColor,
        };

        addToCart(product);
        setIsAdded(true);

        // Reset after 2 seconds
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group relative rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col h-full">

            {/* Best Seller Badge */}
            {isBestSeller && (
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
                    BEST SELLER
                </div>
            )}

            {/* Image / Header Area */}
            <div className={`h-40 ${imageColor} p-6 relative flex flex-col justify-end overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-transparent opacity-90" />
                <div className="relative z-10">
                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1 block">{category}</span>
                    <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Price */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">{price}</span>
                        {originalPrice && (
                            <span className="text-sm text-white/40 line-through">{originalPrice}</span>
                        )}
                    </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white transition-colors">
                            <Check className="w-5 h-5 text-primary shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Action */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] ${isAdded
                            ? "bg-green-500 text-white cursor-default"
                            : "bg-white/10 hover:bg-primary hover:text-black text-white"
                        }`}
                >
                    {isAdded ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Ditambahkan!
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            Tambah ke Keranjang
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
