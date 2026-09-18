'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  // --- 2. BANCO DE DADOS DE TREINOS COM VOZ GUIADA PASSO A PASSO ---
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
        { 
          nome: 'Postura Gato-Vaca (Cat-Cow)', 
          duracao: 45, 
          desc: 'Em quatro apoios, dobre e curve a coluna suavemente alinhando com a respiração.',
          falaInstrucao: 'Fique na posição de quatro apoios, com as mãos no chão alinhadas aos ombros e os joelhos abaixo do quadril. Ao inspirar, olhe suavemente para a frente e empine um pouco o bumbum. Ao soltar o ar, arredonde bem as costas para cima, levando o queixo em direção ao peito como um gato. Respire no seu ritmo com calma.'
        },
        { 
          nome: 'Alongamento Peitoral na Parede', 
          duracao: 45, 
          desc: 'Apoie o braço na parede e gire o corpo suavemente para abrir o peito.',
          falaInstrucao: 'Fique em pé ao lado de uma parede. Apoie o antebraço direito na parede na altura do ombro. Agora, gire suavemente o seu corpo para o lado esquerdo até sentir abrir o peito. Mantenha os ombros relaxados e continue respirando fundo.'
        },
        { 
          nome: 'Rotação Torácica Deitada', 
          duracao: 60, 
          desc: 'Deitada de lado, abra o armário superior girando o tronco até o chão.',
          falaInstrucao: 'Deite-se de lado com os joelhos dobrados, um sobre o outro. Estique os dois braços para a frente na altura do peito, juntando as palmas das mãos. Inspire e abra o braço de cima, levando-o para o outro lado até tocar o chão, abrindo o peito. Volte devagar e repita o movimento.'
        },
        { 
          nome: 'Postura da Criança (Child’s Pose)', 
          duracao: 60, 
          desc: 'Ajoelhe-se, sente sobre os calcanhares e estique os braços à frente no chão.',
          falaInstrucao: 'Ajoelhe-se no chão, afaste ligeiramente os joelhos e sente-se sobre os calcanhares. Estique os dois braços bem à frente no chão e apoie a testa na almofada ou no chão. Solte todo o peso do corpo, relaxe os ombros e apenas sinta a sua respiração.'
        }
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
        { 
          nome: 'Respiração Diafragmática (Abdominal)', 
          duracao: 60, 
          desc: 'Inspire expandindo a barriga e expire puxando o umbigo para dentro suavemente.',
          falaInstrucao: 'Deite-se de costas com os joelhos dobrados e os pés apoiados no chão. Coloque as mãos sobre a barriga. Inspire pelo nariz expandindo suavemente o abdómen. Ao soltar todo o ar pela boca, imagine que está a abraçar o seu bebê com o umbigo, puxando-o levemente para dentro e para cima.'
        },
        { 
          nome: 'Ponte Pélvica (Glute Bridge)', 
          duracao: 45, 
          desc: 'Deitada de costas, eleve o quadril soltando o ar e contraindo os glúteos.',
          falaInstrucao: 'Continue deitada de costas com os joelhos dobrados. Mantenha os braços ao lado do corpo. Ao soltar o ar, aperte os glúteos e eleve o quadril até formar uma linha reta do joelho ao ombro. Desça devagar apoiando vértebra por vértebra no chão.'
        },
        { 
          nome: 'Ativação de Transverso com Pés', 
          duracao: 45, 
          desc: 'Tocando alternadamente a ponta do pé no chão mantendo o abdômen firme.',
          falaInstrucao: 'Deitada de costas, eleve as pernas num ângulo de noventa graus. Mantenha o abdómen bem ativo. Solte o ar e toque com a ponta do pé direito suavemente no chão. Volte à posição inicial e repita o toque com a ponta do pé esquerdo, sem deixar as costas descolarem do chão.'
        },
        { 
          nome: 'Abdução de Quadril Deitada', 
          duracao: 60, 
          desc: 'Deitada de lado, eleve a perna devagar mantendo o tronco estável.',
          falaInstrucao: 'Deite-se totalmente de lado, mantendo o corpo alinhado e a cabeça apoiada no braço. Deixe a perna de baixo ligeiramente dobrada. Eleve a perna de cima devagar sem girar o quadril e desça sem encostar totalmente. Faça o movimento focado no glúteo com controle.'
        }
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
        { 
          nome: 'Rotação Suave de Ombros e Pescoço', 
          duracao: 30, 
          desc: 'Gire os ombros para trás e relaxe a tensão do pescoço.',
          falaInstrucao: 'Sente-se numa posição confortável ou fique em pé. Rode os ombros para trás num movimento amplo e relaxante. Em seguida, incline suavemente a cabeça para o lado direito e depois para o esquerdo, soltando toda a tensão acumulada na região do pescoço.'
        },
        { 
          nome: 'Alongamento Lateral de Tronco', 
          duracao: 45, 
          desc: 'Eleve um braço e incline o corpo suavemente para o lado oposto.',
          falaInstrucao: 'Em pé, com os pés afastados na largura dos ombros, eleve o braço direito em direção ao teto. Incline o tronco suavemente para o lado esquerdo até sentir alongar a lateral do corpo. Mantenha a respiração fluida e depois inverta o lado.'
        },
        { 
          nome: 'Agachamento Leve com Apoio', 
          duracao: 45, 
          desc: 'Segurando na cadeira, dobre os joelhos levemente mantendo a postura reta.',
          falaInstrucao: 'Posicione-se em frente a uma cadeira segura ou mesa e apoie as mãos levemente. Afaste os pés, solte o ar e dobre os joelhos como se fosse sentar-se num banco, mantendo o peito aberto e os calcanhares bem firmes no chão. Suba empurrando o chão.'
        },
        { 
          nome: 'Respiração Profunda de Despertar', 
          duracao: 30, 
          desc: 'Eleve os braços ao inspirar e solte todo o ar relaxando os braços.',
          falaInstrucao: 'Para terminar, fique bem ereta. Inspire fundo pelo nariz elevando os dois braços ao longo do corpo até acima da cabeça. Solte todo o ar pela boca com energia, trazendo os braços para baixo. Sinta a vitalidade a renovar-se!'
        }
      ]
    }
  ];

  // --- 3. PLAYER DE TREINO & SISTEMA DE VOZ ---
  const [treinoAtivo, setTreinoAtivo] = useState(null);
  const [exercicioAtualIndex, setExercicioAtualIndex] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAtivo, setAudioAtivo] = useState(true);
  const [modalConcluido, setModalConcluido] = useState(false);

  const audioRef = useRef(null);

  // Função de Voz Sintetizada (Web Speech API)
  const falarGuia = (texto) => {
    if (!audioAtivo || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Para qualquer áudio em andamento
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.92; // Velocidade acolhedora e explicativa
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

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

  // Lógica do Cronômetro + Voz Guiada Contínua
  useEffect(() => {
    let timer = null;
    if (isPlaying && tempoRestante > 0) {
      timer = setInterval(() => setTempoRestante((prev) => prev - 1), 1000);
    } else if (isPlaying && tempoRestante === 0 && treinoAtivo) {
      // Avança para o próximo exercício
      if (exercicioAtualIndex < treinoAtivo.exercicios.length - 1) {
        const proxIndex = exercicioAtualIndex + 1;
        const proxExercicio = treinoAtivo.exercicios[proxIndex];
        
        setExercicioAtualIndex(proxIndex);
        setTempoRestante(proxExercicio.duracao);
        
        // Narração automática do próximo exercício
        falarGuia(`Excelente! Agora vamos para: ${proxExercicio.nome}. ${proxExercicio.falaInstrucao}`);
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
    const primeiroEx = treino.exercicios[0];
    setTempoRestante(primeiroEx.duracao);
    setIsPlaying(true);

    // Fala as instruções iniciais completas
    falarGuia(`Vamos começar o treino ${treino.titulo}. Primeiro exercício: ${primeiroEx.nome}. ${primeiroEx.falaInstrucao}`);
  };

  const pausarOuRetomar = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      const exAtual = treinoAtivo.exercicios[exercicioAtualIndex];
      falarGuia(`Continuando: ${exAtual.nome}. ${exAtual.falaInstrucao}`);
    }
  };

  const proximoExercicio = () => {
    if (!treinoAtivo) return;
    if (exercicioAtualIndex < treinoAtivo.exercicios.length - 1) {
      const proxIndex = exercicioAtualIndex + 1;
      const proxExercicio = treinoAtivo.exercicios[proxIndex];
      setExercicioAtualIndex(proxIndex);
      setTempoRestante(proxExercicio.duracao);
      falarGuia(`Avançando para: ${proxExercicio.nome}. ${proxExercicio.falaInstrucao}`);
    } else {
      finalizarTreino();
    }
  };

  const finalizarTreino = () => {
    setIsPlaying(false);
    setTreinoConcluidoHoje(true);
    setModalConcluido(true);

    falarGuia("Parabéns, mamãe! Treino concluído com sucesso. Você dedicou este tempo precioso para cuidar da sua saúde e do seu bem-estar!");

    // Atualiza Streak e Calendário
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const diaHoje = dias[new Date().getDay()];
    
    setHistoricoSemanal((prev) => ({ ...prev, [diaHoje]: true }));
    setStreak((prev) => prev + 1);
  };

  const fecharPlayer = () => {
    setTreinoAtivo(null);
    setIsPlaying(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const registrarRepousoConsciente = () => {
    setTreinoConcluidoHoje(true);
    falarGuia("O descanso também é parte do seu autocuidado. Sua sequência de dias está garantida por hoje!");
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-6 text-white overflow-y-auto">
          {/* Header do Player */}
          <div className="flex justify-between items-center">
            <button onClick={fecharPlayer} className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-300">
              {exercicioAtualIndex + 1} de {treinoAtivo.exercicios.length}
            </span>
            <button 
              onClick={() => {
                const novoEstado = !audioAtivo;
                setAudioAtivo(novoEstado);
                if (!novoEstado && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                } else {
                  falarGuia(treinoAtivo.exercicios[exercicioAtualIndex].falaInstrucao);
                }
              }} 
              className={`p-2 rounded-full ${audioAtivo ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40' : 'bg-white/20 opacity-60'}`}
            >
              {audioAtivo ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          {/* Display Principal */}
          <div className="text-center space-y-4 my-auto py-4">
            <span className="text-6xl font-mono font-black text-pink-400 tracking-tight">{tempoRestante}s</span>
            
            <h2 className="text-2xl font-bold">{treinoAtivo.exercicios[exercicioAtualIndex].nome}</h2>
            
            {/* Instrução Detalhada em Texto & Guiada em Áudio */}
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 max-w-xs mx-auto space-y-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Instrução Guiada por Voz:
              </span>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                {treinoAtivo.exercicios[exercicioAtualIndex].falaInstrucao}
              </p>
            </div>

            {audioAtivo && (
              <p className="text-[10px] text-emerald-300 animate-pulse flex items-center justify-center gap-1">
                <Volume2 className="w-3 h-3" /> Voz guiada ativa para você acompanhar sem olhar o ecrã
              </p>
            )}
          </div>

          {/* Controles do Player */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <button 
              onClick={pausarOuRetomar}
              className="p-5 bg-[#F0657D] hover:bg-pink-600 rounded-full text-white shadow-lg transform active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
            </button>

            <button 
              onClick={proximoExercicio}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL DE CONQUISTA --- */}
      {modalConcluido && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-pink-100">
            <div className="w-16 h-16 bg-[#FFF2F4] text-[#F0657D] rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Você Conseguiu! 💖</h2>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-pink-50 dark:bg-slate-700/50 p-3 rounded-xl">
              "Você dedicou estes minutos para o seu corpo e para a sua mente hoje. Cuidar de si também é cuidar do seu bebê."
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
