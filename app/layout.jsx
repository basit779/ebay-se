import "@/styles/globals.css";
import { Inter, Playfair_Display, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import Providers from "@/components/Providers";

// Trimmed weights to only what's actually used. Each weight+style pair
// is a separate font file over the wire.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  preload: true
});

// Bodoni Moda — high-contrast editorial serif for the hero headline.
// Display-only, used on a single h1, so lean weights + preload so it
// lands before the hero enters.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: false
});

export const metadata = {
  title: "FluxBid — Where Everything Flows",
  description: "Premium auction marketplace with cinematic UI — buy, sell, bid.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${bodoni.variable} ${jetbrains.variable}`}
    >
      <body className="bg-night font-sans text-white antialiased" suppressHydrationWarning>
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
