const testimonials = [
    {
        name: "Budi Santoso",
        role: "Mahasiswa",
        text: "Udah langganan Netflix 3 bulan di sini, gapernah ada masalah. Admin fast respown banget!",
        rating: 5,
    },
    {
        name: "Siti Aminah",
        role: "Freelancer",
        text: "Cari Canva Pro murah tapi legal susah, untung ketemu MAP Store. Fitur lengkap, tim saya seneng.",
        rating: 5,
    },
    {
        name: "Rizky Ramadhan",
        role: "Gamer",
        text: "Beli akun game di sini garansinya beneran jalan. Pernah error login, lapor lgsg diganti baru.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-[#020205] border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Kata <span className="text-primary">Mereka</span></h2>
                    <p className="text-white/60 text-lg">Ribuan pelanggan sudah membuktikan kualitas kami.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl relative">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-white">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                                    <p className="text-white/40 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
