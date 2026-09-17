'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sun, CloudRain, Sparkles, Heart, Calendar, 
  HelpCircle, ArrowLeft, CheckCircle, Brain, ShieldAlert, Moon
} from 'lucide-react';

export default function SaltosDesenvolvimentoApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');
  const [semanaAtual, setSemanaAtual] = useState(null);

  // --- BANCO DE DADOS DOS SALTOS DE DESENVOLVIMENTO ---
  const saltosDados = {
    5: {
      titulo: 'Salto 1: O Mundo dos Sentidos',
      semana: 5,
      fase: 'tempestade',
      descricao: 'O bebê começa a enxergar com mais clareza, reagir a sons e ficar mais atento aos cheiros da mãe.',
      sinais: ['Choro mais frequente', 'Busca constante pelo peito/colo', 'Sono agitado'],
      habilidades: ['Fixa o olhar nos rostos por mais tempo', 'Dá os primeiros sorrisos intencionais', 'Assusta-se menos com barulhos da casa'],
      dicas: 'Ofereça bastante contato pele a pele. O som do seu coração traz a segurança do útero.'
    },
    8: {
      titulo: 'Salto 2: O Mundo dos Padrões',
      semana: 8,
      fase: 'tempestade',
      descricao: 'O bebê percebe padrões nas coisas: mãos se movendo, sombras na parede e repetição de sons.',
      sinais: ['Chupa mais as mãos', 'Fica irritado no final da tarde', 'Quer ficar apenas no colo na vertical'],
      habilidades: ['Tenta alcançar brinquedos leves', 'Gira a cabeça acompanhando objetos', 'Emite os primeiros sons de voz (gugus)'],
      dicas: 'Deixe o bebê observar suas mãos se movendo e converse olhando nos olhos dele.'
    },
    12: {
      titulo: 'Salto 3: Transições Suaves',
      semana: 12,
      fase: 'tempestade',
      descricao: 'Os movimentos bruscos do bebê começam a dar lugar a gestos mais suaves e intencionais.',
      sinais: ['Resistência para pegar o sono', 'Grita de frustração ao tentar pegar objetos', 'Mudança no padrão de mamada'],
      habilidades: ['Rola de lado suavemente', 'Levanta a cabeça com firmeza de bruços', 'Explora objetos com a boca'],
      dicas: 'Faça momentos curtos de bruços (Tummy Time) e cante músicas suaves para acalmar.'
    },
    19: {
      titulo: 'Salto 4: O Mundo dos Eventos',
      semana: 19,
      fase: 'tempestade',
      descricao: 'Um dos saltos mais intensos! O bebê compreende sequências de causa e efeito (ex: balançar o chocalho faz barulho).',
      sinais: ['Regressão severa de sono', 'Distração fácil durante a amamentação', 'Mudanças bruscas de humor'],
      habilidades: ['Responde pelo próprio nome', 'Muda de mão ao segurar objetos', 'Entende que o mamão vem após o babador'],
      dicas: 'Mantenha o ambiente de amamentação mais calmo e com pouca luz para evitar distrações.'
    }
  };

  // Carregar data do localStorage
  useEffect(() => {
    const dataSalva = localStorage.getItem('sd_data_nascimento');
    if (dataSalva) {
      setDataNascimento(dataSalva);
      calcularSemana(dataSalva);
    }
  }, []);

  const salvarDataNascimento = (e) => {
    const data = e.target.value;
    setDataNascimento(data);
    localStorage.setItem('sd_data_nascimento', data);
    calcularSemana(data);
  };

  const calcularSemana = (dataString) => {
    if (!dataString) return;
    const dataNasc = new Date(dataString);
    const hoje = new Date();
    const diferencaEmDias = Math.floor((hoje - dataNasc) / (1000 * 60 * 60 * 24));
    const semanas = Math.max(1, Math.floor(diferencaEmDias / 7));
    setSemanaAtual(semanas);
  };

  // Determinar se a semana atual é de salto ou estabilidade
  const saltoAtual = saltosDados[semanaAtual] || null;
  const proximoSaltoSemana = Object.keys(saltosDados).find(s => parseInt(s) > (semanaAtual || 0));

  const themeClasses = darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#FFFDF9] text-slate-800';
  const cardClasses = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100';

  return (
    <div className={`min-h-screen pb-12 transition-colors ${themeClasses}`}>
      
      {/* Header */}
      <header className={`p-4 sticky top-0 z-10 flex items-center justify-between border-b shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-[#F0657D] leading-none">Saltos de Desenvolvimento</h1>
            <p className="text-[10px] text-[#2D7A1E] font-semibold mt-0.5">Entenda as Fases do Seu Bebê</p>
          </div>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-5">

        {/* --- CAMPO DE SELEÇÃO DE DATA --- */}
        <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
          <label className="text-xs font-bold mb-1.5 flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <Calendar className="w-4 h-4 text-[#F0657D]" /> Data de Nascimento (ou DPP):
          </label>
          <input 
            type="date"
            value={dataNascimento}
            onChange={salvarDataNascimento}
            className="w-full p-2.5 rounded-xl border border-pink-200 dark:border-slate-700 bg-pink-50/50 dark:bg-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
          />
          {semanaAtual && (
            <p className="text-xs font-bold text-[#2D7A1E] mt-2 flex items-center gap-1">
              ✨ Seu bebê está na <span className="underline">{semanaAtual}ª semana</span> de vida!
            </p>
          )}
        </div>

        {/* --- STATUS ATUAL (SOL OU TEMPESTADE) --- */}
        {semanaAtual ? (
          <div className="space-y-4">
            
            {/* Card de Clima Emocional */}
            <div className={`rounded-2xl p-5 border text-center shadow-sm ${
              saltoAtual 
                ? 'bg-[#FFF2F4] border-[#F0657D]/30 text-slate-800 dark:bg-slate-800' 
                : 'bg-emerald-50 border-emerald-200 text-slate-800 dark:bg-slate-800'
            }`}>
              {saltoAtual ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-pink-100 text-[#F0657D] rounded-full flex items-center justify-center mx-auto">
                    <CloudRain className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] bg-[#F0657D] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Fase Salto de Desenvolvimento
                  </span>
                  <h2 className="text-xl font-bold text-[#F0657D]">{saltoAtual.titulo}</h2>
                  <p className="text-xs opacity-80 leading-relaxed">{saltoAtual.descricao}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-[#2D7A1E] rounded-full flex items-center justify-center mx-auto">
                    <Sun className="w-7 h-7 text-amber-500" />
                  </div>
                  <span className="text-[10px] bg-[#2D7A1E] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Fase Sol (Consolidação)
                  </span>
                  <h2 className="text-xl font-bold text-[#2D7A1E]">Semanas de Calmaria</h2>
                  <p className="text-xs opacity-80 leading-relaxed">
                    O bebê está consolidando as novas habilidades aprendidas. Aproveite para praticar bastante interação e rotina calma.
                  </p>
                  {proximoSaltoSemana && (
                    <p className="text-[11px] font-semibold text-slate-500 pt-1">
                      📅 Próximo salto previsto para a <strong>{proximoSaltoSemana}ª semana</strong>.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Detalhes das Habilidades e Dicas */}
            {saltoAtual && (
              <div className="space-y-3">
                {/* Sinais Comuns */}
                <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
                  <h3 className="text-xs font-bold text-[#F0657D] mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Comportamentos Esperados (Fase Crise):
                  </h3>
                  <ul className="space-y-1.5">
                    {saltoAtual.sinais.map((sinal, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2 opacity-80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F0657D]"></span>
                        {sinal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Habilidades Adquiridas */}
                <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
                  <h3 className="text-xs font-bold text-[#2D7A1E] mb-2 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" /> O que o cérebro dele está aprendendo:
                  </h3>
                  <ul className="space-y-1.5">
                    {saltoAtual.habilidades.map((hab, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2 opacity-80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2D7A1E] shrink-0" />
                        {hab}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gota de Acolhimento */}
                <div className="rounded-2xl p-4 bg-[#FFF2F4] border border-pink-200 dark:bg-slate-800 dark:border-slate-700 space-y-1">
                  <p className="text-xs font-bold text-[#F0657D] flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-[#F0657D]" /> Dica de Sobrevivência para a Mãe:
                  </p>
                  <p className="text-xs italic opacity-90 leading-relaxed">
                    "{saltoAtual.dicas}"
                  </p>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className={`rounded-2xl p-6 text-center border shadow-sm ${cardClasses}`}>
            <Sparkles className="w-8 h-8 text-[#F0657D] mx-auto mb-2" />
            <h3 className="font-bold text-sm mb-1">Insira a data do bebê acima</h3>
            <p className="text-xs opacity-70">
              Vamos calcular exatamente em qual salto ou fase de crescimento seu bebê se encontra hoje.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
