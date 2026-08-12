import React from 'react';
import brainLogoImg from '../assets/images/brain_logo_1786505359720.jpg';
import { Sparkles, Brain } from 'lucide-react';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center relative z-10 pt-2">
      {/* Top Colorful Brain Logo Container */}
      <div className="relative mb-4 group cursor-pointer">
        {/* Ambient Glow Aura */}
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-blue-500 via-amber-500 to-emerald-500 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-700 animate-pulse"></div>
        
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-br from-red-500 via-blue-500 via-amber-400 to-emerald-400 shadow-2xl relative z-10 brain-glow overflow-hidden">
          <div className="w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center overflow-hidden border border-white/20">
            <img 
              src={brainLogoImg} 
              alt="Cérebro Mosaico AI Studio MentorIA" 
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback icon if image fails to load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* SVG Fallback if image fails */}
            <Brain className="w-20 h-20 text-blue-400 hidden group-has-[img[style*='display: none']]:block animate-pulse" />
          </div>
        </div>

        {/* AI Badge Pill */}
        <div className="absolute -bottom-1 -right-1 z-20 bg-slate-900/90 border border-emerald-500/50 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 shadow-lg flex items-center gap-1 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>IA Specialist</span>
        </div>
      </div>

      {/* Brand Typography matching logo exact colors */}
      <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-black tracking-tight mb-1 drop-shadow-sm">
        <span className="brand-ai">AI</span>
        <span className="brand-studio">Studio</span>
        <span className="brand-mentor">Mentor</span>
        <span className="brand-ia">IA</span>
      </div>

      {/* Professional Full Name */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1 mb-1">
        Israel de Jesus Silva
      </h1>

      {/* Subtitle & Status Badge */}
      <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wider uppercase mb-3 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Mentoria & Inteligência Artificial</span>
      </p>

      {/* Bio / Tagline */}
      <p className="text-xs text-slate-400 max-w-xs sm:max-w-sm leading-relaxed mb-6 font-normal">
        Especialista em ecossistema Google AI Studio, automações com IA e aceleração de negócios tecnológicos.
      </p>
    </div>
  );
};
