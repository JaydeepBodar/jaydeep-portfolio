import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Zap, Dumbbell, Bitcoin, Truck, TrendingUp, Bot, ShoppingBag, Terminal, CreditCard, Globe, Users } from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { theme } = useTheme();

  if (!project) return null;

  // Dynamically retrieve the corresponding Lucide icon
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'dumbbell': return <Dumbbell className="w-8 h-8 text-teal-500" />;
      case 'bitcoin': return <Bitcoin className="w-8 h-8 text-violet-500" />;
      case 'truck': return <Truck className="w-8 h-8 text-emerald-500" />;
      case 'trending-up': return <TrendingUp className="w-8 h-8 text-teal-500" />;
      case 'bot': return <Bot className="w-8 h-8 text-violet-500" />;
      case 'shopping-bag': return <ShoppingBag className="w-8 h-8 text-emerald-500" />;
      case 'credit-card': return <CreditCard className="w-8 h-8 text-emerald-500" />;
      case 'globe': return <Globe className="w-8 h-8 text-teal-500" />;
      case 'users': return <Users className="w-8 h-8 text-violet-500" />;
      default: return <Terminal className="w-8 h-8 text-teal-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Content Sheet */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`relative w-full max-w-2xl border rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-[#1a1d24] border-slate-700/80 shadow-black/60' 
                : 'bg-white border-slate-200 shadow-slate-300/40'
            }`}
          >
            {/* Top decorative gradient border */}
            <div className="h-1.5 bg-gradient-to-r from-teal-400 via-violet-500 to-emerald-500 shrink-0" />
            
            {/* Close button */}
            <button 
              onClick={onClose} 
              className={`absolute top-6 right-6 p-2 rounded-full transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/80'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200'
              }`}
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="p-8 overflow-y-auto">
              
              {/* Header Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center p-1 shrink-0 ${
                  theme === 'dark'
                    ? 'bg-[#0f1115] border-slate-800 shadow-md shadow-black/30'
                    : 'bg-slate-50 border-slate-100 shadow-sm shadow-slate-200'
                }`}>
                  {getProjectIcon(project.iconName)}
                </div>
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    theme === 'dark'
                      ? 'text-teal-400 bg-teal-500/10 border-teal-500/20'
                      : 'text-teal-600 bg-teal-50 border-teal-200'
                  }`}>
                    {project.company}
                  </span>
                  <h2 className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Technologies Capsules */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/5 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Body Modules */}
              <div className="space-y-6 text-left">
                
                {/* Project Impact */}
                <div className={`p-5 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-teal-500/5 border-teal-500/20'
                    : 'bg-teal-50/40 border-teal-200/50'
                }`}>
                  <h4 className={`flex items-center gap-2 font-bold text-sm mb-2.5 font-display ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    <Zap className="w-4 h-4 text-teal-500 shrink-0" /> Key Project Impact
                  </h4>
                  <p className={`text-sm leading-relaxed font-medium ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.impact}
                  </p>
                </div>

                {/* Key Features List */}
                <div>
                  <h4 className={`font-bold text-xs mb-3.5 font-display tracking-wide uppercase ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Key Features & Technical Execution
                  </h4>
                  <ul className="space-y-3.5">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer notes */}
                <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono ${
                  theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'
                }`}>
                  <span>Category: {project.category}</span>
                  <span>MERN Ecosystem Integration</span>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
