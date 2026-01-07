import { MessageCircle, CreditCard, Gift } from "lucide-react";

const HowToOrder = () => {
    const steps = [
        {
            icon: Gift,
            title: "Pilih Produk",
            desc: "Cari akun premium yang kamu butuhkan di katalog.",
        },
        {
            icon: CreditCard,
            title: "Lakukan Pembayaran",
            desc: "Bayar via QRIS, E-Wallet, atau Transfer Bank.",
        },
        {
            icon: MessageCircle,
            title: "Terima Akun",
            desc: "Akun dikirim otomatis/manual via WhatsApp dalam hitungan menit.",
        },
    ];

    return (
        <section className="py-20 border-t border-white/5 bg-white/[0.02]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Cara Order <span className="text-primary">Gampang</span></h2>
                    <p className="text-white/60 text-lg">Cuma 3 langkah untuk menikmati hiburan premium.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent border-t border-dashed border-white/20 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-surface border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-all duration-500 relative">
                                <div className="absolute inset-2 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors" />
                                <step.icon className="w-10 h-10 text-white group-hover:text-primary transition-colors" />

                                {/* Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center border-4 border-background">
                                    {i + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-white/50 max-w-xs">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToOrder;
