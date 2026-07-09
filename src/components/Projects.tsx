import { useState } from 'react';
import { Dumbbell, Bitcoin, Truck, TrendingUp, Bot, ShoppingBag, Terminal, Eye, ExternalLink, CreditCard, Globe, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpandTags = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Map icon names to Lucide react components
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'dumbbell': return <Dumbbell className="w-10 h-10 text-teal-400" />;
      case 'bitcoin': return <Bitcoin className="w-10 h-10 text-violet-400" />;
      case 'truck': return <Truck className="w-10 h-10 text-emerald-400" />;
      case 'trending-up': return <TrendingUp className="w-10 h-10 text-teal-400" />;
      case 'bot': return <Bot className="w-10 h-10 text-violet-400" />;
      case 'shopping-bag': return <ShoppingBag className="w-10 h-10 text-emerald-400" />;
      case 'credit-card': return <CreditCard className="w-10 h-10 text-emerald-400" />;
      case 'globe': return <Globe className="w-10 h-10 text-teal-400" />;
      case 'users': return <Users className="w-10 h-10 text-violet-400" />;
      default: return <Terminal className="w-10 h-10 text-teal-400" />;
    }
  };

  const getGradientByIcon = (iconName: string) => {
    switch (iconName) {
      case 'dumbbell': return 'from-teal-500/10 to-transparent';
      case 'bitcoin': return 'from-violet-500/10 to-transparent';
      case 'truck': return 'from-emerald-500/10 to-transparent';
      case 'trending-up': return 'from-teal-500/10 to-transparent';
      case 'bot': return 'from-violet-500/10 to-transparent';
      case 'shopping-bag': return 'from-emerald-500/10 to-transparent';
      case 'credit-card': return 'from-emerald-500/10 to-transparent';
      case 'globe': return 'from-teal-500/10 to-transparent';
      case 'users': return 'from-violet-500/10 to-transparent';
      default: return 'from-slate-500/10 to-transparent';
    }
  };

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="w-full relative">
      {/* Decorative Blur Background element */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-teal-500/30 transition-all duration-300 shadow-xl shadow-slate-950/20"
          >
            {/* Visual Thumbnail Area */}
            <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${getGradientByIcon(project.iconName)} border-b border-white/5 flex items-center justify-center p-6 shrink-0`}>
              
              {/* Overlay grid mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-15" />
              
              {/* Dynamic Icon */}
              <div className="relative p-5 rounded-2xl bg-slate-950/80 border border-white/10 shadow-lg shadow-slate-950/50 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                {getProjectIcon(project.iconName)}
              </div>

              {/* Hover overlay with detail CTA button */}
              <div className="absolute inset-0 bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 items-center justify-center">
                <button
                  onClick={() => handleOpenDetails(project)}
                  className="px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  View Project Details
                </button>
              </div>

              {/* Company Corner Tag */}
              <span className="absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-slate-950/80 rounded-full border border-white/10 text-slate-400">
                {project.company}
              </span>
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-grow text-left">
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Summary Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                {project.impact}
              </p>

              {/* Tags Area */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono font-medium text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <button
                    onClick={() => handleOpenDetails(project)}
                    className="px-2.5 py-1 bg-teal-500/10 border border-teal-500/20 text-[10px] font-mono font-bold text-teal-400 rounded cursor-pointer hover:bg-teal-500/20 active:scale-95 transition-all"
                    title="View all skills and project features"
                  >
                    +{project.tags.length - 4} more
                  </button>
                )}
              </div>

              {/* Action Trigger Row */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs mt-auto">
                <button
                  onClick={() => handleOpenDetails(project)}
                  className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
                >
                  Explore Features & Impact →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal render channel */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={handleCloseDetails} 
      />
    </div>
  );
}
