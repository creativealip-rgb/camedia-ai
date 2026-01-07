const faqs = [
    {
        q: "Apakah akun ini legal?",
        a: "100% Legal. Kami menggunakan metode pembayaran resmi (Family Plan/Corporate) sehingga akun aman dari banned.",
    },
    {
        q: "Berapa lama garansi berlaku?",
        a: "Garansi berlaku Full Durasi sewa. Jika Anda beli 1 bulan, garansi 30 hari. Jika mati, kami ganti baru.",
    },
    {
        q: "Apa bedanya Private vs Sharing?",
        a: "Private: 1 Akun milik Anda sendiri (bisa ubah profil/password). Sharing: 1 Akun dipakai beramai-ramai (lebih murah, dilarang ubah setting).",
    },
    {
        q: "Proses pengiriman berapa lama?",
        a: "Rata-rata 1-10 menit saat jam kerja (09.00 - 22.00). Diluar itu mungkin sedikit lebih lambat.",
    },
];

const FAQ = () => {
    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Sering <span className="text-secondary">Ditanyakan</span></h2>
                    <p className="text-white/60 text-lg">Jawaban untuk keraguan Anda.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-6">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                                {faq.q}
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
