import { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, ArrowRight, FileText, Phone, Sparkles, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo, statistics } from '../data';
import { generateResumePDF } from '../utils/pdfGenerator';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack Developer (MERN)",
    "MERN Stack Specialist",
    "React & Node.js Architect",
    "TypeScript Solutions Engineer"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    
    if (!isDeleting && displayText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 90);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownloadResume = () => {
    generateResumePDF();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.offsetTop - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none -z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* Floating Animated Ambient Particles */}
      <motion.div 
        className="absolute top-1/4 right-1/3 w-3 h-3 bg-teal-400 rounded-full blur-[1px] opacity-40 pointer-events-none"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-10 w-4 h-4 bg-violet-400 rounded-full blur-[1px] opacity-30 pointer-events-none hidden md:block"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-emerald-400 rounded-full blur-[1px] opacity-50 pointer-events-none"
        animate={{ y: [0, -10, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Intro and Copy */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(20,184,166,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {personalInfo.availability}
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Hi, I'm <span className="text-gradient font-black">{personalInfo.name}</span>
          </motion.h1>

          {/* Typewriter Role with Proper Blinking Cursor */}
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-slate-300 mb-6 flex items-center min-h-[40px]"
          >
            <Sparkles className="w-5 h-5 text-violet-400 shrink-0 mr-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-violet-400 font-extrabold">
              {displayText}
            </span>
            <span className="inline-block w-1 h-[1.1em] bg-teal-400 ml-1.5 align-middle blink-cursor" />
          </motion.h2>

          {/* Summary / Sub-caption */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans"
          >
            {personalInfo.summary}
          </motion.p>

          {/* Core Info Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-400 mb-10 border-b border-white/5 pb-8 w-full max-w-xl"
          >
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>{personalInfo.location}</span>
            </div>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-2 hover:text-teal-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-400" />
              <span>{personalInfo.email}</span>
            </a>
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors">
              <Phone className="w-4 h-4 text-teal-400" />
              <span>{personalInfo.phone}</span>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center"
          >
            <button
              onClick={handleDownloadResume}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 border-0 hover:scale-[1.02] duration-200 group"
              title="Download professional PDF resume"
            >
              <Download className="w-5 h-5 text-slate-950 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-850 text-teal-400 hover:text-teal-300 font-extrabold rounded-xl border-2 border-teal-500/30 hover:border-teal-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-teal-500/5 duration-200 hover:scale-[1.02] group"
            >
              Contact Me
              <Mail className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-xl border border-white/5 hover:border-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer duration-200"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-5 mt-10 text-slate-500"
          >
            <span className="text-xs font-mono tracking-widest uppercase text-slate-600">Connect:</span>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 hover:text-teal-400 border border-white/5 hover:border-teal-500/20 transition-all shadow-md"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 hover:text-teal-400 border border-white/5 hover:border-teal-500/20 transition-all shadow-md"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Key Stats bento showcase */}
        <motion.div 
          className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Subtle back decorative frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-teal-500/5 rounded-3xl -z-10 blur-xl pointer-events-none" />

          {statistics.map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/5 hover:border-teal-500/30 transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div>
                <span className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white block mb-2 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-slate-200 block mb-1">
                  {stat.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}

          {/* Quick Info card span-2 */}
          <motion.div
            className="col-span-2 glass-card p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            whileHover={{ y: -3 }}
          >
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Technical Focus</h4>
              <p className="text-sm font-bold text-slate-200">MongoDB | Express | React | Node | Next.js | TS</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-medium shrink-0">
              MERN Stack specialist
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
