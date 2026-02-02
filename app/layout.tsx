import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { Providers } from "./components/Providers";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import GlobalMenu from "./components/GlobalMenu";
import GlobalBackground from "./components/GlobalBackground";
import { Analytics } from "@vercel/analytics/next";
import ContactModalWrapper from "./components/ContactModalWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Naveen's data portfolio",
  description: "A high-end scrollytelling personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Providers>
          <SmoothScroll>
            <GlobalBackground />
            {children}
            <Footer />
            <ContactModalWrapper />
            <Logo />
            <GlobalMenu />
          </SmoothScroll>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

