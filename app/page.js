'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, DollarSign, ShoppingBag, 
  Baby, CheckCircle2, Plus, Trash2, Utensils, Moon, 
  Sun, Phone, ShieldAlert, Sparkles, Download, FileText, 
  Smile, Coffee, Droplet, Sparkle
} from 'lucide-react';

export default function MaeECuidadoApp() {
  // --- 1. ESTADOS DE PWA E TEMA ---
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstallable(false);
    setDeferredPrompt(null);
  };

  // --- 2. ONBOARDING & PERFIL ---
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [userData, setUserData] = useState({
    nomeMae: '',
    nomeBabe: '',
    dataNascimento: '',
    tipoAlimentacao: 'amamentacao',
    faseDesenvolvimento: 'recem-nascido',
    telefonePediatra: '',
    alergias: '',
    tipoSanguineo: '',
    convenio: ''
  });

  const [activeTab, setActiveTab] = useState('inicio');

  // --- 3. DADOS COM PERSISTÊNCIA (localStorage) ---
  const [mamadas, setMamadas] = useState([]);
  const [registrosSono, setRegistrosSono] = useState([]);
  const [fraldas, setFraldas] = useState([]);
  const [alimentosIA, setAlimentosIA] = useState([]);
  const [listaCompras, setListaCompras] = useState([]);
  const [financas, setFinancas] = useState([]);
  const [desapegos, setDesapegos] = useState([]);

  // Estados de Autocuidado
  const [coposAgua, setCoposAgua] = useState(0);
  const [humorHoje, setHumorHoje] = useState('');
  const [vitaminaTomada, setVitaminaTomada] = useState(false);

  // Lista de Gotas de Afeto
  const gotasDeAfeto = [
    "As fases vão passar e o amor vai ficar. Você está indo muito bem!",
    "Respire fundo. Cuidar de você também é cuidar do seu bebê.",
    "Você não precisa dar conta de tudo hoje. Um dia de cada vez.",
    "O seu bebê não precisa de uma mãe perfeita, precisa de uma mãe presente e real.",
    "Seus braços são o lugar mais seguro do mundo para o seu filho.",
    "É normal sentir cansaço. A maternidade é intensa, acolha o seu tempo.",
    "Acredite no seu instinto. Ninguém conhece seu bebê melhor do que você."
  ];

  const [indiceFrase, setIndiceFrase] = useState(0);

  const proximaFraseAfeto = () => {
    setIndiceFrase((prev) => (prev + 1) % gotasDeAfeto.length);
  };

  // Carregar dados salvos ao abrir
  useEffect(() => {
    const savedUser = localStorage.getItem('mc_userData');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setOnboardingDone(true);
    }
    const load = (key, setter) => {
      const data = localStorage.getItem(key);
      if (data) setter(JSON.parse(data));
    };
    load('mc_mamadas', setMamadas);
    load('mc_sono', setRegistrosSono);
    load('mc_fraldas', setFraldas);
    load('mc_alimentos', setAlimentosIA);
    load('mc_compras', setListaCompras);
    load('mc_financas', setFinancas);
    load('mc_desapegos', setDesapegos);
    load('mc_agua', setCoposAgua);
    load('mc_humor', setHumorHoje);
    load('mc_vitamina', setVitaminaTomada);
  }, []);

  // Salvar dados quando houver alterações
  useEffect(() => {
    if (onboardingDone) localStorage.setItem('mc_userData', JSON.stringify(userData));
  }, [userData, onboardingDone]);

  useEffect(() => { localStorage.setItem('mc_mamadas', JSON.stringify(mamadas)); }, [mamadas]);
  useEffect(() => { localStorage.setItem('mc_sono', JSON.stringify(registrosSono)); }, [registrosSono]);
  useEffect(() => { localStorage.setItem('mc_fraldas', JSON.stringify(fraldas)); }, [fraldas]);
  useEffect(() => { localStorage.setItem('mc_alimentos', JSON.stringify(alimentosIA)); }, [alimentosIA]);
  useEffect(() => { localStorage.setItem('mc_compras', JSON.stringify(listaCompras)); }, [listaCompras]);
  useEffect(() => { localStorage.setItem('mc_financas', JSON.stringify(financas)); }, [financas]);
  useEffect(() => { localStorage.setItem('mc_desapegos', JSON.stringify(desapegos)); }, [desapegos]);
  useEffect(() => { localStorage.setItem('mc_agua', JSON.stringify(coposAgua)); }, [coposAgua]);
  useEffect(() => { localStorage.setItem('mc_humor', JSON.stringify(humorHoje)); }, [humorHoje]);
  useEffect(() => { localStorage.setItem('mc_vitamina', JSON.stringify(vitaminaTomada)); }, [vitaminaTomada]);

  // --- 4. CRONÔMETROS (Amamentação e Sono) ---
  const [sonoTimer, setSonoTimer] = useState(false);
  const [tempoSono, setTempoSono] = useState(0);

  const [mamadaTimer, setMamadaTimer] = useState(false);
  const [ladoAtualMamada, setLadoAtualMamada] = useState(null);
  const [tempoMamada, setTempoMamada] = useState(0);

  useEffect(() => {
    let interval = null;
    if (sonoTimer) {
      interval = setInterval(() => setTempoSono((prev) => prev + 1), 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [sonoTimer]);

  useEffect(() => {
    let interval = null;
    if (mamadaTimer) {
      interval = setInterval(() => setTempoMamada((prev) => prev + 1), 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [mamadaTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- 5. LÓGICA DE NEGÓCIO ---
  const ultimoLadoMamado = mamadas.length > 0 ? mamadas[0].lado : null;
  const proximoLadoSugerido = ultimoLadoMamado === 'Seio Esquerdo' ? 'Seio Direito' : 'Seio Esquerdo';

  const iniciarMamada = (lado) => {
    if (mamadaTimer && ladoAtualMamada === lado) {
      const novoRegistro = {
        id: Date.now(),
        lado,
        duracao: formatTime(tempoMamada),
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMamadas([novoRegistro, ...mamadas]);
      setMamadaTimer(false);
      setTempoMamada(0);
      setLadoAtualMamada(null);
    } else {
      setLadoAtualMamada(lado);
      setTempoMamada(0);
      setMamadaTimer(true);
    }
  };

  const toggleSono = () => {
    if (sonoTimer) {
      const agora = new Date();
      const novoRegistro = {
        id: Date.now(),
        duracao: formatTime(tempoSono),
        data: agora.toLocaleDateString(),
        horaFim: agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setRegistrosSono([novoRegistro, ...registrosSono]);
      setTempoSono(0);
    }
    setSonoTimer(!sonoTimer);
  };

  const addFralda = (tipo) => {
    const novoRegistro = {
      id: Date.now(),
      tipo,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFraldas([novoRegistro, ...fraldas]);
  };

  const exportarRelatorioPDF = () => {
    window.print();
  };

  // Formulários Locais
  const [novoAlimento, setNovoAlimento] = useState({ nome: '', aceitacao: 'ótima' });
  const [novoItemCompra, setNovoItemCompra] = useState('');
  const [novaFinanca, setNovaFinanca] = useState({ desc: '', valor: '' });
  const [novoDesapego, setNovoDesapego] = useState({ titulo: '', preco: '' });

  const handleCompleteOnboarding = (e) => {
    e.preventDefault();
    if (userData.nomeMae && userData.nomeBabe) setOnboardingDone(true);
  };

  // --- TELA DE ONBOARDING ---
  if (!onboardingDone) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center items-center p-6 text-slate-800">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-pink-100 flex flex-col items-center">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-20 w-20 object-contain mb-2" />
          <h1 className="text-2xl font-bold text-[#F0657D] text-center mb-1">Boas-vindas ao Mãe & Cuidado</h1>
          <p className="text-xs text-slate-500 text-center mb-4">Personalize para o dia a dia do seu bebê</p>

          <form onSubmit={handleCompleteOnboarding} className="w-full space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Seu Nome (Mãe)</label>
              <input 
                type="text" required value={userData.nomeMae}
                onChange={(e) => setUserData({ ...userData, nomeMae: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
                placeholder="Ex: Ana"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nome do Bebê</label>
              <input 
                type="text" required value={userData.nomeBabe}
                onChange={(e) => setUserData({ ...userData, nomeBabe: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
                placeholder="Ex: Leo"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Data Nascimento</label>
                <input 
                  type="date" required value={userData.dataNascimento}
                  onChange={(e) => setUserData({ ...userData, dataNascimento: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fase Atual</label>
                <select 
                  value={userData.faseDesenvolvimento}
                  onChange={(e) => setUserData({ ...userData, faseDesenvolvimento: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200"
                >
                  <option value="recem-nascido">0 a 3 meses</option>
                  <option value="bebe-jovem">3 a 6 meses</option>
                  <option value="introducao-alimentar">6 a 12 meses</option>
                  <option value="primeiros-passos">1 ano+</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="font-semibold text-slate-700">Cartão de Emergência & Saúde:</p>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" placeholder="Tipo Sanguíneo (Ex: O+)" value={userData.tipoSanguineo}
                  onChange={(e) => setUserData({ ...userData, tipoSanguineo: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200"
                />
                <input 
                  type="tel" placeholder="Tel. Pediatra" value={userData.telefonePediatra}
                  onChange={(e) => setUserData({ ...userData, telefonePediatra: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200"
                />
              </div>
              <input 
                type="text" placeholder="Alergias (Ex: Leite, Dipirona)" value={userData.alergias}
                onChange={(e) => setUserData({ ...userData, alergias: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-pink-200"
              />
              <input 
                type="text" placeholder="Convênio Médico / Nº SUS" value={userData.convenio}
                onChange={(e) => setUserData({ ...userData, convenio: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-pink-200"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#F0657D] text-white py-3 rounded-xl font-bold hover:bg-[#d9536a] transition shadow-md mt-3 text-sm"
            >
              Acessar Meu Espaço
            </button>
          </form>
        </div>
      </div>
    );
  }

  const themeClasses = darkMode 
    ? 'bg-slate-900 text-slate-100' 
    : 'bg-[#FFFDF9] text-slate-800';

  const cardClasses = darkMode 
    ? 'bg-slate-800 border-slate-700 text-slate-100' 
    : 'bg-white border-pink-100 text-slate-800';

  return (
    <div className={`min-h-screen pb-24 transition-colors ${themeClasses}`}>
      {/* Top Bar */}
      <header className={`p-4 sticky top-0 z-10 flex items-center justify-between border-b shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo Mãe & Cuidado" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-[#F0657D] leading-none">Mãe & Cuidado</h1>
            <p className="text-xs opacity-70 mt-0.5">{userData.nomeMae} & {userData.nomeBabe}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão Exportar PDF */}
          <button 
            onClick={exportarRelatorioPDF}
            className="p-2 rounded-full bg-pink-50 dark:bg-slate-700 text-[#F0657D] dark:text-pink-300 hover:opacity-80"
            title="Exportar Relatório PDF"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Botão Tema Escuro */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:opacity-80"
            title="Alternar Modo Noturno"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Botão de Instalação PWA */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 bg-[#F0657D] hover:bg-[#d9536a] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow animate-pulse"
            >
              <Download className="w-3.5 h-3.5" />
              Instalar
            </button>
          )}
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto space-y-6">
        {/* Banner de Emergência Rápida e Saúde */}
        <div className={`p-3.5 rounded-2xl border flex flex-col gap-2 text-xs ${darkMode ? 'bg-slate-800 border-rose-900/50' : 'bg-rose-50/70 border-rose-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">Cartão de Saúde</span>
            </div>
            {userData.tipoSanguineo && (
              <span className="bg-rose-500 text-white font-bold px-2 py-0.5 rounded-md text-[10px]">
                Sangue: {userData.tipoSanguineo}
              </span>
            )}
          </div>

          <div className="text-[11px] space-y-0.5 opacity-90">
            {userData.alergias && <p><span className="font-semibold text-rose-600 dark:text-rose-400">Alergias:</span> {userData.alergias}</p>}
            {userData.convenio && <p><span className="font-semibold text-slate-700 dark:text-slate-300">Plano/SUS:</span> {userData.convenio}</p>}
          </div>

          <div className="flex gap-2 pt-1 border-t border-rose-100 dark:border-slate-700/50">
            {userData.telefonePediatra && (
              <a 
                href={`tel:${userData.telefonePediatra}`} 
                className="flex-1 bg-emerald-600 text-white py-1.5 rounded-xl flex items-center justify-center gap-1 font-bold text-xs"
              >
                <Phone className="w-3 h-3" /> Lig. Pediatra
              </a>
            )}
            <a 
              href="tel:192" 
              className="flex-1 bg-rose-600 text-white py-1.5 rounded-xl flex items-center justify-center gap-1 font-bold text-xs"
            >
              Ligar 192 (SAMU)
            </a>
          </div>
        </div>

        {/* --- ABA INÍCIO --- */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            {/* Amamentação com Cronômetro e Sugestão */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Heart className="text-[#F0657D] w-5 h-5" />
                  <h2 className="font-bold">Amamentação</h2>
                </div>
                {ultimoLadoMamado && (
                  <span className="text-[10px] bg-pink-100 dark:bg-pink-900/40 text-[#F0657D] px-2.5 py-1 rounded-full font-semibold">
                    Sugestão: {proximoLadoSugerido}
                  </span>
                )}
              </div>

              {mamadaTimer && (
                <div className="text-center py-2 bg-pink-50 dark:bg-slate-700/50 rounded-xl mb-3 border border-pink-100 dark:border-slate-600">
                  <span className="text-2xl font-mono font-bold text-[#F0657D]">{formatTime(tempoMamada)}</span>
                  <p className="text-[10px] opacity-70">Mamando no {ladoAtualMamada}...</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button 
                  onClick={() => iniciarMamada('Seio Esquerdo')} 
                  className={`py-3 rounded-xl font-semibold border transition text-xs flex flex-col items-center ${
                    ladoAtualMamada === 'Seio Esquerdo' && mamadaTimer 
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse' 
                      : 'bg-pink-50 dark:bg-slate-700 text-[#F0657D] dark:text-pink-300 border-pink-200 dark:border-slate-600'
                  }`}
                >
                  <span>Seio Esquerdo</span>
                  <span className="text-[10px] opacity-75">
                    {ladoAtualMamada === 'Seio Esquerdo' && mamadaTimer ? 'Toque para Finalizar' : 'Iniciar'}
                  </span>
                </button>

                <button 
                  onClick={() => iniciarMamada('Seio Direito')} 
                  className={`py-3 rounded-xl font-semibold border transition text-xs flex flex-col items-center ${
                    ladoAtualMamada === 'Seio Direito' && mamadaTimer 
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse' 
                      : 'bg-pink-50 dark:bg-slate-700 text-[#F0657D] dark:text-pink-300 border-pink-200 dark:border-slate-600'
                  }`}
                >
                  <span>Seio Direito</span>
                  <span className="text-[10px] opacity-75">
                    {ladoAtualMamada === 'Seio Direito' && mamadaTimer ? 'Toque para Finalizar' : 'Iniciar'}
                  </span>
                </button>
              </div>

              {mamadas.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-1">
                  <h3 className="text-xs font-semibold opacity-70 mb-1">Últimas Mamadas:</h3>
                  {mamadas.slice(0, 3).map((m) => (
                    <div key={m.id} className="flex justify-between text-xs bg-slate-50 dark:bg-slate-700/40 p-2 rounded-lg">
                      <span className="font-medium">{m.lado}</span>
                      <span className="opacity-70">{m.duracao ? `${m.duracao} min` : ''} ({m.hora})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Registro de Fraldas */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Baby className="text-blue-500 w-5 h-5" />
                <h2 className="font-bold">Troca de Fraldas</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <button 
                  onClick={() => addFralda('💦 Xixi')}
                  className="bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300 p-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition"
                >
                  💦 Xixi
                </button>
                <button 
                  onClick={() => addFralda('💩 Cocô')}
                  className="bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-300 p-2.5 rounded-xl text-xs font-bold hover:bg-amber-100 transition"
                >
                  💩 Cocô
                </button>
                <button 
                  onClick={() => addFralda('✨ Ambos')}
                  className="bg-purple-50 dark:bg-slate-700 text-purple-600 dark:text-purple-300 p-2.5 rounded-xl text-xs font-bold hover:bg-purple-100 transition"
                >
                  ✨ Ambos
                </button>
              </div>

              {fraldas.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-1">
                  <h3 className="text-xs font-semibold opacity-70 mb-1">Histórico de Fraldas:</h3>
                  {fraldas.slice(0, 3).map((f) => (
                    <div key={f.id} className="flex justify-between text-xs bg-slate-50 dark:bg-slate-700/40 p-2 rounded-lg">
                      <span className="font-medium">{f.tipo}</span>
                      <span className="opacity-70">{f.hora}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculadora de Sono */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Moon className="text-[#2D7A1E] w-5 h-5" />
                <h2 className="font-bold">Calculadora de Sono</h2>
              </div>

              <div className="text-center py-4 bg-emerald-50/50 dark:bg-slate-700/40 rounded-xl mb-4 border border-emerald-100 dark:border-slate-600">
                <span className="text-3xl font-mono font-bold text-[#2D7A1E] dark:text-emerald-400">{formatTime(tempoSono)}</span>
                <p className="text-xs opacity-70 mt-1">
                  {sonoTimer ? 'Soneca em andamento...' : 'Pronto para iniciar'}
                </p>
              </div>

              <button 
                onClick={toggleSono}
                className={`w-full py-3 rounded-xl font-bold text-white transition text-xs ${
                  sonoTimer ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2D7A1E] hover:bg-emerald-800'
                }`}
              >
                {sonoTimer ? 'Finalizar Soneca' : 'Iniciar Soneca'}
              </button>

              {registrosSono.length > 0 && !sonoTimer && (
                <div className="mt-3 p-2.5 bg-emerald-50 dark:bg-slate-700/30 rounded-xl border border-emerald-100 dark:border-slate-600 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-[11px]">
                    <span className="font-bold text-[#2D7A1E] dark:text-emerald-400">Próxima Janela: </span>
                    Sugerida em aproximadamente 1h30 a 2h após acordar.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ABA AUTOCUIDADO DA MÃE (NOVA!) --- */}
        {activeTab === 'autocuidado' && (
          <div className="space-y-6">
            {/* Card Gotas de Afeto */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <h2 className="font-bold text-sm">Gota de Afeto do Dia</h2>
              </div>
              <p className="text-sm font-medium leading-relaxed italic my-3 bg-white/10 p-3.5 rounded-xl border border-white/20">
                "{gotasDeAfeto[indiceFrase]}"
              </p>
              <button 
                onClick={proximaFraseAfeto}
                className="w-full bg-white text-[#F0657D] py-2 rounded-xl text-xs font-bold hover:bg-pink-50 transition shadow-sm"
              >
                Nova Gota de Afeto 💖
              </button>
            </div>

            {/* Marcador de Hidratação */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Droplet className="text-blue-500 w-5 h-5" />
                  <h2 className="font-bold">Hidratação da Mãe</h2>
                </div>
                <span className="text-xs font-bold text-blue-500">{coposAgua} / 8 copos</span>
              </div>
              <p className="text-xs opacity-75 mb-3">A amamentação exige muita água. Beba um copo a cada mamada!</p>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCoposAgua(coposAgua + 1)}
                  className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Tomar +1 Copo (250ml)
                </button>
                {coposAgua > 0 && (
                  <button 
                    onClick={() => setCoposAgua(0)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 text-xs"
                    title="Zerar água do dia"
                  >
                    Zerar
                  </button>
                )}
              </div>
            </div>

            {/* Check-in de Emoções e Vitaminas */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses} space-y-4`}>
              <div className="flex items-center space-x-2">
                <Smile className="text-amber-500 w-5 h-5" />
                <h2 className="font-bold">Como você está se sentindo hoje?</h2>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {['😊 Bem & Calma', '😴 Cansada', '🤯 Sobrecarregada', '💖 Feliz'].map((humor) => (
                  <button
                    key={humor}
                    onClick={() => setHumorHoje(humor)}
                    className={`p-2.5 rounded-xl border font-medium text-left transition ${
                      humorHoje === humor 
                        ? 'bg-pink-50 border-[#F0657D] text-[#F0657D] dark:bg-slate-700' 
                        : 'border-slate-100 dark:border-slate-700'
                    }`}
                  >
                    {humor}
                  </button>
                ))}
              </div>

              {/* Checkbox Vitamina */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="font-semibold">Tomou as Vitaminas / Suplementos?</span>
                <button
                  onClick={() => setVitaminaTomada(!vitaminaTomada)}
                  className={`px-3 py-1.5 rounded-xl font-bold ${
                    vitaminaTomada 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 opacity-60'
                  }`}
                >
                  {vitaminaTomada ? '✓ Concluído' : 'Marcar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- ABA ALIMENTAÇÃO --- */}
        {activeTab === 'alimentacao' && (
          <div className="space-y-6">
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Utensils className="text-[#F0657D] w-5 h-5" />
                <h2 className="font-bold">Introdução Alimentar</h2>
              </div>
              
              <div className="space-y-3 mb-4 text-xs">
                <input 
                  type="text" placeholder="Nome do alimento (Ex: Abóbora)" value={novoAlimento.nome}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, nome: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200 dark:bg-slate-700 dark:border-slate-600"
                />
                <select 
                  value={novoAlimento.aceitacao}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, aceitacao: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pink-200 dark:bg-slate-700 dark:border-slate-600"
                >
                  <option value="ótima">Aceitação: Ótima</option>
                  <option value="moderada">Aceitação: Moderada</option>
                  <option value="recusou">Recusou / Alergia</option>
                </select>
                <button 
                  onClick={() => {
                    if (novoAlimento.nome) {
                      setAlimentosIA([{ ...novoAlimento, id: Date.now() }, ...alimentosIA]);
                      setNovoAlimento({ nome: '', aceitacao: 'ótima' });
                    }
                  }} 
                  className="w-full bg-[#F0657D] text-white py-2.5 rounded-xl font-bold"
                >
                  Registrar Alimento
                </button>
              </div>

              {alimentosIA.length > 0 && (
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                  {alimentosIA.map((a) => (
                    <div key={a.id} className="flex justify-between items-center text-xs bg-slate-50 dark:bg-slate-700/40 p-2.5 rounded-lg">
                      <span className="font-semibold">{a.nome}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-pink-100 dark:bg-pink-900/40 text-[#F0657D]">
                        {a.aceitacao}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lista de Compras */}
            <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses}`}>
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="text-[#2D7A1E] w-5 h-5" />
                <h2 className="font-bold">Lista de Compras</h2>
              </div>
              <div className="flex space-x-2 mb-3 text-xs">
                <input 
                  type="text" placeholder="Novo item..." value={novoItemCompra}
                  onChange={(e) => setNovoItemCompra(e.target.value)}
                  className="flex-1 p-2 rounded-xl border border-emerald-200 dark:bg-slate-700 dark:border-slate-600"
                />
                <button 
                  onClick={() => {
                    if (novoItemCompra) {
                      setListaCompras([{ id: Date.now(), texto: novoItemCompra }, ...listaCompras]);
                      setNovoItemCompra('');
                    }
                  }}
                  className="bg-[#2D7A1E] text-white px-4 rounded-xl font-bold"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2">
                {listaCompras.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-700/40 p-2.5 rounded-lg">
                    <span>{item.texto}</span>
                    <button onClick={() => setListaCompras(listaCompras.filter((i) => i.id !== item.id))}>
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- ABA ROTINA --- */}
        {activeTab === 'rotina' && (
          <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses} space-y-4`}>
            <div className="flex items-center space-x-2">
              <Calendar className="text-[#F0657D] w-5 h-5" />
              <h2 className="font-bold">Cronograma da Rotina</h2>
            </div>
            <p className="text-xs opacity-75">Sugestão de horários para a fase atual:</p>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-pink-50/50 dark:bg-slate-700/40 rounded-xl border border-pink-100 dark:border-slate-600 flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#F0657D]">07:00</span>
                  <p className="font-medium">Acordar + Amamentação / Café</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-50/50 dark:bg-slate-700/40 rounded-xl border border-emerald-100 dark:border-slate-600 flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#2D7A1E]">09:30</span>
                  <p className="font-medium">Soneca da Manhã</p>
                </div>
              </div>
              <div className="p-3 bg-pink-50/50 dark:bg-slate-700/40 rounded-xl border border-pink-100 dark:border-slate-600 flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#F0657D]">12:00</span>
                  <p className="font-medium">Almoço + Banho do Bebê</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABA FINANÇAS --- */}
        {activeTab === 'financas' && (
          <div className={`rounded-2xl p-5 shadow-sm border ${cardClasses} space-y-4`}>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-[#2D7A1E] w-5 h-5" />
              <h2 className="font-bold">Controle Financeiro</h2>
            </div>

            <div className="space-y-3 text-xs">
              <input 
                type="text" placeholder="Descrição (Ex: Fraldas)" value={novaFinanca.desc}
                onChange={(e) => setNovaFinanca({ ...novaFinanca, desc: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-emerald-200 dark:bg-slate-700 dark:border-slate-600"
              />
              <input 
                type="number" placeholder="Valor (R$)" value={novaFinanca.valor}
                onChange={(e) => setNovaFinanca({ ...novaFinanca, valor: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-emerald-200 dark:bg-slate-700 dark:border-slate-600"
              />
              <button 
                onClick={() => {
                  if (novaFinanca.desc && novaFinanca.valor) {
                    setFinancas([{ ...novaFinanca, id: Date.now() }, ...financas]);
                    setNovaFinanca({ desc: '', valor: '' });
                  }
                }} 
                className="w-full bg-[#2D7A1E] text-white py-2.5 rounded-xl font-bold"
              >
                Adicionar Registro
              </button>
            </div>

            {financas.length > 0 && (
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                {financas.map((f) => (
                  <div key={f.id} className="flex justify-between items-center text-xs bg-slate-50 dark:bg-slate-700/40 p-2.5 rounded-lg">
                    <span>{f.desc}</span>
                    <span className="font-bold text-[#2D7A1E] dark:text-emerald-400">R$ {parseFloat(f.valor).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Bar (Navegação com nova Aba Autocuidado) */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t p-2 flex justify-around items-center z-20 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
        <button onClick={() => setActiveTab('inicio')} className={`flex flex-col items-center p-1.5 ${activeTab === 'inicio' ? 'text-[#F0657D]' : 'opacity-50'}`}>
          <Heart className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Início</span>
        </button>

        <button onClick={() => setActiveTab('autocuidado')} className={`flex flex-col items-center p-1.5 ${activeTab === 'autocuidado' ? 'text-[#F0657D]' : 'opacity-50'}`}>
          <Smile className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Mãe</span>
        </button>

        <button onClick={() => setActiveTab('alimentacao')} className={`flex flex-col items-center p-1.5 ${activeTab === 'alimentacao' ? 'text-[#F0657D]' : 'opacity-50'}`}>
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Comida</span>
        </button>

        <button onClick={() => setActiveTab('rotina')} className={`flex flex-col items-center p-1.5 ${activeTab === 'rotina' ? 'text-[#F0657D]' : 'opacity-50'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Rotina</span>
        </button>

        <button onClick={() => setActiveTab('financas')} className={`flex flex-col items-center p-1.5 ${activeTab === 'financas' ? 'text-[#2D7A1E]' : 'opacity-50'}`}>
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Finanças</span>
        </button>
      </nav>
    </div>
  );
}
