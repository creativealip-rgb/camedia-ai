import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Trusted by 1000+ Customers</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 animate-fade-in-up [animation-delay:200ms]">
                    Akses Semua <span className="text-primary">Akun Premium</span> <br className="hidden md:block" />
                    dalam Satu Genggaman.
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
                    Proses cepat, harga hemat, dan garansi anti-nanggung. Temukan akun streaming, desain, hingga produktivitas hanya di MAP Store.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
                    <Link
                        href="#catalog"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-background font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_-5px_var(--color-primary)] hover:shadow-[0_0_40px_-5px_var(--color-primary)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Lihat Katalog <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#why-us"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        Pelajari Dulu
                    </Link>
                </div>

                {/* Features / Trust Bar below Hero */}
                <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up [animation-delay:800ms]">
                    {[
                        { icon: Zap, label: "Proses Kilat", desc: "Langsung kirim setelah bayar" },
                        { icon: ShieldCheck, label: "Full Garansi", desc: "Anti backroll atau hold" },
                        { icon: BadgeCheck, label: "100% Legal", desc: "Bukan akun curian/hack" },
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-white/5">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{feature.label}</h3>
                                <p className="text-sm text-white/50">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Hero;
