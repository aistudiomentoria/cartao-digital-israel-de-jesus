import React from 'react';
import { Instagram, Linkedin, Youtube, Send, Users } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/aistudiomentoria',
      icon: Instagram,
      color: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/israeldejesussilva',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@aistudiomentoria',
      icon: Youtube,
      color: 'hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/aistudiomentoria',
      icon: Send,
      color: 'hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10',
    },
    {
      name: 'Comunidade IA',
      url: 'https://chat.whatsapp.com/aistudiomentoria',
      icon: Users,
      color: 'hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10',
    },
  ];

  return (
    <div className="pt-2 border-t border-slate-800/80 mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
        Redes Sociais & Comunidade
      </p>
      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        {socials.map((s) => {
          const IconComponent = s.icon;
          return (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium ${s.color}`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{s.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
