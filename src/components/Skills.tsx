import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Server, Monitor, Database, ShieldCheck, BarChart3, CloudLightning, BadgeCheck } from 'lucide-react';
import { skills, skillCategories } from '../data';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [searchQuery, setSearchQuery] = useState('');

  // Get a matching Lucide icon for each category tab
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Monitor className="w-4 h-4" />;
      case 'Backend': return <Server className="w-4 h-4" />;
      case 'Databases': return <Database className="w-4 h-4" />;
      case 'Auth & Payments': return <ShieldCheck className="w-4 h-4" />;
      case 'Real-Time & Charts': return <BarChart3 className="w-4 h-4" />;
      default: return <BadgeCheck className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'text-teal-400 border-teal-500/30 bg-teal-500/5';
      case 'Backend': return 'text-violet-400 border-violet-500/30 bg-violet-500/5';
      case 'Databases': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case 'Auth & Payments': return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
      case 'Real-Time & Charts': return 'text-rose-400 border-rose-500/30 bg-rose-500/5';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
    }
  };

  // Filter skills based on Category AND Search Query
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full relative">
      {/* Decorative blurred backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid search and filters bar */}
      <div className="flex flex-col gap-6 mb-12">
        {/* Search Bar */}
        <div className="max-w-md w-full mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-500/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-slate-900/40 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-teal-500/50 transition-all">
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors shrink-0 mr-3" />
            <input 
              type="text" 
              placeholder="Search tech stack, e.g., TypeScript, Node..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-200 text-sm placeholder:text-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {skillCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer ${
                  isActive 
                    ? 'bg-teal-500/15 border-teal-400 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)]' 
                    : 'bg-slate-900/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid display with AnimatePresence */}
      <motion.div 
        layout 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="glass-card p-5 rounded-2xl border border-white/5 hover:border-teal-500/30 hover:shadow-lg flex flex-col justify-between group relative overflow-hidden h-32"
            >
              {/* Corner accent light */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-teal-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col gap-1.5 items-start">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-medium ${getCategoryColor(skill.category)}`}>
                  {skill.category}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-slate-200 mt-2 font-display group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
              </div>

              <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono mt-auto pt-2 border-t border-white/5">
                <span>Skill Level</span>
                <span className="text-teal-400 font-medium">{skill.level || 'Advanced'}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-slate-900/10 rounded-2xl border border-dashed border-white/5 max-w-md mx-auto"
        >
          <p className="text-slate-500 text-sm mb-2 font-mono">No matching skills found</p>
          <p className="text-xs text-slate-600">Try searching a different keyword or select another category.</p>
          <button 
            onClick={() => { setActiveCategory('Frontend'); setSearchQuery(''); }}
            className="mt-4 text-xs text-teal-400 hover:underline font-mono"
          >
            Reset filter parameters
          </button>
        </motion.div>
      )}
    </div>
  );
}
