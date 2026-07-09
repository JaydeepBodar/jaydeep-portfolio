import { GraduationCap, Award, CheckCircle2, MapPin, BadgeCheck, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { education, personalInfo } from '../data';

export default function About() {
  const achievementsList = [
    "Shipped 5+ robust production applications across fintech, logistics, AI, and e-Commerce domains.",
    "Achieved sub-second price feed synchronization using authoritative Socket.IO channels.",
    "Engineered robust, reusable UI component libraries adopted across multi-functional development teams."
  ];

  return (
    <div className="w-full relative">
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
        
        {/* Left Column: Personalized Profile Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col justify-between text-left"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-6">
              Full Stack Engineer dedicated to <span className="text-gradient">performance</span> and <span className="text-gradient">clean design</span>
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 font-sans">
              I am a results-driven Full Stack MERN Developer based in Surat, Gujarat. With more than 3 years of experience, my engineering focus centers on writing clean, reusable TypeScript code and optimizing backend database pipelines.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              I thrive on bridging the gap between visually compelling frontend architectures and highly structured databases. My experience with frameworks like Next.js, Remix, and tools like Prisma ORM allows me to ship reliable products from concept to deployment.
            </p>
          </div>

          {/* Core Key Achievements Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 mb-4.5 flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Core Achievements</span>
            </h4>
            <ul className="space-y-3">
              {achievementsList.map((ach, idx) => (
                <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed items-start">
                  <CheckCircle2 className="w-4.5 h-4.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Education timeline card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between h-full text-left relative overflow-hidden">
            
            {/* Top right corner decorative cap icon */}
            <div className="absolute top-0 right-0 p-8 opacity-5 text-teal-400 pointer-events-none">
              <GraduationCap className="w-32 h-32" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full mb-6 inline-block">
                Academic Background
              </span>
              
              <h4 className="text-2xl font-display font-extrabold text-white tracking-tight mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-violet-400 shrink-0" />
                <span>{education.degree}</span>
              </h4>
              <p className="text-sm font-semibold text-teal-400 font-mono mb-4">
                {education.major}
              </p>

              <div className="space-y-4 text-sm text-slate-400 border-l border-white/10 pl-4 mt-6">
                <div>
                  <span className="text-xs text-slate-500 block font-mono">Institution</span>
                  <span className="text-slate-200 font-medium">{education.institution}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-mono">Academic Achievement</span>
                  <span className="text-emerald-400 font-bold">{education.gpa}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-mono">Duration</span>
                  <span>{education.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{education.location}</span>
                </div>
              </div>
            </div>

            {/* Quick credentials claim */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center p-1 text-teal-400 shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Credentials and official CGPA sheets verified and available upon request.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
