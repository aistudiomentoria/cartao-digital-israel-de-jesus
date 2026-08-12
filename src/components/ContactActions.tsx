import React from 'react';
import { Phone, Mail, Globe, ChevronRight, ExternalLink, MessageCircle } from 'lucide-react';

interface ContactActionsProps {
  onShowToast: (msg: string) => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({ onShowToast }) => {
  const whatsappUrl = "https://wa.me/5571996948755?text=Ol%C3%A1%20Israel!%20Encontrei%20seu%20cart%C3%A3o%20digital%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20AI%20Studio%20MentorIA.";

  return (
    <div className="grid grid-cols-1 gap-3 relative z-10 mb-6">
      {/* WhatsApp Direct */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-action flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-500/30 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-emerald-300/80 font-medium uppercase tracking-wider">WhatsApp Direct</p>
            <p className="text-sm font-semibold text-white">(71) 99694-8755</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-emerald-400/60 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Phone Call */}
      <a
        href="tel:71996948755"
        className="btn-action flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/10 border border-blue-500/30 hover:border-blue-400/60 hover:bg-blue-500/30 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-blue-300/80 font-medium uppercase tracking-wider">Telefone Comercial</p>
            <p className="text-sm font-semibold text-white">(71) 99694-8755</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-blue-400/60 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Email Direct */}
      <a
        href="mailto:aistudiomentoria@gmail.com"
        className="btn-action flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 hover:border-amber-400/60 hover:bg-amber-500/30 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-[11px] text-amber-300/80 font-medium uppercase tracking-wider">E-mail de Contato</p>
            <p className="text-sm font-semibold text-white truncate max-w-[190px] sm:max-w-none">aistudiomentoria@gmail.com</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-amber-400/60 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Website Official */}
      <a
        href="https://aistudiomentoria.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-action flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/20 to-red-500/10 border border-rose-500/30 hover:border-rose-400/60 hover:bg-rose-500/30 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-rose-300/80 font-medium uppercase tracking-wider">Website Oficial</p>
            <p className="text-sm font-semibold text-white">aistudiomentoria.com.br</p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-rose-400/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};
