import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  // Track scroll position for header glassmorphism and active section link spy
  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section spy
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold to match typical navigation scroll points
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 glass border-b border-white/5 shadow-lg shadow-slate-950/20' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
            className="flex items-center gap-2 group font-display font-extrabold text-2xl text-white tracking-tight"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 flex items-center justify-center p-0.5 shadow-md shadow-teal-500/10 group-hover:shadow-teal-500/25 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
              </div>
            </div>
            <span>JB<span className="text-teal-400 group-hover:text-violet-400 transition-colors">.</span></span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`relative py-2 text-sm font-medium transition-colors hover:text-white ${
                        isActive ? 'text-teal-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-800/60 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
            </button>

            {/* CTA button */}
            <button
              onClick={() => handleLinkClick('#contact')}
              className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all duration-300 group shadow-md shadow-teal-500/20 hover:scale-105 cursor-pointer"
            >
              Contact Me
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
            </button>

            <button
              onClick={() => handleLinkClick('#contact')}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 cursor-pointer"
            >
              Contact
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 w-full z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 py-8 px-6 md:hidden flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`block py-2 text-base font-medium transition-colors ${
                        isActive ? 'text-teal-400 font-bold border-l-2 border-teal-400 pl-3' : 'text-slate-400 pl-3 border-l-2 border-transparent hover:text-slate-200'
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <div className="h-[1px] bg-white/5 w-full my-1" />

            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-500 font-mono text-center">
                Available Immediately: {personalInfo.phone}
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('#contact');
                }}
                className="w-full text-center py-3 rounded-xl bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10 cursor-pointer"
              >
                Get In Touch
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
