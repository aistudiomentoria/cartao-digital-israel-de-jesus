import React from 'react';
import { UserPlus, QrCode, Share2 } from 'lucide-react';

interface CardUtilityBarProps {
  onOpenQR: () => void;
  onShowToast: (msg: string) => void;
}

export const CardUtilityBar: React.FC<CardUtilityBarProps> = ({ onOpenQR, onShowToast }) => {
  
  const downloadVCard = () => {
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Silva;Israel;de Jesus;;',
      'FN:Israel de Jesus Silva',
      'ORG:AI Studio MentorIA',
      'TITLE:Mentoria & Inteligência Artificial',
      'TEL;TYPE=CELL,VOICE,MSG:+5571996948755',
      'EMAIL;TYPE=INTERNET,PREF:aistudiomentoria@gmail.com',
      'URL:https://aistudiomentoria.com.br',
      'NOTE:Especialista em Mentoria de Inteligência Artificial e Google AI Studio',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Israel_de_Jesus_Silva_AI_Studio.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('Contato vCard salvo! Abra o arquivo para adicionar à sua agenda.');
  };

  const shareCard = async () => {
    const shareUrl = window.location.href.startsWith('http') ? window.location.href : 'https://aistudiomentoria.com.br';
    const shareData = {
      title: 'Israel de Jesus Silva | AI Studio MentorIA',
      text: 'Cartão de Visitas Digital - Israel de Jesus Silva (AI Studio MentorIA)',
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share dialog
      }
    } else {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        onShowToast('Link do cartão copiado para a área de transferência!');
      } else {
        onShowToast('Copia este link: ' + shareUrl);
      }
    }
  };

  return (
    <div className="space-y-3 relative z-10 mb-6">
      {/* Primary Save vCard Button */}
      <button
        onClick={downloadVCard}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-indigo-500/40 active:scale-[0.98] cursor-pointer"
      >
        <UserPlus className="w-5 h-5 text-indigo-100" />
        <span>Salvar Contato na Agenda</span>
      </button>

      {/* Secondary QR Code & Share Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenQR}
          className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-blue-400" />
          <span>QR Code</span>
        </button>

        <button
          onClick={shareCard}
          className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>Compartilhar</span>
        </button>
      </div>
    </div>
  );
};
