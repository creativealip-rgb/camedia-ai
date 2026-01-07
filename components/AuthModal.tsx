"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AuthModal = () => {
    const {
        isAuthModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        register
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isAuthModalOpen) return null;

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setWhatsapp("");
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (authMode === "login") {
                const result = await login(email, password);
                if (!result.success) {
                    setError(result.error || "Login gagal");
                } else {
                    resetForm();
                }
            } else {
                if (!name || !whatsapp) {
                    setError("Semua field harus diisi");
                    setIsLoading(false);
                    return;
                }
                const result = await register({ email, password, name, whatsapp });
                if (!result.success) {
                    setError(result.error || "Registrasi gagal");
                } else {
                    resetForm();
                }
            }
        } catch {
            setError("Terjadi kesalahan");
        }

        setIsLoading(false);
    };

    const switchMode = () => {
        setAuthMode(authMode === "login" ? "register" : "login");
        setError("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setAuthModalOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="relative p-6 pb-0">
                    <button
                        onClick={() => setAuthModalOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold mb-2">
                        {authMode === "login" ? "Selamat Datang! 👋" : "Buat Akun Baru 🚀"}
                    </h2>
                    <p className="text-white/60">
                        {authMode === "login"
                            ? "Login untuk melanjutkan pembelian"
                            : "Daftar untuk mulai berbelanja"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {authMode === "register" && (
                        <>
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm text-white/60">Nama Lengkap</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="space-y-2">
                                <label className="text-sm text-white/60">Nomor WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="tel"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        placeholder="08123456789"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            authMode === "login" ? "Login" : "Daftar Sekarang"
                        )}
                    </button>

                    {/* Switch Mode */}
                    <p className="text-center text-white/60 text-sm">
                        {authMode === "login" ? (
                            <>
                                Belum punya akun?{" "}
                                <button
                                    type="button"
                                    onClick={switchMode}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Daftar Sekarang
                                </button>
                            </>
                        ) : (
                            <>
                                Sudah punya akun?{" "}
                                <button
                                    type="button"
                                    onClick={switchMode}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
