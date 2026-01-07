"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";

export default function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
                <AuthModal />
                <CartDrawer />
            </CartProvider>
        </AuthProvider>
    );
}
