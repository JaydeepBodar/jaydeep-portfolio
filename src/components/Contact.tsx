import { useState, FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copiedText, setCopiedText] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error'; link?: string }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error', link?: string) => {
    setToast({ show: true, message, type, link });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 8000);
  };

  // Field validation logic
  const getErrors = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) {
      errors.name = 'Please provide your full name';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!emailRegex.test(form.email.trim())) {
      errors.email = 'Please provide a valid email structure (e.g. name@domain.com)';
    }

    if (!form.message.trim()) {
      errors.message = 'Please provide a project description or message';
    } else if (form.message.trim().length < 15) {
      errors.message = 'Your message should be at least 15 characters long';
    }
    return errors;
  };

  const errors = getErrors();

  const handleInputChange = (field: 'name' | 'email' | 'message', value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to trigger any validation displays
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) {
      setStatus('error');
      showToast('Please correct the validation errors in the form first.', 'error');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        showToast(
          data.message, 
          'success', 
          data.previewUrl || undefined
        );
      } else {
        setStatus('error');
        showToast(data.error || 'Failed to send message. Please check server configuration.', 'error');
      }
    } catch (err: any) {
      setStatus('error');
      showToast('A network error occurred. Please verify your connection and try again.', 'error');
    }
  };

  return (
    <div className="w-full relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
        
        {/* Left column: Quick contact hooks */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-4">
              Let's create something <span className="text-gradient">spectacular</span>
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Whether you are looking to build a high-performance MERN platform, integrate interactive charts, configure Stripe payment webhooks, or optimize MongoDB lookup speeds, let's talk!
            </p>

            <div className="space-y-4">
              {/* Email Copier block */}
              <div 
                onClick={handleCopyEmail}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-teal-500/20 transition-all cursor-pointer group"
                title="Click to copy email address"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center p-1 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
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
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/30 border border-white/5 text-xs text-slate-500 font-mono leading-relaxed mt-4">
            <span className="text-teal-400 font-semibold block mb-1">Available Immediately</span>
            Open to full-time roles, strategic contractor partnerships, and relocations. Fully equipped for remote collaboration.
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Success Prompt state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center justify-center h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-extrabold text-white mb-3">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed font-sans mb-8">
                    Thank you for reaching out! Your message was transmitted. Jaydeep Bodar will review it and reply back to you at your email address shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white transition-all text-xs font-mono border border-white/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* Form Display State */
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5 text-left h-full flex flex-col justify-between"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-5">
                    {/* Full Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={`w-full bg-slate-950/60 border ${
                          touched.name && errors.name 
                            ? 'border-rose-500/60 focus:border-rose-500' 
                            : 'border-white/10 focus:border-teal-500'
                        } rounded-xl px-4 py-3.5 focus:outline-none transition-all text-slate-100 text-sm`}
                        placeholder="John Doe"
                      />
                      {touched.name && errors.name && (
                        <p className="text-rose-500 text-xs flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full bg-slate-950/60 border ${
                          touched.email && errors.email 
                            ? 'border-rose-500/60 focus:border-rose-500' 
                            : 'border-white/10 focus:border-teal-500'
                        } rounded-xl px-4 py-3.5 focus:outline-none transition-all text-slate-100 text-sm`}
                        placeholder="john@example.com"
                      />
                      {touched.email && errors.email && (
                        <p className="text-rose-500 text-xs flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        className={`w-full bg-slate-950/60 border ${
                          touched.message && errors.message 
                            ? 'border-rose-500/60 focus:border-rose-500' 
                            : 'border-white/10 focus:border-teal-500'
                        } rounded-xl px-4 py-3.5 focus:outline-none transition-all text-slate-100 text-sm leading-relaxed`}
                        placeholder="Hello Jaydeep, I'd love to chat about a new full-stack platform..."
                      />
                      {touched.message && errors.message && (
                        <p className="text-rose-500 text-xs flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submission Alert */}
                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 flex items-center gap-2 text-rose-400 text-xs font-mono mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please check and correct the highlighted fields first.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full mt-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg min-h-[52px] text-sm uppercase tracking-wider cursor-pointer ${
                      status === 'loading'
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                        : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-teal-500/10'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl shadow-xl backdrop-blur-xl border flex gap-3.5 items-start"
            style={{
              backgroundColor: toast.type === 'success' ? 'rgba(9, 13, 22, 0.95)' : 'rgba(28, 10, 10, 0.95)',
              borderColor: toast.type === 'success' ? 'rgba(20, 184, 166, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              boxShadow: toast.type === 'success' 
                ? '0 10px 30px -10px rgba(20, 184, 166, 0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)' 
                : '0 10px 30px -10px rgba(239, 68, 68, 0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)'
            }}
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              toast.type === 'success' ? 'bg-teal-500/10 text-teal-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            
            <div className="flex-1 text-left">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                {toast.type === 'success' ? 'Notification' : 'System Error'}
              </h5>
              <p className="text-sm font-sans text-slate-100 font-medium leading-relaxed">
                {toast.message}
              </p>
              
              {toast.link && (
                <div className="mt-3">
                  <a
                    href={toast.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-mono font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Open Test Inbox</span>
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="text-slate-500 hover:text-slate-300 text-xs font-mono p-1 self-start transition-colors cursor-pointer hover:bg-white/5 rounded"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
