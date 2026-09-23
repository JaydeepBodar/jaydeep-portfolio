import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Zap, Dumbbell, Bitcoin, Truck, TrendingUp, Bot, ShoppingBag, Terminal, CreditCard, Globe, Users } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Lock background scroll while the modal is open, so page content behind
  // the overlay can't scroll and bleed through the backdrop.
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">

          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Modal Content Sheet */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="relative w-full max-w-2xl bg-[#1a1d24] border border-slate-700/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/60 z-10 max-h-[85vh] sm:max-h-[90vh] flex flex-col"
          >
            {/* Top decorative gradient border */}
            <div className="h-1.5 bg-gradient-to-r from-teal-400 via-violet-500 to-emerald-500 shrink-0" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full transition-all cursor-pointer z-20 bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/80"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="p-5 sm:p-8 pr-12 sm:pr-8 overflow-y-auto overscroll-contain">

              {/* Header Info */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border bg-[#0f1115] border-slate-800 shadow-md shadow-black/30 flex items-center justify-center p-1 shrink-0">
                  {getProjectIcon(project.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border text-teal-400 bg-teal-500/10 border-teal-500/20">
                    {project.company}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-display font-extrabold tracking-tight mt-1 text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Technologies Capsules */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium border bg-white/5 border-white/5 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Body Modules */}
              <div className="space-y-6 text-left">

                {/* Project Impact */}
                <div className="p-5 rounded-2xl border bg-teal-500/5 border-teal-500/20">
                  <h4 className="flex items-center gap-2 font-bold text-sm mb-2.5 font-display text-white">
                    <Zap className="w-4 h-4 text-teal-500 shrink-0" /> Key Project Impact
                  </h4>
                  <p className="text-sm leading-relaxed font-medium text-slate-300">
                    {project.impact}
                  </p>
                </div>

                {/* Key Features List */}
                <div>
                  <h4 className="font-bold text-xs mb-3.5 font-display tracking-wide uppercase text-slate-400">
                    Key Features & Technical Execution
                  </h4>
                  <ul className="space-y-3.5">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer notes */}
                <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-slate-800 text-slate-500">
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
