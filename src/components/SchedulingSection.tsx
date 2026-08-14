import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  Download, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  FileText,
  Bot,
  ArrowRight,
  ClipboardList,
  Check
} from 'lucide-react';
import { ServiceOption, Booking, DiagnosticData } from '../types';
import { DiagnosticChatModal } from './DiagnosticChatModal';

interface SchedulingSectionProps {
  onShowToast: (msg: string) => void;
}

const SERVICES: ServiceOption[] = [
  {
    id: 's1',
    title: 'Sessão Diagnóstica de IA',
    duration: '20 min',
    price: 'Gratuito',
    description: 'Análise inicial das oportunidades de IA e automação para o seu negócio com questionário guiado.',
    popular: true
  },
  {
    id: 's2',
    title: 'Mentoria Individual AI Studio',
    duration: '1 hora',
    price: 'R$ 250',
    description: 'Acompanhamento prático hands-on para criação de soluções no ecossistema Gemini.'
  },
  {
    id: 's3',
    title: 'Consultoria de Projetos Empresariais',
    duration: '1h 30min',
    price: 'R$ 450',
    description: 'Mapeamento de arquitetura de IA, integração de dados e automação avançada.'
  }
];

const TIME_SLOTS = ['09:00', '10:30', '14:00', '15:30', '17:00', '19:00'];

export const SchedulingSection: React.FC<SchedulingSectionProps> = ({ onShowToast }) => {
  const [selectedService, setSelectedService] = useState<ServiceOption>(SERVICES[0]);
  const [isDiagnosticChatOpen, setIsDiagnosticChatOpen] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  
  // Default date to tomorrow in YYYY-MM-DD format
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [date, setDate] = useState<string>(getTomorrowString());
  const [time, setTime] = useState<string>('10:30');
  const [name, setName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // When clicking on a service
  const handleSelectService = (service: ServiceOption) => {
    setSelectedService(service);
    if (service.id === 's1') {
      // Open the diagnostic chat automatically or prompt
      setIsDiagnosticChatOpen(true);
      onShowToast('Abrindo assistente de diagnóstico guiado de IA...');
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !email.trim()) {
      onShowToast('Por favor, preencha os campos obrigatórios (*).');
      return;
    }

    const newBooking: Booking = {
      id: 'book_' + Date.now(),
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      date,
      time,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      notes: notes.trim(),
      diagnosticData: diagnosticData || undefined,
      status: 'confirmado',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    onShowToast('Solicitação de agendamento realizada com sucesso!');
  };

  const generateICS = (booking: Booking) => {
    const startDateStr = `${booking.date.replace(/-/g, '')}T${booking.time.replace(':', '')}00`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AI Studio MentorIA//Agendamentos//PT',
      'BEGIN:VEVENT',
      `SUMMARY:${booking.serviceTitle} - Israel de Jesus Silva`,
      `DESCRIPTION:Agendamento de Mentoria em IA com Israel de Jesus Silva.\\nCliente: ${booking.name}\\nEmpresa: ${booking.diagnosticData?.companyName || 'Não informada'}\\nNotas: ${booking.notes || 'Nenhuma'}`,
      `DTSTART:${startDateStr}`,
      `DTEND:${startDateStr}`,
      'LOCATION:Online (Link enviado via WhatsApp/E-mail)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `agendamento_israel_silva_${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('Evento do calendário baixado!');
  };

  const getWhatsAppBookingUrl = (booking: Booking) => {
    if (booking.diagnosticData) {
      const diag = booking.diagnosticData;
      const tasksList = diag.manualTasks && diag.manualTasks.length > 0 
        ? diag.manualTasks.map(t => `   • ${t}`).join('\n') 
        : '   • Não especificado';
      const solutionsList = diag.prioritySolutions && diag.prioritySolutions.length > 0 
        ? diag.prioritySolutions.map(s => `   • ${s}`).join('\n') 
        : '   • Não especificado';

      const msg = `🎯 *SESSÃO DIAGNÓSTICA: IA & AUTOMAÇÃO PARA NEGÓCIOS*\n` +
        `*AI Studio MentorIA • Israel de Jesus Silva*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 *1. IDENTIFICAÇÃO & PERFIL*\n` +
        `• *Nome:* ${booking.name}\n` +
        `• *Empresa:* ${diag.companyName || 'Empresa'}\n` +
        `• *Cargo / Função:* ${diag.role || 'Gestor'}\n` +
        `• *WhatsApp:* ${booking.whatsapp}\n` +
        `• *E-mail:* ${booking.email}\n` +
        `• *Segmento:* ${diag.segment || 'Geral'}\n` +
        `• *Porte:* ${diag.companySize || '1 a 5 colaboradores'}\n\n` +
        `⚙️ *2. GARGALOS & ROTINA OPERACIONAL*\n` +
        `• *Tarefas Manuais / Repetitivas:*\n${tasksList}\n` +
        `• *Principal Gargalo 90 Dias:*\n  👉 "${diag.mainBottleneck90Days || 'Otimização de processos'}"\n` +
        `• *Gestão de Dados Atual:* ${diag.dataManagementMethod || 'Não informado'}\n\n` +
        `🧠 *3. MATURIDADE & OBJETIVOS COM IA*\n` +
        `• *Nível de Uso de IA:* ${diag.aiUsageLevel || 'Iniciante'}\n` +
        `• *Soluções Prioritárias:*\n${solutionsList}\n\n` +
        `🗓️ *4. ALINHAMENTO DA SESSÃO*\n` +
        `• *Prontidão:* ${diag.readiness || 'Alta prioridade'}\n` +
        `• *Melhor Período:* ${diag.preferredPeriod || 'Horário agendado'}\n` +
        `• *Data/Hora Agendada:* ${booking.date.split('-').reverse().join('/')} às ${booking.time}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Enviado via Cartão Digital AI Studio MentorIA_`;

      return `https://wa.me/5571996948755?text=${encodeURIComponent(msg)}`;
    }

    const msg = `Olá Israel! Gostaria de confirmar meu agendamento:\n\n` +
      `📌 *Serviço:* ${booking.serviceTitle}\n` +
      `📅 *Data:* ${booking.date.split('-').reverse().join('/')}\n` +
      `⏰ *Horário:* ${booking.time}\n` +
      `👤 *Nome:* ${booking.name}\n` +
      `📱 *WhatsApp:* ${booking.whatsapp}\n` +
      `✉️ *E-mail:* ${booking.email}\n` +
      `💬 *Objetivo:* ${booking.notes || 'Análise de Inteligência Artificial'}`;

    return `https://wa.me/5571996948755?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="pt-6 border-t border-slate-800/80 mb-6 text-left">
      {/* Title */}
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="w-5 h-5 text-emerald-400" />
        <h2 className="text-base font-bold text-white tracking-wide">Agendamento & Diagnóstico de IA</h2>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Escolha a modalidade desejada para conversar diretamente com Israel de Jesus Silva.
      </p>

      {/* Confirmation Card if booked */}
      {confirmedBooking ? (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Agendamento Pré-Confirmado!</h3>
              <p className="text-xs text-emerald-300">Aguardamos você para esta sessão estratégica.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Serviço:</span>
              <span className="font-bold text-emerald-400">{confirmedBooking.serviceTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Data e Hora:</span>
              <span className="font-medium text-white">{confirmedBooking.date.split('-').reverse().join('/')} às {confirmedBooking.time}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Cliente:</span>
              <span className="font-medium text-white">{confirmedBooking.name}</span>
            </div>
            {confirmedBooking.diagnosticData && (
              <div className="pt-1">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Diagnóstico de IA & Gargalos Vinculado
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Empresa: {confirmedBooking.diagnosticData.companyName} • {confirmedBooking.diagnosticData.segment}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={getWhatsAppBookingUrl(confirmedBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Enviar Agendamento e Diagnóstico no WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => generateICS(confirmedBooking)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Baixar .ics</span>
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-800 cursor-pointer"
              >
                Novo Agendamento
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleBooking} className="space-y-4">
          
          {/* Service Cards Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Selecione a Modalidade:
            </label>
            <div className="space-y-2">
              {SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleSelectService(s)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white">{s.title}</span>
                          {s.popular && (
                            <span className="text-[9px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5" /> Recomendado
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-300 font-medium">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3 text-blue-400" /> {s.duration}
                          </span>
                          <span className="text-emerald-400 font-bold">{s.price}</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 flex-shrink-0 ${
                        isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    {/* Dedicated Chat Prompt Banner for Sessão Diagnóstica */}
                    {s.id === 's1' && isSelected && (
                      <div className="mt-1 pt-2 border-t border-blue-500/30 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-blue-300">
                          <Bot className="w-4 h-4 text-blue-400 animate-pulse" />
                          <span>
                            {diagnosticData 
                              ? `Diagnóstico de "${diagnosticData.companyName || 'Empresa'}" preenchido!` 
                              : 'Chat inteligente de diagnóstico ativo'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDiagnosticChatOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                        >
                          <span>{diagnosticData ? 'Revisar Chat' : 'Abrir Chat'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date and Time Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. Data e Horário Preferencial:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                      time === t
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Dados de Contato:
            </label>
            <div className="space-y-2.5 text-xs">
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD *"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Seu Melhor E-mail *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="relative">
                <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <textarea
                  rows={2}
                  placeholder="Qual seu principal objetivo ou dúvida sobre IA? (Opcional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Diagnostic Status Pill if filled */}
          {diagnosticData && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-400" />
                <span>Questionário Diagnóstico IA Preenchido!</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDiagnosticChatOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer"
              >
                Editar
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Confirmar Agendamento</span>
          </button>
        </form>
      )}

      {/* Diagnostic Chat Modal */}
      <DiagnosticChatModal
        isOpen={isDiagnosticChatOpen}
        onClose={() => setIsDiagnosticChatOpen(false)}
        onShowToast={onShowToast}
        initialContactData={{
          name,
          whatsapp,
          email,
          date,
          time
        }}
        onCompleteDiagnostic={(diag) => {
          setDiagnosticData(diag);
          if (!name && diag.fullName) setName(diag.fullName);
          if (!whatsapp && diag.whatsapp) setWhatsapp(diag.whatsapp);
          if (!email && diag.email) setEmail(diag.email);
        }}
      />
    </div>
  );
};
