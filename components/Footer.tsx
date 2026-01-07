import Link from "next/link";
import { Zap, Instagram, Send } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-[#020205] pt-16 pb-8">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                MAP Store
                            </span>
                        </Link>
                        <p className="text-white/50 mb-6 max-w-sm">
                            Platform top up akun premium terpercaya. Nikmati hiburan tanpa batas dengan harga mahasiswa, kualitas sultan.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                                <Send className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Menu Cepat</h4>
                        <ul className="space-y-3">
                            {["Home", "Katalog", "Cara Order", "FAQ", "Garansi"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/50 hover:text-primary transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Hubungi Kami</h4>
                        <ul className="space-y-3">
                            <li className="text-white/50 text-sm">
                                WhatsApp: <span className="text-white">+62 812-3456-7890</span>
                            </li>
                            <li className="text-white/50 text-sm">
                                Email: support@mapstore.id
                            </li>
                            <li className="text-white/50 text-sm">
                                Jam Kerja: 09:00 - 22:00 WIB
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-white/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© 2026 MAP Store. All rights reserved.</p>
                    <p>Made with ❤️ by Vibe Coding</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
