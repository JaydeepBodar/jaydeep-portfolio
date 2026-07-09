# Next.js App Router Migration Guide

This guide provides the complete, production-ready structure and copy-paste files to run this Full Stack Portfolio on **Next.js 14+ (App Router)**.

Our Vite + Express backend mimics Next.js's client-server architecture. When you export or download this project, you can migrate it to Next.js in minutes using the files below.

---

## 1. Directory Structure
Create a standard Next.js project and set up the directory as follows:

```text
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts & metadata
│   │   ├── page.tsx           # Home entry page
│   │   ├── globals.css        # Global Tailwind CSS
│   │   └── api/
│   │       └── send-email/
│   │           └── route.ts   # Contact message API endpoint (Nodemailer)
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   └── AnimatedBackground.tsx
│   ├── utils/
│   │   └── pdfGenerator.ts    # PDF CV generator
│   └── data.ts                # Portfolio data source
├── public/                    # Any logos, avatars, and assets
├── package.json
└── tailwind.config.js
```

---

## 2. Next.js Dependencies
Install these packages in your new Next.js project:
```bash
npm install jspdf nodemailer motion lucide-react dotenv
npm install -D @types/nodemailer
```

---

## 3. The API Endpoint (`/src/app/api/send-email/route.ts`)
This API route implements the server-side email dispatching logic exactly like our custom Express server.

```typescript
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    let transporter;
    let isTestAccount = false;
    let previewUrl = '';

    // Check if custom SMTP env variables exist
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create a test account on the fly with Ethereal Email (Development fallback)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      isTestAccount = true;
    }

    // Compose the email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'jaydeepbodar732@gmail.com', // Recipient is Jaydeep Bodar
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
          <h2 style="color: #0d9488; margin-top: 0; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">New Contact Message</h2>
          <p style="margin: 16px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 16px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-weight: bold; margin-bottom: 8px;">Message Content:</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #94a3b8; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
    }

    return NextResponse.json({
      success: true,
      message: isTestAccount 
        ? 'Email sent successfully via test SMTP mail client!' 
        : 'Email sent successfully to Jaydeep!',
      isTestAccount,
      previewUrl,
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An error occurred while sending the email.' },
      { status: 500 }
    );
  }
}
```

---

## 4. Root Page Component (`/src/app/page.tsx`)
In Next.js, add `'use client'` to interactive pages or keep them as modular client sub-components:

```typescript
'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Decorative gradient radial orbs */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-15%] w-[45%] h-[45%] bg-teal-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-violet-600/5 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] bg-emerald-500/3 blur-[140px] rounded-full" />

        {/* Constellation Particle Network */}
        <AnimatedBackground />
      </div>

      {/* Main Page Layout Container */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
```

---

## 5. Root Layout (`/src/app/layout.tsx`)
Configure your Google Fonts, titles, and SEO metadata natively in Next.js:

```typescript
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Jaydeep Bodar | Full Stack Developer Portfolio',
  description: 'Premium Full Stack Developer portfolio of Jaydeep Bodar with interactive project showcase and custom PDF Resume generator.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-slate-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## 6. CSS Integration (`/src/app/globals.css`)
Inside your `globals.css`, paste your existing Tailwind imports and theme extensions:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-display), sans-serif;
  --font-mono: "Fira Code", monospace;

  --color-slate-950: #020617;
  --color-slate-900: #0f172a;
  --color-slate-800: #1e293b;
  --color-slate-700: #334155;
  --color-teal-400: #2dd4bf;
  --color-teal-500: #14b8a6;
  --color-violet-400: #a78bfa;
  --color-violet-500: #8b5cf6;
  --color-emerald-400: #34d399;
  --color-emerald-500: #10b981;
}
```

Now you have a fully-compatible Next.js project layout with a contact dispatch API and PDF builder!
