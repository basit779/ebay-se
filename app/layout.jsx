import "@/styles/globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "FluxBid — Where Everything Flows",
  description: "Premium auction marketplace with cinematic UI — buy, sell, bid."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-night text-white antialiased" suppressHydrationWarning>
        <div className="noise-overlay" />
        <SmoothScroll />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
