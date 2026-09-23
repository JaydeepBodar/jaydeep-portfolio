import { useState } from 'react';
import { Mail, Phone, MapPin, ClipboardCheck } from 'lucide-react';
import { personalInfo } from '../data';

export default function Contact() {
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="w-full relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full text-center max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-4">
          Let's create something <span className="text-gradient">spectacular</span>
        </h3>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 font-sans">
          Whether you are looking to build a high-performance MERN platform, integrate interactive charts, configure Stripe payment webhooks, or optimize MongoDB lookup speeds, let's talk!
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-left max-w-5xl mx-auto">
        {/* Email Copier block */}
        <div
          onClick={handleCopyEmail}
          className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-teal-500/20 transition-all cursor-pointer group"
          title="Click to copy email address"
        >
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center p-1 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="overflow-hidden flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Email Address</span>
            <span className="text-sm font-semibold text-slate-200 truncate block group-hover:text-teal-400 transition-colors">
              {personalInfo.email}
            </span>
          </div>
          <div className="ml-auto text-slate-500 text-xs font-mono shrink-0 pr-1 group-hover:text-slate-300">
            {copiedText ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <ClipboardCheck className="w-3.5 h-3.5" /> Copied!
              </span>
            ) : 'Copy'}
          </div>
        </div>

        {/* Phone item */}
        <a
          href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
          className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-teal-500/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center p-1 text-violet-400 group-hover:bg-violet-500 group-hover:text-slate-950 transition-all shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Direct Contact</span>
            <span className="text-sm font-semibold text-slate-200 block group-hover:text-violet-400 transition-colors">
              {personalInfo.phone}
            </span>
          </div>
        </a>

        {/* Location item */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center p-1 text-emerald-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Location</span>
            <span className="text-sm font-semibold text-slate-200 block">
              {personalInfo.location}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 p-5 rounded-2xl bg-slate-900/30 border border-white/5 text-xs text-slate-500 font-mono leading-relaxed text-center">
        <span className="text-teal-400 font-semibold block mb-1">Available Immediately</span>
        Open to full-time roles, strategic contractor partnerships, and relocations. Fully equipped for remote collaboration.
      </div>
    </div>
  );
}
