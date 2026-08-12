import React, { useState, useEffect } from 'react';
import { HeaderLogo } from './components/HeaderLogo';
import { ContactActions } from './components/ContactActions';
import { CardUtilityBar } from './components/CardUtilityBar';
import { SocialLinks } from './components/SocialLinks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SchedulingSection } from './components/SchedulingSection';
import { QRCodeModal } from './components/QRCodeModal';
import { Toast } from './components/Toast';
import { ToastNotification } from './types';

export default function App() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3200);
  };

  // 3D Mouse Tilt effect on desktop
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const xAxis = (window.innerWidth / 2 - e.clientX) / 45;
      const yAxis = (window.innerHeight / 2 - e.clientY) / 45;
      setTilt({ x: xAxis, y: yAxis });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8">
      <main className="w-full max-w-md sm:max-w-lg mx-auto py-4">
        {/* Main Business Card Frame */}
        <div
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="glow-card rounded-[2rem] p-5 sm:p-8 shadow-2xl relative overflow-hidden text-center"
        >
          {/* Subtle Background Radial Grid Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

          {/* 1. Header & Colorful Brain Logo */}
          <HeaderLogo />

          {/* 2. Primary Contact Actions (WhatsApp, Phone, Email, Web) */}
          <ContactActions onShowToast={showToast} />

          {/* 3. vCard Agenda Download, QR Code & Share Controls */}
          <CardUtilityBar 
            onOpenQR={() => setIsQRModalOpen(true)} 
            onShowToast={showToast} 
          />

          {/* 4. Social Networks & Community Links */}
          <SocialLinks />

          {/* 5. Agendamento de Mentoria & Consultoria */}
          <SchedulingSection onShowToast={showToast} />

          {/* 6. Customer Testimonials Section */}
          <TestimonialsSection onShowToast={showToast} />

          {/* Footer Branding */}
          <footer className="mt-8 pt-4 border-t border-slate-800/60 text-center text-slate-500 text-xs relative z-10">
            <p className="font-medium">
              © {new Date().getFullYear()} Israel de Jesus Silva • <span className="text-slate-400">AI Studio MentorIA</span>
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              Todos os direitos reservados • Mentoria de IA & Desenvolvimento
            </p>
          </footer>
        </div>
      </main>

      {/* QR Code Modal Popup */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Floating Notification */}
      <Toast toast={toast} />
    </div>
  );
}
