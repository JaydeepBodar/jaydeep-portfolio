import { Briefcase, Calendar, CheckSquare, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { experienceTimeline } from '../data';

export default function Experience() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal': return {
        border: 'border-teal-400',
        dot: 'bg-teal-400 shadow-teal-500/30',
        text: 'text-teal-400',
        bg: 'bg-teal-500/5'
      };
      case 'violet': return {
        border: 'border-violet-400',
        dot: 'bg-violet-400 shadow-violet-500/30',
        text: 'text-violet-400',
        bg: 'bg-violet-500/5'
      };
      case 'emerald': return {
        border: 'border-emerald-400',
        dot: 'bg-emerald-400 shadow-emerald-500/30',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/5'
      };
      default: return {
        border: 'border-slate-400',
        dot: 'bg-slate-400 shadow-slate-500/30',
        text: 'text-slate-400',
        bg: 'bg-slate-500/5'
      };
    }
  };

  return (
    <div className="w-full relative max-w-5xl mx-auto">
      {/* Decorative Blur Backing */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Track (Desktop) - centered vertical lane */}
      <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-slate-800/60 -translate-x-1/2 pointer-events-none z-0">
        {/* Animated glowing vertical overlay */}
        <div className="w-full h-1/2 bg-gradient-to-b from-teal-400 via-violet-500 to-transparent rounded-full shadow-[0_0_10px_rgba(20,184,166,0.2)]" />
      </div>

      {/* Main Track (Mobile) - left aligned vertical lane */}
      <div className="block md:hidden absolute left-4.5 top-4 bottom-4 w-[2px] bg-slate-800/60 pointer-events-none z-0" />

      {/* Timeline items list */}
      <div className="space-y-12 relative z-10">
        {experienceTimeline.map((exp, idx) => {
          const colors = getColorClasses(exp.color);
          const isLeft = idx % 2 === 0;

          return (
            <div 
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-stretch ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              
              {/* Timeline dot / Node (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-9 h-9 rounded-full bg-slate-950 border-2 border-slate-800 items-center justify-center shadow-lg shadow-slate-950/50 z-20">
                <div className={`w-3.5 h-3.5 rounded-full ${colors.dot} shadow-[0_0_12px]`} />
              </div>

              {/* Timeline dot / Node (Mobile) */}
              <div className="flex md:hidden absolute left-2 top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-slate-800 items-center justify-center z-20">
                <div className={`w-2 h-2 rounded-full ${colors.dot} shadow-[0_0_8px]`} />
              </div>

              {/* Side Card Space wrapper */}
              <div className={`w-full md:w-1/2 ${
                isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
              } pl-10 md:pl-0`}>
                
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden"
                >
                  {/* Decorative glowing gradient inside card */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${exp.color === 'teal' ? 'from-teal-500/5' : exp.color === 'violet' ? 'from-violet-500/5' : 'from-emerald-500/5'} to-transparent rounded-bl-full`} />

                  {/* Period badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${colors.bg} ${colors.text} border border-teal-500/10 mb-4`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  {/* Role and Company */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                    {exp.company}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300 mt-1 font-mono">
                    {exp.role}
                  </p>

                  {/* Core description text */}
                  <p className="text-slate-400 text-sm mt-4 leading-relaxed font-sans">
                    {exp.desc}
                  </p>

                  {/* Bullet accomplishments section */}
                  <div className="mt-5 pt-5 border-t border-white/5">
                    <h4 className="text-xs font-mono tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-1.5 justify-start md:justify-start">
                      <Award className={`w-3.5 h-3.5 ${colors.text}`} />
                      <span>Key Achievements</span>
                    </h4>
                    
                    <ul className={`space-y-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed text-left`}>
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex gap-2.5 items-start">
                          <CheckSquare className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Used Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5 justify-start">
                    {exp.skillsUsed.map((sk) => (
                      <span 
                        key={sk} 
                        className="px-2 py-0.5 rounded bg-slate-900/60 border border-white/5 text-[10px] font-mono text-slate-400"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </div>

              {/* Empty placeholder spacer side (Desktop) */}
              <div className="hidden md:block w-1/2" />

            </div>
          );
        })}
      </div>
    </div>
  );
}
