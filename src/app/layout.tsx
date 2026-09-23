import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { personalInfo, siteUrl } from '../data';
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

const title = 'Jaydeep Bodar | Full Stack Developer (MERN)';
const description =
  'Jaydeep Bodar is a Full Stack MERN Developer based in Surat, Gujarat with 3+ years of experience building scalable SaaS platforms, AI-powered dashboards, and real-time applications using React, Node.js, Next.js, and TypeScript.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Jaydeep Bodar',
  },
  description,
  keywords: [
    'Jaydeep Bodar',
    'Jaydeep Bodar portfolio',
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Web Developer Surat',
    'Web Developer Gujarat',
  ],
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: `${personalInfo.name} | Portfolio`,
    title,
    description,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Full Stack Developer (MERN)`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: personalInfo.title,
  description: personalInfo.summary,
  email: `mailto:${personalInfo.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: personalInfo.location,
    addressCountry: 'IN',
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  knowsAbout: [
    'React.js',
    'Next.js',
    'Node.js',
    'TypeScript',
    'MongoDB',
    'Express.js',
    'Full Stack Development',
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} bg-[#030712] text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-200`}>
        {children}
      </body>
    </html>
  );
}
