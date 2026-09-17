'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, Sparkles, Flame, Play, Pause, SkipForward, 
  RotateCcw, CheckCircle2, Droplet, Sun, Moon, Volume2, 
  VolumeX, ShieldCheck, Smile, Calendar, Award, ArrowLeft
} from 'lucide-react';

export default function MaeEmFormaApp() {
  const [darkMode, setDarkMode] = useState(false);

  // --- 1. ESTADOS DE STREAK E HÁBITOS ---
  const [streak, setStreak] = useState(0);
  const [historicoSemanal, setHistoricoSemanal] = useState({
    Dom: false, Seg: false, Ter: false, Qua: false, Qui: false, Sex: false, Sab: false
  });
  const [coposAgua, setCoposAgua] = useState(0);
  const [nivelEnergia, setNivelEnergia] = useState('normal'); // 'cansada' ou 'normal'
  const [treinoConcluidoHoje, setTreinoConcluidoHoje] = useState(false);

  // --- 2. BANCO DE DADOS DE TREINOS (5 a 10 min) ---
  const treinosDisponiveis = [
    {
      id: 'costas',
      titulo: 'Alívio de Dores nas Costas',
      subtitulo: 'Ideal pós-amamentação e colo',
      duracaoTotal: 5,
      duracaoMin: '5 min',
      cor: 'border-pink-200 bg-[#FFF2F4]',
      corTexto: 'text-[#F0657D]',
      categoria: 'postura',
      exercicios: [
        { nome: 'Postura Gato-Vaca (Cat-Cow)', duracao: 45, desc: 'Em quatro apoios, dobre e curve a coluna suavemente alinhando com a respiração.' },
        { nome: 'Alongamento Peitoral na Parede', duracao: 45, desc: 'Apoie o braço na parede e gire o corpo suavemente para abrir o peito.' },
        { nome: 'Rotação Torácica Deitada', duracao: 60, desc: 'Deitada de lado, abra o armário superior girando o tronco até o chão.' },
        { nome: 'Postura da Criança (Child’s Pose)', duracao: 60, desc: 'Ajoelhe-se, sente sobre os calcanhares e estique os braços à frente no chão.' }
      ]
    },
    {
      id: 'diastase',
      titulo: 'Recuperação de Diástase & Pélvis',
      subtitulo: 'Fortalecimento seguro sem abdominais',
      duracaoTotal: 8,
      duracaoMin: '8 min',
      cor: 'border-[#2D7A1E]/20 bg-[#2D7A1E]/5',
      corTexto: 'text-[#2D7A1E]',
      categoria: 'fortalecimento',
      exercicios: [
        { nome: 'Respiração Diafragmática (Abdominal)', duracao: 60, desc: 'Inspire expandindo a barriga e expire puxando o umbigo para dentro suavemente.' },
        { nome: 'Ponte Pélvica (Glute Bridge)', duracao: 45, desc: 'Deitada de costas, eleve o quadril soltando o ar e contraindo os glúteos.' },
        { nome: 'Ativação de Transverso com Pés', duracao: 45, desc: 'Tocando alternadamente o pontapé no chão mantendo o abdômen firme.' },
        { nome: 'Abdução de Quadril Deitada', duracao: 60, desc: 'Deitada de lado, eleve a perna devagar mantendo o tronco estável.' }
      ]
    },
    {
      id: 'energia',
      titulo: 'Despertar Matinal Express',
      subtitulo: 'Alongamento rápido para dar disposição',
      duracaoTotal: 4,
      duracaoMin: '4 min',
      cor: 'border-[#F0657D]/30 bg-pink-50',
      corTexto: 'text-[#F0657D]',
      categoria: 'energia',
      exercicios: [
        { nome: 'Rotação Suave de Ombros e Pescoço', duracao: 30, desc: 'Gire os ombros para trás e relaxe a tensão do pescoço.' },
        { nome: 'Alongamento Lateral de Tronco', duracao: 45, desc: 'Eleve um braço e incline o corpo suavemente para o lado oposto.' },
        { nome: 'Agachamento Leve com Apoio', duracao: 45, desc: 'Segurando na cadeira, dobre os joelhos levemente mantendo a postura reto.' },
        { nome: 'Respiração Profunda de Despertar', duracao: 30, desc: 'Eleve os braços ao inspirar e solte todo o ar relaxando os braços.' }
      ]
    }
  ];

  // --- 3. PLAYER DE TREINO ---
  const [treinoAtivo, setTreinoAtivo] = useState(null);
  const [exercicioAtualIndex, setExercicioAtualIndex] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [somFundo, setSomFundo] = useState(false);
  const [modalConcluido, setModalConcluido] = useState(false);

  // Carregar dados locais
  useEffect(() => {
    const savedStreak = localStorage.getItem('mf_streak');
    if (savedStreak) setStreak(parseInt(savedStreak));

    const savedHistorico = localStorage.getItem('mf_historico');
    if (savedHistorico) setHistoricoSemanal(JSON.parse(savedHistorico));

    const savedAgua = localStorage.getItem('mf_agua');
    if (savedAgua) setCoposAgua(parseInt(savedAgua));
  }, []);

  // Salvar no localStorage
  useEffect(() => { localStorage.setItem('mf_streak', streak.toString()); }, [streak]);
  useEffect(() => { localStorage.setItem('mf_historico', JSON.stringify(historicoSemanal)); }, [historicoSemanal]);
  useEffect(() => { localStorage.setItem('mf_agua', coposAgua.toString()); }, [coposAgua]);

  // Lógica do Cronômetro
  useEffect(() => {
    let timer = null;
    if (isPlaying && tempoRestante > 0) {
      timer = setInterval(() => setTempoRestante((prev) => prev - 1), 1000);
    } else if (isPlaying && tempoRestante === 0 && treinoAtivo) {
      // Avança para o próximo exercício
      if (exercicioAtualIndex < treinoAtivo.exercicios.length - 1) {
        const prox = exercicioAtualIndex + 1;
        setExercicioAtualIndex(prox);
        setTempoRestante(treinoAtivo.exercicios[prox].duracao);
      } else {
        // Treino Finalizado!
        finalizarTreino();
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, tempoRestante, exercicioAtualIndex, treinoAtivo]);

  const iniciarTreino = (treino) => {
    setTreinoAtivo(treino);
    setExercicioAtualIndex(0);
    setTempoRestante(treino.exercicios[0].duracao);
    setIsPlaying(true);
  };

  const finalizarTreino = () => {
    setIsPlaying(false);
    setTreinoConcluidoHoje(true);
    setModalConcluido(true);

    // Atualiza Streak e Calendário
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const diaHoje = dias[new Date().getDay()];
    
    setHistoricoSemanal((prev) => ({ ...prev, [diaHoje]: true }));
    setStreak((prev) => prev + 1);
  };

  const fecharPlayer = () => {
    setTreinoAtivo(null);
    setIsPlaying(false);
  };

  const registrarRepousoConsciente = () => {
    setTreinoConcluidoHoje(true);
    alert("Descanso também é autocuidado! Sua ofensiva está protegida por hoje. 💖");
  };

  const themeClasses = darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#FFFDF9] text-slate-800';
  const cardClasses = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100';

  return (
    <div className={`min-h-screen pb-12 transition-colors ${themeClasses}`}>
      
      {/* Top Bar com Logo */}
      <header className={`p-4 sticky top-0 z-10 flex items-center justify-between border-b shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-[#F0657D] leading-none">Mãe em Forma</h1>
            <p className="text-[10px] text-[#2D7A1E] font-semibold mt-0.5">Bem-Estar & Autocuidado Pós-Parto</p>
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

        {/* --- STREAK & CALENDÁRIO SEMANAL --- */}
        <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-slate-700 text-[#F0657D]">
                <Flame className="w-5 h-5 fill-[#F0657D]" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#F0657D]">{streak} {streak === 1 ? 'dia' : 'dias'}</span>
                <p className="text-[10px] opacity-70">Ofensiva de Autocuidado</p>
              </div>
            </div>

            <button
              onClick={registrarRepousoConsciente}
              className="text-[10px] bg-emerald-50 text-[#2D7A1E] font-bold px-2.5 py-1 rounded-full border border-emerald-200 dark:bg-slate-700 dark:border-slate-600"
            >
              🌿 Repouso Consciente
            </button>
          </div>

          {/* Dias da Semana */}
          <div className="grid grid-cols-7 gap-1 pt-2 border-t border-slate-100 dark:border-slate-700 text-center">
            {Object.keys(historicoSemanal).map((dia) => (
              <div key={dia} className="flex flex-col items-center">
                <span className="text-[10px] font-semibold opacity-60 mb-1">{dia}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  historicoSemanal[dia] 
                    ? 'bg-[#2D7A1E] text-white shadow-sm' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                }`}>
                  {historicoSemanal[dia] ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FILTRO DE ENERGIA DA MÃE --- */}
        <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
          <p className="text-xs font-bold mb-2 flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-[#F0657D]" /> Como está sua energia hoje?
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setNivelEnergia('cansada')}
              className={`p-2.5 rounded-xl border font-medium text-center transition ${
                nivelEnergia === 'cansada' 
                  ? 'bg-[#FFF2F4] border-[#F0657D] text-[#F0657D]' 
                  : 'border-slate-100 dark:border-slate-700'
              }`}
            >
              😴 Pouca Energia (Leve)
            </button>

            <button
              onClick={() => setNivelEnergia('normal')}
              className={`p-2.5 rounded-xl border font-medium text-center transition ${
                nivelEnergia === 'normal' 
                  ? 'bg-emerald-50 border-[#2D7A1E] text-[#2D7A1E] dark:bg-slate-700' 
                  : 'border-slate-100 dark:border-slate-700'
              }`}
            >
              🔋 Disposta (Normal)
            </button>
          </div>
        </div>

        {/* --- LISTA DE TREINOS EXPRESS --- */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm">Treinos Express (5 a 10 min)</h2>
            <span className="text-[10px] bg-pink-100 dark:bg-slate-700 text-[#F0657D] font-bold px-2 py-0.5 rounded-full">
              Pós-Parto Seguro
            </span>
          </div>

          {treinosDisponiveis
            .filter(t => nivelEnergia === 'cansada' ? t.duracaoTotal <= 5 : true)
            .map((treino) => (
              <div 
                key={treino.id}
                className={`rounded-2xl p-4 border shadow-sm transition hover:shadow-md ${treino.cor} ${darkMode ? 'dark:bg-slate-800 dark:border-slate-700' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {treino.duracaoMin} • {treino.exercicios.length} exercícios
                    </span>
                    <h3 className={`font-bold text-base ${treino.corTexto}`}>{treino.titulo}</h3>
                    <p className="text-xs opacity-75">{treino.subtitulo}</p>
                  </div>

                  <button
                    onClick={() => iniciarTreino(treino)}
                    className="bg-[#F0657D] hover:bg-[#d9536a] text-white p-3 rounded-xl font-bold text-xs shadow-md flex items-center gap-1 shrink-0"
                  >
                    <Play className="w-4 h-4 fill-white" /> Iniciar
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* --- MARCADOR DE ÁGUA --- */}
        <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Droplet className="text-blue-500 w-5 h-5 fill-blue-500" />
              <h3 className="font-bold text-xs">Hidratação na Amamentação</h3>
            </div>
            <span className="text-xs font-bold text-blue-600">{coposAgua} / 8 copos</span>
          </div>

          <button
            onClick={() => setCoposAgua(coposAgua + 1)}
            className="w-full bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-300 py-2.5 rounded-xl font-bold text-xs border border-blue-100 dark:border-slate-600 flex justify-center items-center gap-1"
          >
            +1 Copo de Água (250ml)
          </button>
        </div>

        {/* Avisos de Segurança Médica */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 text-[11px] text-amber-800 dark:text-amber-200">
          <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600" />
          <p>Lembre-se de ter a liberação do seu obstetra para a prática de exercícios no pós-parto.</p>
        </div>

      </main>

      {/* --- PLAYER DE TREINO EM MODAL OVERLAY --- */}
      {treinoAtivo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-between p-6 text-white">
          {/* Header do Player */}
          <div className="flex justify-between items-center">
            <button onClick={fecharPlayer} className="p-2 rounded-full bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-300">
              {exercicioAtualIndex + 1} de {treinoAtivo.exercicios.length}
            </span>
            <button onClick={() => setSomFundo(!somFundo)} className="p-2 rounded-full bg-white/20">
              {somFundo ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 opacity-60" />}
            </button>
          </div>

          {/* Display Principal */}
          <div className="text-center space-y-4 my-auto">
            <span className="text-6xl font-mono font-bold text-pink-400">{tempoRestante}s</span>
            
            <h2 className="text-2xl font-bold">{treinoAtivo.exercicios[exercicioAtualIndex].nome}</h2>
            <p className="text-sm opacity-80 max-w-xs mx-auto leading-relaxed bg-white/10 p-4 rounded-2xl border border-white/10">
              {treinoAtivo.exercicios[exercicioAtualIndex].desc}
            </p>

            {somFundo && (
              <p className="text-[10px] text-emerald-300 animate-pulse">
                🎶 Som suave de relaxamento ativado...
              </p>
            )}
          </div>

          {/* Controles do Player */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 bg-[#F0657D] rounded-full text-white shadow-lg transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
            </button>

            <button 
              onClick={() => {
                if (exercicioAtualIndex < treinoAtivo.exercicios.length - 1) {
                  const prox = exercicioAtualIndex + 1;
                  setExercicioAtualIndex(prox);
                  setTempoRestante(treinoAtivo.exercicios[prox].duracao);
                } else {
                  finalizarTreino();
                }
              }}
              className="p-3 bg-white/20 rounded-full text-white"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL DE CONQUISTA / GOTA DE AFETO --- */}
      {modalConcluido && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-pink-100">
            <div className="w-16 h-16 bg-[#FFF2F4] text-[#F0657D] rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Você Conseguiu! 💖</h2>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-pink-50 dark:bg-slate-700/50 p-3 rounded-xl">
              "Você dedicou esses minutos para o seu corpo e sua mente hoje. Cuidar de você também é cuidar do seu bebê."
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setModalConcluido(false);
                  setTreinoAtivo(null);
                }}
                className="w-full bg-[#F0657D] text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Voltar para o Início
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
