import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jaydeep Bodar | Full Stack Developer Portfolio',
  description: 'Portfolio of Jaydeep Bodar - Full Stack MERN Developer with 3+ years of experience in building high-performance web applications.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} bg-[#030712] text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-200`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
