import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevShelf - Showcase Your GitHub Projects",
  description: "A beautiful, interactive project showcase platform for GitHub repositories with gamification and AI-powered explanations.",
  keywords: ["GitHub", "portfolio", "showcase", "projects", "developer", "repositories"],
  authors: [{ name: "DevShelf Team" }],
  openGraph: {
    title: "DevShelf - Showcase Your GitHub Projects",
    description: "A beautiful, interactive project showcase platform for GitHub repositories",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-dark-primary text-gray-900 dark:text-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
