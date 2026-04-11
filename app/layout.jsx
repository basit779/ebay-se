import "@/styles/globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "eBay — Premium Commerce",
  description: "Premium e-commerce marketplace built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-night text-white antialiased">
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
