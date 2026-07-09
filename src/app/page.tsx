'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import AnimatedBackground from '../components/AnimatedBackground';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden font-sans transition-colors duration-300">
      {/* Dynamic Background Grid and Atmospheric Light Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft background dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900/30 via-slate-950 to-slate-950" />
        
        {/* Glowing visual light patterns */}
        <div className="absolute top-[-15%] left-[-15%] w-[45%] h-[45%] bg-teal-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-violet-600/5 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] bg-emerald-500/3 blur-[140px] rounded-full" />

        {/* Dynamic, interactive connection constellation particle network */}
        <AnimatedBackground />
      </div>

      {/* Main sticky navigation */}
      <Navbar />

      {/* Main landing Hero card with statistics */}
      <Hero />

      {/* About & Education Overview */}
      <section id="about" className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400 font-bold bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 shadow-sm">
            Professional Overview
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
            About Jaydeep Bodar
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-teal-400 to-violet-500 mx-auto mt-4.5 rounded-full" />
        </div>
        <About />
      </section>

      {/* Technical Arsenal filter panel */}
      <section id="skills" className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400 font-bold bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20 shadow-sm">
            Expertise Directory
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
            Technical Stack
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-emerald-400 mx-auto mt-4.5 rounded-full" />
        </div>
        <Skills />
      </section>

      {/* Projects Showcase section */}
      <section id="projects" className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
            Featured Projects
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4.5 rounded-full" />
        </div>
        <Projects />
      </section>

      {/* Timeline professional experience section */}
      <section id="experience" className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400 font-bold bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 shadow-sm">
            Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
            Professional Timeline
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-teal-400 to-violet-500 mx-auto mt-4.5 rounded-full" />
        </div>
        <Experience />
      </section>

      {/* Modern validation Contact form */}
      <section id="contact" className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400 font-bold bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20 shadow-sm">
            Inquiries Channel
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-emerald-400 mx-auto mt-4.5 rounded-full" />
        </div>
        <Contact />
      </section>

      {/* Global visual footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-black text-lg text-white tracking-tight">
              Jaydeep Bodar<span className="text-teal-400">.</span>
            </span>
            <span className="hidden sm:inline text-slate-700 font-mono text-xs">|</span>
            <span className="text-xs text-slate-500 font-mono tracking-wide uppercase">
              Full Stack Developer (MERN)
            </span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-sans text-center">
            &copy; {new Date().getFullYear()} Jaydeep Bodar. All rights reserved. Made with{' '}
            <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 fill-rose-500" /> in Surat, Gujarat.
          </p>
        </div>
      </footer>
    </div>
  );
}
