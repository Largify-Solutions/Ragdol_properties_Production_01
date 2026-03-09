import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'

import I18nProvider from '@/components/shared/I18nProvider'
import DynamicHtml from '@/components/layouts/DynamicHtml'
import ConditionalLayout from '@/components/layouts/ConditionalLayout'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ragdoll Properties - Premium Real Estate in Dubai",
  description: "Find your dream property in Dubai. Browse apartments, villas, townhouses, and commercial properties with Ragdoll Properties.",
  keywords: "real estate dubai, property for sale dubai, buy house dubai, apartments dubai, villas dubai, ragdoll properties",
};

function RootContent({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <I18nProvider>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </I18nProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DynamicHtml>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} ${cairo.variable} ${amiri.variable} antialiased min-h-screen flex flex-col`}
      >
        <RootContent>{children}</RootContent>
      </body>
    </DynamicHtml>
  )
}
