import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Copy, ExternalLink, 
  Linkedin, Github, Palette, Check
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Let's Build Something <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Extraordinary</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Have an engineering role, high-impact project, or looking to collaborate in Generative AI and full-stack development? Reach out directly.
          </p>
        </div>

        {/* Clean Centered Contact Cards */}
        <div className="max-w-3xl mx-auto space-y-5">
          
          {/* Email Card */}
          <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-sm group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Direct Email Address
                </span>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-all text-xs font-mono font-medium shadow-xs"
                title="Copy email to clipboard"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm shadow-blue-500/30"
              >
                <span>Compose</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-sm group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Phone & WhatsApp
                </span>
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-all text-xs font-mono font-medium shadow-xs"
                title="Copy phone to clipboard"
              >
                {copiedType === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${personalInfo.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm shadow-blue-500/30"
              >
                <span>Call Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl flex items-center gap-4 group hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Location & Availability
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {personalInfo.location} <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 ml-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">Open to Relocation & Remote</span>
              </span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-sm text-xs font-mono font-bold"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-sm text-xs font-mono font-bold"
            >
              <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              <span>GitHub</span>
            </a>

            <a
              href={personalInfo.socials.artGallery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-500 hover:border-purple-500/50 transition-all shadow-sm text-xs font-mono font-bold"
            >
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Fine Art Gallery</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
