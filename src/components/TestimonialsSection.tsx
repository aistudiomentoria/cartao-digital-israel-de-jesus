import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, Plus, CheckCircle2, User, X } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  onShowToast: (msg: string) => void;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Cláudio Fonseca',
    role: 'CEO & Founder',
    company: 'TechFlow Soluções',
    rating: 5,
    text: 'A mentoria do Israel transformou o nosso fluxo operacional. Implementamos os modelos do Google AI Studio e reduzimos o tempo de atendimento em 60%. O suporte direto via WhatsApp foi impecável!',
    tag: 'Mentoria',
    date: 'Há 1 semana'
  },
  {
    id: 't2',
    author: 'Mariana Duarte',
    role: 'Product Manager',
    company: 'Agência Scale IA',
    rating: 5,
    text: 'Israel domina o ecossistema de inteligência artificial como poucos. A consultoria personalizada ajudou nossa equipe a lançar 3 novos produtos baseados no Gemini em tempo recorde.',
    tag: 'AI Studio',
    date: 'Há 2 semanas'
  },
  {
    id: 't3',
    author: 'Dr. Roberto Magalhães',
    role: 'Diretor Clínico',
    company: 'Grupo MedTech',
    rating: 5,
    text: 'Profissional extremamente comprometido e dinâmico. Agendamos a sessão diagnóstica e em menos de 10 dias já tínhamos os agentes automáticos em pleno funcionamento.',
    tag: 'Consultoria',
    date: 'Há 1 mês'
  },
  {
    id: 't4',
    author: 'Fernanda Lins',
    role: 'Especialista em Marketing',
    company: 'Inova Digital',
    rating: 5,
    text: 'Excelente didática! Aprendi a integrar o AI Studio em nossas campanhas e otimizamos todo o processo de criação de conteúdo. Recomendo fortemente!',
    tag: 'Automação',
    date: 'Há 1 mês'
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onShowToast }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('aistudio_testimonials');
      return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTag, setNewTag] = useState<'Mentoria' | 'Consultoria' | 'AI Studio' | 'Automação'>('Mentoria');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('aistudio_testimonials', JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  const filteredTestimonials = activeFilter === 'Todos' 
    ? testimonials 
    : testimonials.filter(t => t.tag === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) {
      onShowToast('Por favor, preencha seu nome e depoimento.');
      return;
    }

    const item: Testimonial = {
      id: 't_' + Date.now(),
      author: newAuthor.trim(),
      role: newRole.trim() || 'Cliente / Aluno',
      rating: newRating,
      tag: newTag,
      text: newText.trim(),
      date: 'Hoje'
    };

    setTestimonials([item, ...testimonials]);
    setNewAuthor('');
    setNewRole('');
    setNewText('');
    setNewRating(5);
    setIsModalOpen(false);
    onShowToast('Agradecemos seu depoimento! Ele foi publicado com sucesso.');
  };

  return (
    <div className="pt-6 border-t border-slate-800/80 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white tracking-wide">Depoimentos dos Clientes</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Avaliar</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar text-xs">
        {['Todos', 'Mentoria', 'Consultoria', 'AI Studio', 'Automação'].map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium cursor-pointer ${
              activeFilter === f
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Testimonials Cards Grid */}
      <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all text-left relative group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 inline" />
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {t.role} {t.company ? `• ${t.company}` : ''}
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 font-medium border border-slate-700">
                {t.tag}
              </span>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                  }`}
                />
              ))}
              <span className="text-[10px] text-slate-500 ml-1.5">{t.date}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{t.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>Deixar Depoimento</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Sua avaliação ajuda a demonstrar os resultados da AI Studio MentorIA.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-left text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Andrade"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cargo / Empresa</label>
                <input
                  type="text"
                  placeholder="Ex: Empreendedor / TechLead"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Categoria</label>
                  <select
                    value={newTag}
                    onChange={e => setNewTag(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mentoria">Mentoria</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="AI Studio">AI Studio</option>
                    <option value="Automação">Automação</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nota (Estrelas)</label>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Seu Depoimento *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Conte como foi sua experiência com o Israel e os resultados alcançados..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 cursor-pointer mt-2"
              >
                Enviar Depoimento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
