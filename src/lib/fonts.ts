import { Geist, Geist_Mono, Inter } from "next/font/google";

const geistSans = Geist({
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"],
});

export { geistSans, geistMono, inter };
