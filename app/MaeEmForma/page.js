'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Sparkles, Heart, Trophy, ArrowLeft } from 'lucide-react';

export default function MaeEmFormaApp() {
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [tempo, setTempo] = useState(30);
  const [emExecucao, setEmExecucao] = useState(false);
  const [audioAtivo, setAudioAtivo] = useState(true);
  const [treinoConcluido, setTreinoConcluido] = useState(false);

  const exercicios = [
    {
      id: 1,
      nome: "Ativação do Transverso (Barriga de Vácuo)",
      tempo: 30,
      foco: "Diástase e Assoalho Pélvico",
      postura: "Deitada de costas, joelhos dobrados",
      instrucoes: "Puxe o ar pelo nariz expandindo as costelas. Solte todo o ar pela boca e 'puxe o umbigo em direção às costas'.",
      estimulo: "Excelente! Sinta o abdômen abraçando o seu bebê!",
      tipoIlustracao: "deitada-abdómen"
    },
    {
      id: 2,
      nome: "Ponte Pélvica com Elevação",
      tempo: 40,
      foco: "Glúteos e Postura Lombo-Pélvica",
      postura: "Deitada, pés apoiados no chão",
      instrucoes: "Eleve o quadril soltando o ar e apertando o bumbum. Volte devagar sem encostar no chão.",
      estimulo: "Força nas pernas! Você é forte e capaz!",
      tipoIlustracao: "ponte"
    },
    {
      id: 3,
      nome: "Cat-Cow (Gato e Vaca Suave)",
      tempo: 45,
      foco: "Alívio de Dores nas Costas (Amamentação)",
      postura: "Quatro apoios (mãos e joelhos)",
      instrucoes: "Arredonde as costas para cima como um gato, depois olhe para a frente suavemente alinhando a coluna.",
      estimulo: "Respire fundo... libere toda a tensão dos ombros.",
      tipoIlustracao: "quatro-apoios"
    },
    {
      id: 4,
      nome: "Agachamento Guiado na Cadeira",
      tempo: 40,
      foco: "Fortalecimento das Pernas e Colo",
      postura: "Pés na largura dos ombros, braços à frente",
      instrucoes: "Sente-se quase encostando na cadeira e suba empurrando o chão pelos calcanhares.",
      estimulo: "Reta final! Cada segundo é um cuidado com você!",
      tipoIlustracao: "agachamento"
    }
  ];

  const ex = exercicios[exercicioAtual];

  // Voz Guiada (Web Speech API)
  const falar = (texto) => {
    if (!audioAtivo || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; 
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  // Timer e automação de áudio
  useEffect(() => {
    let interval = null;
    if (emExecucao && tempo > 0) {
      interval = setInterval(() => setTempo((t) => t - 1), 1000);
    } else if (tempo === 0 && emExecucao) {
      if (exercicioAtual < exercicios.length - 1) {
        falar(`Muito bem! Agora descanse e prepare-se para: ${exercicios[exercicioAtual + 1].nome}`);
        setExercicioAtual((prev) => prev + 1);
        setTempo(exercicios[exercicioAtual + 1].tempo);
      } else {
        setEmExecucao(false);
        setTreinoConcluido(true);
        falar("Parabéns, mamãe! Treino concluído com sucesso. Você cuidou do seu corpo e da sua mente hoje!");
      }
    }
    return () => clearInterval(interval);
  }, [emExecucao, tempo]);

  const iniciarTreino = () => {
    setEmExecucao(true);
    falar(`Vamos começar! Primeiro exercício: ${ex.nome}. ${ex.instrucoes}`);
  };

  const pausarTreino = () => {
    setEmExecucao(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const reiniciarTreino = () => {
    setEmExecucao(false);
    setExercicioAtual(0);
    setTempo(exercicios[0].tempo);
    setTreinoConcluido(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 pb-12">
      {/* Header */}
      <header className="p-4 bg-white border-b border-pink-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-9 w-9 object-contain" />
          <div>
            <h1 className="text-base font-bold text-[#F0657D] leading-none">Mãe em Forma</h1>
            <p className="text-[10px] text-[#2D7A1E] font-semibold mt-0.5">Treino Pós-Parto Guiado</p>
          </div>
        </div>

        <button 
          onClick={() => { setAudioAtivo(!audioAtivo); if (audioAtivo && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }}
          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border ${
            audioAtivo ? 'bg-pink-50 text-[#F0657D] border-pink-200' : 'bg-slate-100 text-slate-400 border-slate-200'
          }`}
        >
          {audioAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">{audioAtivo ? 'Voz On' : 'Voz Off'}</span>
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-4">

        {!treinoConcluido ? (
          <>
            {/* Ilustração do Exercício */}
            <div className="bg-gradient-to-b from-pink-50 to-pink-100/40 rounded-3xl p-6 border border-pink-200/60 text-center relative overflow-hidden shadow-sm">
              <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-[#F0657D] px-2.5 py-1 rounded-full text-[10px] font-bold border border-pink-100">
                {exercicioAtual + 1} de {exercicios.length}
              </span>

              {/* Design Ilustrativo */}
              <div className="w-32 h-32 mx-auto my-2 flex items-center justify-center relative">
                <div className={`absolute inset-0 bg-pink-200/50 rounded-full ${emExecucao ? 'animate-ping opacity-30' : ''}`}></div>
                
                {/* SVG Ilustrativo da Posição */}
                <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-pink-200 flex flex-col items-center justify-center p-2 relative z-10">
                  {ex.tipoIlustracao === 'deitada-abdómen' && (
                    <div className="space-y-1 text-center">
                      <div className="w-12 h-2.5 bg-[#F0657D] rounded-full mx-auto"></div>
                      <div className="w-6 h-6 border-2 border-[#2D7A1E] rounded-full mx-auto animate-pulse"></div>
                      <span className="text-[9px] font-bold text-slate-500 block">Deitada + Respiração</span>
                    </div>
                  )}

                  {ex.tipoIlustracao === 'ponte' && (
                    <div className="space-y-1 text-center">
                      <div className="w-12 h-3 bg-[#F0657D] rounded-t-xl mx-auto transform -rotate-12"></div>
                      <span className="text-[9px] font-bold text-slate-500 block">Elevação de Quadril</span>
                    </div>
                  )}

                  {ex.tipoIlustracao === 'quatro-apoios' && (
                    <div className="space-y-1 text-center">
                      <div className="w-10 h-2 bg-[#2D7A1E] rounded-full mx-auto"></div>
                      <div className="w-12 h-2 bg-[#F0657D] rounded-full mx-auto mt-1"></div>
                      <span className="text-[9px] font-bold text-slate-500 block">4 Apoios</span>
                    </div>
                  )}

                  {ex.tipoIlustracao === 'agachamento' && (
                    <div className="space-y-1 text-center">
                      <div className="w-5 h-5 border-2 border-[#F0657D] rounded-full mx-auto"></div>
                      <div className="w-8 h-4 bg-[#2D7A1E] rounded-b-lg mx-auto"></div>
                      <span className="text-[9px] font-bold text-slate-500 block">Sentar & Levantar</span>
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-base font-bold text-slate-800 mt-2">{ex.nome}</h2>
              <p className="text-xs text-[#2D7A1E] font-semibold">{ex.foco}</p>
            </div>

            {/* Cronômetro e Controles */}
            <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm text-center space-y-3">
              <div className="text-4xl font-black text-[#F0657D] tracking-tight">
                {tempo} <span className="text-xs font-bold text-slate-400">seg</span>
              </div>

              <div className="flex justify-center gap-3">
                {!emExecucao ? (
                  <button 
                    onClick={iniciarTreino}
                    className="bg-[#F0657D] text-white px-6 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-pink-600 transition"
                  >
                    <Play className="w-4 h-4 fill-white" /> Iniciar com Voz
                  </button>
                ) : (
                  <button 
                    onClick={pausarTreino}
                    className="bg-amber-500 text-white px-6 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-600 transition"
                  >
                    <Pause className="w-4 h-4 fill-white" /> Pausar
                  </button>
                )}

                <button 
                  onClick={reiniciarTreino}
                  className="bg-slate-100 text-slate-600 p-2.5 rounded-2xl font-bold text-xs hover:bg-slate-200 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instruções e Frase de Estímulo */}
            <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-[#F0657D] uppercase tracking-wide block">Como Fazer:</span>
              <p className="text-xs text-slate-600 leading-relaxed">{ex.instrucoes}</p>
              
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-start gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-[#2D7A1E] shrink-0 mt-0.5" />
                <p className="text-[11px] font-semibold text-[#2D7A1E]">{ex.estimulo}</p>
              </div>
            </div>
          </>
        ) : (
          /* Tela de Treino Concluído */
          <div className="bg-white rounded-3xl p-6 border border-pink-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#2D7A1E]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F0657D]">Treino Concluído!</h2>
              <p className="text-xs text-slate-600 mt-1">Você é incrível, mamãe! Mais um dia de autocuidado garantido.</p>
            </div>
            <button 
              onClick={reiniciarTreino}
              className="w-full bg-[#2D7A1E] text-white py-3 rounded-2xl text-xs font-bold shadow-md"
            >
              Fazer Novo Treino
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
