import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Check, 
  RotateCcw, 
  MessageSquare, 
  Building2, 
  Briefcase, 
  Users, 
  Target, 
  Database, 
  Cpu, 
  Calendar, 
  Clock, 
  Copy,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import brainLogoImg from '../assets/images/brain_logo_1786505359720.jpg';
import { DiagnosticData } from '../types';

interface DiagnosticChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  initialContactData?: {
    name: string;
    whatsapp: string;
    email: string;
    date: string;
    time: string;
  };
  onCompleteDiagnostic?: (data: DiagnosticData) => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  subtext?: string;
  timestamp: string;
  step?: number;
}

const SEGMENT_OPTIONS = [
  'Serviços / Consultoria / B2B',
  'Indústria / Engenharia',
  'Saúde / Clínicas / Bem-estar',
  'Tecnologia / Startups',
  'Comércio / E-commerce',
  'Logística / Distribuição',
  'Educação / Treinamentos',
  'Outro'
];

const COMPANY_SIZE_OPTIONS = [
  '1 a 5 colaboradores',
  '6 a 20 colaboradores',
  '21 a 50 colaboradores',
  '51 a 200 colaboradores',
  '+200 colaboradores'
];

const MANUAL_TASKS_OPTIONS = [
  'Relatórios e consolidação de planilhas',
  'Leitura e síntese de documentos/manuais',
  'Atendimento inicial e triagem de leads/clientes',
  'Vistorias, checklists e auditorias em campo',
  'Elaboração de propostas, orçamentos e contratos',
  'Digitação/transferência de dados entre sistemas',
  'Treinamento e integração de funcionários (onboarding)',
  'Outro processo repetitivo'
];

const DATA_MANAGEMENT_OPTIONS = [
  'Muito Manual: Papel físico, anotações e impressos',
  'Sistemas/ERP: Softwares legados sem integrações',
  'Descentralizado: Planilhas e pastas espalhadas',
  'Nuvem Estruturada: Ferramentas modernas prontas para IA'
];

const AI_USAGE_LEVEL_OPTIONS = [
  'Nenhum uso: IA não faz parte da rotina',
  'Uso Pontual: Ferramentas testadas sem padrão definido',
  'Individual: Colaboradores usam por iniciativa própria',
  'Uso Integrado: Soluções e fluxos de IA em produção oficial'
];

const PRIORITY_SOLUTIONS_OPTIONS = [
  'Atendimento & Vendas: Agentes de IA para qualificação e suporte 24/7',
  'Automação de Backoffice: Eliminação de retrabalho e integração de sistemas',
  'Base de Conhecimento Inteligente: Assistente para busca rápida em normas e manuais',
  'Aplicativos Operacionais: Apps ágeis para vistorias, relatórios e auditorias',
  'Capacitação de Equipe: Treinamentos práticos para times construírem automações'
];

const READINESS_OPTIONS = [
  'Alta prioridade (15 a 30 dias)',
  'Média prioridade (2 a 3 meses)',
  'Fase exploratória / pesquisa'
];

const PREFERRED_PERIOD_OPTIONS = [
  'Manhã (08h às 12h)',
  'Tarde (13h às 18h)',
  'Noite (18h às 20h)'
];

const TOTAL_STEPS = 9;

export const DiagnosticChatModal: React.FC<DiagnosticChatModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  initialContactData,
  onCompleteDiagnostic
}) => {
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Diagnostic state accumulating
  const [diagnostic, setDiagnostic] = useState<DiagnosticData>({
    fullName: initialContactData?.name || '',
    companyName: '',
    role: '',
    whatsapp: initialContactData?.whatsapp || '',
    email: initialContactData?.email || '',
    segment: '',
    companySize: '',
    manualTasks: [],
    mainBottleneck90Days: '',
    dataManagementMethod: '',
    aiUsageLevel: '',
    prioritySolutions: [],
    readiness: '',
    preferredPeriod: '',
    scheduledDate: initialContactData?.date || '',
    scheduledTime: initialContactData?.time || ''
  });

  // Temporary selections for multi-choice steps
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [customOtherText, setCustomOtherText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, step]);

  // Initialize or reset chat on modal open
  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen, initialContactData]);

  const getCurrentTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const addAssistantMessage = (text: string, subtext?: string, currentStep?: number) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: 'msg_' + Date.now() + Math.random(),
          sender: 'assistant',
          text,
          subtext,
          timestamp: getCurrentTime(),
          step: currentStep
        }
      ]);
    }, 450);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: 'msg_' + Date.now() + Math.random(),
        sender: 'user',
        text,
        timestamp: getCurrentTime()
      }
    ]);
  };

  const initChat = () => {
    const hasContact = initialContactData?.name && initialContactData.name.trim().length > 0;
    const clientName = initialContactData?.name?.trim() || '';

    setDiagnostic({
      fullName: initialContactData?.name || '',
      companyName: '',
      role: '',
      whatsapp: initialContactData?.whatsapp || '',
      email: initialContactData?.email || '',
      segment: '',
      companySize: '',
      manualTasks: [],
      mainBottleneck90Days: '',
      dataManagementMethod: '',
      aiUsageLevel: '',
      prioritySolutions: [],
      readiness: '',
      preferredPeriod: '',
      scheduledDate: initialContactData?.date || '',
      scheduledTime: initialContactData?.time || ''
    });
    setSelectedTasks([]);
    setSelectedSolutions([]);
    setCustomOtherText('');

    if (hasContact) {
      setStep(1);
      setMessages([
        {
          id: 'm1',
          sender: 'assistant',
          text: `Olá, ${clientName}! Seja muito bem-vindo(a) à Sessão Diagnóstica de IA & Automação para Negócios.`,
          subtext: 'Este instrumento rápido nos permite identificar gargalos operacionais e mapear as melhores soluções com Inteligência Artificial para o seu negócio.',
          timestamp: getCurrentTime(),
          step: 1
        },
        {
          id: 'm2',
          sender: 'assistant',
          text: `Seus dados de contato já foram vinculados com sucesso (${initialContactData.whatsapp} | ${initialContactData.email}).`,
          subtext: 'Qual é o nome da sua empresa ou negócio e qual o seu cargo/função?',
          timestamp: getCurrentTime(),
          step: 1
        }
      ]);
    } else {
      setStep(0); // Needs contact first if not provided
      setMessages([
        {
          id: 'm0',
          sender: 'assistant',
          text: 'Olá! Sou o assistente da AI Studio MentorIA com Israel de Jesus Silva.',
          subtext: 'Vamos realizar seu Diagnóstico Preliminar de IA & Automação. Para começarmos, qual é o seu Nome Completo, WhatsApp e E-mail corporativo?',
          timestamp: getCurrentTime(),
          step: 0
        }
      ]);
    }
  };

  // Handlers for steps
  const handleStep0Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    addUserMessage(inputVal);
    setDiagnostic(prev => ({
      ...prev,
      fullName: prev.fullName || inputVal.trim()
    }));
    setInputVal('');

    setTimeout(() => {
      addAssistantMessage(
        'Perfeito! Agora, por favor, me informe o Nome da sua Empresa e o seu Cargo/Função.',
        undefined,
        1
      );
      setStep(1);
    }, 300);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const text = inputVal.trim();
    addUserMessage(text);
    
    // Split or save
    setDiagnostic(prev => ({
      ...prev,
      companyName: text,
      role: prev.role || 'Responsável'
    }));
    setInputVal('');

    setTimeout(() => {
      addAssistantMessage(
        'Excelente! Em qual Segmento / Ramo de Atuação a sua empresa atua?',
        'Selecione uma das opções abaixo ou digite um segmento específico:',
        2
      );
      setStep(2);
    }, 300);
  };

  const handleSelectSegment = (segment: string) => {
    addUserMessage(`Segmento: ${segment}`);
    setDiagnostic(prev => ({ ...prev, segment }));
    
    setTimeout(() => {
      addAssistantMessage(
        'Entendido. Qual é o Porte da sua Empresa em número de colaboradores?',
        'Isso nos ajuda a dimensionar a complexidade dos fluxos:',
        3
      );
      setStep(3);
    }, 300);
  };

  const handleSelectCompanySize = (size: string) => {
    addUserMessage(`Porte: ${size}`);
    setDiagnostic(prev => ({ ...prev, companySize: size }));

    setTimeout(() => {
      addAssistantMessage(
        'Mapeamento de Rotina Operacional: Onde a sua equipe mais consome tempo com tarefas manuais ou repetitivas?',
        'Você pode selecionar múltiplas opções que se aplicam ao seu dia a dia:',
        4
      );
      setStep(4);
    }, 300);
  };

  const handleToggleTask = (task: string) => {
    setSelectedTasks(prev => 
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const handleConfirmTasks = () => {
    if (selectedTasks.length === 0 && !customOtherText.trim()) {
      onShowToast('Selecione pelo menos uma tarefa ou digite no campo.');
      return;
    }
    const finalTasks = [...selectedTasks];
    if (customOtherText.trim()) {
      finalTasks.push(`Outro: ${customOtherText.trim()}`);
    }

    addUserMessage(`Tarefas Manuais: ${finalTasks.join(', ')}`);
    setDiagnostic(prev => ({ ...prev, manualTasks: finalTasks }));
    setCustomOtherText('');

    setTimeout(() => {
      addAssistantMessage(
        'Pergunta Chave: Qual é o principal gargalo operacional ou financeiro que você precisa eliminar nos próximos 90 dias?',
        'Descreva brevemente o maior desafio ou ineficiência hoje:',
        5
      );
      setStep(5);
    }, 300);
  };

  const handleStep5BottleneckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const bottleneck = inputVal.trim();
    addUserMessage(`Gargalo 90 dias: ${bottleneck}`);
    setDiagnostic(prev => ({ ...prev, mainBottleneck90Days: bottleneck }));
    setInputVal('');

    setTimeout(() => {
      addAssistantMessage(
        'Como a empresa gerencia dados, documentos e processos operacionais hoje?',
        'Selecione a opção que melhor reflete a realidade atual:',
        6
      );
      setStep(6);
    }, 300);
  };

  const handleSelectDataManagement = (method: string) => {
    addUserMessage(`Gestão de Dados: ${method}`);
    setDiagnostic(prev => ({ ...prev, dataManagementMethod: method }));

    setTimeout(() => {
      addAssistantMessage(
        'Maturidade em IA: Qual o nível atual de utilização de Inteligência Artificial na sua organização?',
        undefined,
        7
      );
      setStep(7);
    }, 300);
  };

  const handleSelectAiUsageLevel = (level: string) => {
    addUserMessage(`Nível de IA: ${level}`);
    setDiagnostic(prev => ({ ...prev, aiUsageLevel: level }));

    setTimeout(() => {
      addAssistantMessage(
        'Soluções Prioritárias: Quais soluções de IA têm maior potencial de impacto imediato para o seu negócio?',
        'Selecione até 3 soluções de maior prioridade:',
        8
      );
      setStep(8);
    }, 300);
  };

  const handleToggleSolution = (solution: string) => {
    if (selectedSolutions.includes(solution)) {
      setSelectedSolutions(prev => prev.filter(s => s !== solution));
    } else {
      if (selectedSolutions.length >= 3) {
        onShowToast('Você pode marcar até 3 soluções prioritárias.');
        return;
      }
      setSelectedSolutions(prev => [...prev, solution]);
    }
  };

  const handleConfirmSolutions = () => {
    if (selectedSolutions.length === 0) {
      onShowToast('Por favor, selecione ao menos 1 solução prioritária.');
      return;
    }

    addUserMessage(`Soluções de Maior Impacto: ${selectedSolutions.join(' | ')}`);
    setDiagnostic(prev => ({ ...prev, prioritySolutions: selectedSolutions }));

    setTimeout(() => {
      addAssistantMessage(
        'Alinhamento Final: Qual o nível de prontidão e urgência da empresa para implementar essas soluções?',
        undefined,
        9
      );
      setStep(9);
    }, 300);
  };

  const handleSelectReadiness = (readiness: string) => {
    addUserMessage(`Prontidão: ${readiness}`);
    
    // Choose period
    setTimeout(() => {
      addAssistantMessage(
        'E qual é o melhor período do dia para realizarmos a sua Sessão Diagnóstica de 30 minutos?',
        'Escolha o horário de sua preferência:',
        10
      );
      setDiagnostic(prev => ({ ...prev, readiness }));
      setStep(10);
    }, 300);
  };

  const handleSelectPeriod = (period: string) => {
    addUserMessage(`Período Preferencial: ${period}`);
    
    const finalData: DiagnosticData = {
      ...diagnostic,
      preferredPeriod: period
    };
    setDiagnostic(finalData);

    if (onCompleteDiagnostic) {
      onCompleteDiagnostic(finalData);
    }

    setTimeout(() => {
      addAssistantMessage(
        '🎉 Diagnóstico Concluído com Sucesso!',
        'Todas as informações foram organizadas. O relatório completo está pronto para ser enviado diretamente para o WhatsApp de Israel de Jesus Silva.',
        11
      );
      setStep(11); // Finished summary view
    }, 400);
  };

  // Build WhatsApp formatted message matching all fields of the PDF
  const buildWhatsAppMessage = () => {
    const name = diagnostic.fullName || initialContactData?.name || 'Cliente';
    const company = diagnostic.companyName || 'Empresa';
    const role = diagnostic.role || 'Gestor(a)';
    const phone = diagnostic.whatsapp || initialContactData?.whatsapp || '(71) 99694-8755';
    const email = diagnostic.email || initialContactData?.email || 'aistudiomentoria@gmail.com';
    const dateFormatted = diagnostic.scheduledDate ? diagnostic.scheduledDate.split('-').reverse().join('/') : 'A combinar';
    const timeFormatted = diagnostic.scheduledTime || diagnostic.preferredPeriod || 'Horário comercial';

    const tasksList = diagnostic.manualTasks && diagnostic.manualTasks.length > 0
      ? diagnostic.manualTasks.map(t => `   • ${t}`).join('\n')
      : '   • Não especificado';

    const solutionsList = diagnostic.prioritySolutions && diagnostic.prioritySolutions.length > 0
      ? diagnostic.prioritySolutions.map(s => `   • ${s}`).join('\n')
      : '   • Atendimento & Vendas com Agentes IA';

    return `🎯 *SESSÃO DIAGNÓSTICA: IA & AUTOMAÇÃO PARA NEGÓCIOS*
*AI Studio MentorIA • Israel de Jesus Silva*
━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *1. IDENTIFICAÇÃO & PERFIL DA EMPRESA*
• *Nome Completo:* ${name}
• *Empresa:* ${company}
• *Cargo / Função:* ${role}
• *WhatsApp Comercial:* ${phone}
• *E-mail Corporativo:* ${email}
• *Segmento:* ${diagnostic.segment || 'Geral'}
• *Porte da Empresa:* ${diagnostic.companySize || '1 a 5 colaboradores'}

⚙️ *2. GARGALOS & ROTINA OPERACIONAL*
• *Tarefas Manuais / Repetitivas:*
${tasksList}
• *Principal Gargalo a Eliminar (90 dias):*
  👉 "${diagnostic.mainBottleneck90Days || 'Otimização de processos com IA'}"
• *Gestão Atual de Dados & Processos:*
  ${diagnostic.dataManagementMethod || 'Em estruturação'}

🧠 *3. MATURIDADE & OBJETIVOS COM IA*
• *Nível Atual de IA:* ${diagnostic.aiUsageLevel || 'Fase exploratória'}
• *Soluções Prioritárias de Maior Impacto:*
${solutionsList}

🗓️ *4. ALINHAMENTO DA SESSÃO*
• *Prontidão para Implementação:* ${diagnostic.readiness || 'Alta prioridade (15 a 30 dias)'}
• *Melhor Período:* ${diagnostic.preferredPeriod || 'Manhã (08h às 12h)'}
• *Data/Hora Agendada:* ${dateFormatted} às ${timeFormatted}

━━━━━━━━━━━━━━━━━━━━━━━━━━
_Formulário preenchido via Cartão Digital AI Studio MentorIA_`;
  };

  const handleOpenWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5571996948755?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    onShowToast('Redirecionando para o WhatsApp com o diagnóstico completo!');
  };

  const handleCopyDiagnosticText = () => {
    const msg = buildWhatsAppMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg).then(() => {
        onShowToast('Diagnóstico copiado para a área de transferência!');
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-lg h-[92vh] max-h-[780px] flex flex-col shadow-2xl relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-red-500 via-blue-500 via-amber-400 to-emerald-400">
                <img 
                  src={brainLogoImg} 
                  alt="Israel Silva MentorIA" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 absolute -bottom-0.5 -right-0.5 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white leading-tight">Diagnóstico IA & Negócios</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                  AI Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Israel de Jesus Silva</span>
                <span>•</span>
                <span className="text-emerald-400">Online</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={initChat}
              title="Reiniciar Diagnóstico"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Fechar"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-1 relative">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-blue-500 via-amber-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(10, (step / TOTAL_STEPS) * 100))}%` }}
          />
        </div>

        {/* Messages Scroll Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-900/60"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-slate-700">
                  <img src={brainLogoImg} alt="AI" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-bl-none'
                }`}
              >
                <p className="text-xs sm:text-[13px] leading-relaxed font-normal whitespace-pre-line">{msg.text}</p>
                {msg.subtext && (
                  <p className="text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-700/50 leading-snug">
                    {msg.subtext}
                  </p>
                )}
                <span className={`block text-[9px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-slate-700">
                <img src={brainLogoImg} alt="AI" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Controls / Interactive Response Area */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">

          {/* Step 0: User Name & Contact if missing */}
          {step === 0 && !isTyping && (
            <form onSubmit={handleStep0Submit} className="flex gap-2">
              <input
                type="text"
                required
                autoFocus
                placeholder="Digite seu Nome Completo e Contato..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 1: Company Name and Role */}
          {step === 1 && !isTyping && (
            <form onSubmit={handleStep1Submit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex: TechFlow Soluções - Diretor Comercial"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Segment Selection */}
          {step === 2 && !isTyping && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
                {SEGMENT_OPTIONS.map(seg => (
                  <button
                    key={seg}
                    onClick={() => handleSelectSegment(seg)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-500 text-slate-200 text-xs font-medium transition-all text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{seg}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Company Size */}
          {step === 3 && !isTyping && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {COMPANY_SIZE_OPTIONS.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSelectCompanySize(size)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500 text-slate-200 text-xs font-medium transition-all text-center flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="leading-tight">{size}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Manual/Repetitive Tasks (Multiple Choice) */}
          {step === 4 && !isTyping && (
            <div className="space-y-2.5">
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
                {MANUAL_TASKS_OPTIONS.map(task => {
                  const isSelected = selectedTasks.includes(task);
                  return (
                    <button
                      key={task}
                      type="button"
                      onClick={() => handleToggleTask(task)}
                      className={`w-full p-2 rounded-xl border text-xs text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950/60 border-blue-500 text-white font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{task}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Outro gargalo (opcional)..."
                  value={customOtherText}
                  onChange={e => setCustomOtherText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleConfirmTasks}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <span>Continuar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: 90 Days Main Bottleneck */}
          {step === 5 && !isTyping && (
            <form onSubmit={handleStep5BottleneckSubmit} className="space-y-2">
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  required
                  autoFocus
                  placeholder="Ex: Demora de 4 dias para orçar propostas e suporte manual sobrecarregado..."
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
                <button
                  type="submit"
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white self-end cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 6: Data Management */}
          {step === 6 && !isTyping && (
            <div className="space-y-1.5">
              {DATA_MANAGEMENT_OPTIONS.map(dm => (
                <button
                  key={dm}
                  onClick={() => handleSelectDataManagement(dm)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500 text-slate-200 text-xs font-medium transition-all text-left flex items-center gap-2.5 cursor-pointer"
                >
                  <Database className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{dm}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 7: Current AI Usage Level */}
          {step === 7 && !isTyping && (
            <div className="space-y-1.5">
              {AI_USAGE_LEVEL_OPTIONS.map(level => (
                <button
                  key={level}
                  onClick={() => handleSelectAiUsageLevel(level)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500 text-slate-200 text-xs font-medium transition-all text-left flex items-center gap-2.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{level}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 8: Priority AI Solutions (Up to 3) */}
          {step === 8 && !isTyping && (
            <div className="space-y-2">
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
                {PRIORITY_SOLUTIONS_OPTIONS.map(sol => {
                  const isSelected = selectedSolutions.includes(sol);
                  return (
                    <button
                      key={sol}
                      type="button"
                      onClick={() => handleToggleSolution(sol)}
                      className={`w-full p-2 rounded-xl border text-xs text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-500 text-white font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="leading-snug pr-2">{sol}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-slate-400">
                  {selectedSolutions.length}/3 selecionadas
                </span>
                <button
                  type="button"
                  onClick={handleConfirmSolutions}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>Continuar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 9: Readiness */}
          {step === 9 && !isTyping && (
            <div className="space-y-1.5">
              {READINESS_OPTIONS.map(r => (
                <button
                  key={r}
                  onClick={() => handleSelectReadiness(r)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500 text-slate-200 text-xs font-medium transition-all text-left flex items-center gap-2 cursor-pointer"
                >
                  <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>{r}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 10: Preferred Period */}
          {step === 10 && !isTyping && (
            <div className="space-y-1.5">
              {PREFERRED_PERIOD_OPTIONS.map(p => (
                <button
                  key={p}
                  onClick={() => handleSelectPeriod(p)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500 text-slate-200 text-xs font-medium transition-all text-left flex items-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{p}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 11: Completion & WhatsApp Dispatch */}
          {step === 11 && !isTyping && (
            <div className="space-y-2.5 animate-in fade-in duration-300">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Enviar Diagnóstico Completo no WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyDiagnosticText}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Copiar Relatório</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Concluir e Voltar</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
