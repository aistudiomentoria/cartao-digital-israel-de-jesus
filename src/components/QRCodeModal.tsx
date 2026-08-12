import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Download, Link2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const targetUrl = window.location.href.startsWith('http') 
    ? window.location.href 
    : 'https://aistudiomentoria.com.br';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl);
      onShowToast('Link copiado para a área de transferência!');
    }
  };

  const downloadQRCodeSVG = () => {
    const svg = document.getElementById('qrCodeSVG');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'Israel_de_Jesus_Silva_QRCode.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
    onShowToast('Imagem do QR Code baixada!');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">QR Code de Contato</h3>
          <p className="text-xs text-slate-400 mt-1">Aponte a câmera do celular para abrir este cartão digital</p>
        </div>

        {/* QR Canvas Frame */}
        <div className="bg-white p-4 rounded-2xl inline-block my-2 shadow-xl border-4 border-slate-800">
          <QRCodeSVG 
            id="qrCodeSVG"
            value={targetUrl} 
            size={180} 
            bgColor="#ffffff"
            fgColor="#0f172a"
            level="H"
            marginSize={1}
          />
        </div>

        {/* Direct Actions inside Modal */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-center gap-3">
          <button
            onClick={handleCopyLink}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Link</span>
          </button>

          <button
            onClick={downloadQRCodeSVG}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Salvar Imagem</span>
          </button>
        </div>
      </div>
    </div>
  );
};
