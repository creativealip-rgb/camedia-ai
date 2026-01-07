"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, parsePrice } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const { user, setAuthModalOpen, setAuthMode } = useAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            setAuthMode("register");
            setAuthModalOpen(true);
        }
    }, [user, setAuthMode, setAuthModalOpen]);

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            router.push("/");
        }
    }, [items, router]);

    const handleContinueToPayment = () => {
        if (!user) {
            setAuthMode("register");
            setAuthModalOpen(true);
            return;
        }
        router.push("/payment");
    };

    if (!user || items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-white/60">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Checkout</h1>
                        <p className="text-white/60">Review pesanan Anda sebelum pembayaran</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                                <h2 className="text-xl font-bold">Produk ({getCartCount()} item)</h2>
                            </div>

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                                    >
                                        {/* Product Image */}
                                        <div className={`w-20 h-20 rounded-lg ${item.product.imageColor} flex-shrink-0`} />

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg">{item.product.title}</h3>
                                            <p className="text-white/60 text-sm">{item.product.category}</p>
                                            <div className="flex items-baseline gap-2 mt-1">
                                                <span className="text-primary font-bold">{item.product.price}</span>
                                                {item.product.originalPrice && (
                                                    <span className="text-white/40 text-sm line-through">
                                                        {item.product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quantity & Actions */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>

                            {/* User Info */}
                            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
                                <p className="text-sm text-white/60 mb-1">Pesanan atas nama:</p>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-white/60">{user.email}</p>
                                <p className="text-sm text-white/60">{user.whatsapp}</p>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm">
                                        <span className="text-white/70 truncate max-w-[150px]">
                                            {item.product.title} x{item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            {formatPrice(parsePrice(item.product.price) * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-white/10 mb-4" />

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-2xl font-bold text-primary">
                                    {formatPrice(getCartTotal())}
                                </span>
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={handleContinueToPayment}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                Lanjut ke Pembayaran
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <p className="text-center text-white/40 text-sm mt-4">
                                Anda akan diarahkan ke halaman pembayaran
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
