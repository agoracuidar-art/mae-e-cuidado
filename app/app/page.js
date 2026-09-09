'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, DollarSign, ShoppingBag, 
  BookOpen, Smile, Baby, CheckCircle2, Plus, Trash2, 
  Utensils, Moon, RefreshCw, ChevronRight, UserCheck
} from 'lucide-react';

export default function MaeECuidadoApp() {
  // Estado do Questionário Inicial
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [userData, setUserData] = useState({
    nomeMae: '',
    nomeBabe: '',
    dataNascimento: '',
    tipoAlimentacao: 'amamentacao',
    faseDesenvolvimento: 'recem-nascido'
  });

  // Estado da Aba Ativa
  const [activeTab, setActiveTab] = useState('inicio');

  // Estados das Funcionalidades
  const [mamadas, setMamadas] = useState([]);
  const [registrosSono, setRegistrosSono] = useState([]);
  const [sonoTimer, setSonoTimer] = useState(false);
  const [tempoSono, setTempoSono] = useState(0);

  const [alimentosIA, setAlimentosIA] = useState([]);
  const [novoAlimento, setNovoAlimento] = useState({ nome: '', aceitacao: 'ótima' });

  const [listaCompras, setListaCompras] = useState([]);
  const [novoItemCompra, setNovoItemCompra] = useState('');

  const [financas, setFinancas] = useState([]);
  const [novaFinanca, setNovaFinanca] = useState({ desc: '', valor: '', tipo: 'despesa' });

  const [desapegos, setDesapegos] = useState([]);
  const [novoDesapego, setNovoDesapego] = useState({ titulo: '', preco: '', contato: '' });

  // Cronômetro do Sono
  useEffect(() => {
    let interval = null;
    if (sonoTimer) {
      interval = setInterval(() => {
        setTempoSono((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [sonoTimer]);

  // Formatação de Tempo (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleCompleteOnboarding = (e) => {
    e.preventDefault();
    if (userData.nomeMae && userData.nomeBabe) {
      setOnboardingDone(true);
    }
  };

  const addMamada = (lado) => {
    const novoRegistro = {
      id: Date.now(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lado
    };
    setMamadas([novoRegistro, ...mamadas]);
  };

  const toggleSono = () => {
    if (sonoTimer) {
      const novoRegistro = {
        id: Date.now(),
        duracao: formatTime(tempoSono),
        data: new Date().toLocaleDateString()
      };
      setRegistrosSono([novoRegistro, ...registrosSono]);
      setTempoSono(0);
    }
    setSonoTimer(!sonoTimer);
  };

  const addAlimento = () => {
    if (novoAlimento.nome) {
      setAlimentosIA([...alimentosIA, { ...novoAlimento, id: Date.now() }]);
      setNovoAlimento({ nome: '', aceitacao: 'ótima' });
    }
  };

  const addCompra = () => {
    if (novoItemCompra) {
      setListaCompras([...listaCompras, { id: Date.now(), texto: novoItemCompra, feito: false }]);
      setNovoItemCompra('');
    }
  };

  const addFinanca = () => {
    if (novaFinanca.desc && novaFinanca.valor) {
      setFinancas([...financas, { ...novaFinanca, id: Date.now() }]);
      setNovaFinanca({ desc: '', valor: '', tipo: 'despesa' });
    }
  };

  const addDesapego = () => {
    if (novoDesapego.titulo && novoDesapego.preco) {
      setDesapegos([...desapegos, { ...novoDesapego, id: Date.now() }]);
      setNovoDesapego({ titulo: '', preco: '', contato: '' });
    }
  };

  // Tela de Onboarding / Questionário Inicial
  if (!onboardingDone) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center items-center p-6 text-slate-800">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-pink-100 flex flex-col items-center">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-28 w-28 object-contain mb-4" />
          <h1 className="text-2xl font-bold text-[#F0657D] text-center mb-1">Boas-vindas ao Mãe & Cuidado</h1>
          <p className="text-sm text-slate-600 text-center mb-6">Vamos personalizar o aplicativo para a sua rotina</p>

          <form onSubmit={handleCompleteOnboarding} className="w-full space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Seu Nome (Mãe)</label>
              <input 
                type="text" 
                required 
                value={userData.nomeMae}
                onChange={(e) => setUserData({ ...userData, nomeMae: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
                placeholder="Ex: Ana"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nome do Bebê</label>
              <input 
                type="text" 
                required 
                value={userData.nomeBabe}
                onChange={(e) => setUserData({ ...userData, nomeBabe: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
                placeholder="Ex: Leo"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Data de Nascimento do Bebê</label>
              <input 
                type="date" 
                required 
                value={userData.dataNascimento}
                onChange={(e) => setUserData({ ...userData, dataNascimento: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Fase Atual</label>
              <select 
                value={userData.faseDesenvolvimento}
                onChange={(e) => setUserData({ ...userData, faseDesenvolvimento: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#F0657D]"
              >
                <option value="recem-nascido">Recém-nascido (0 a 3 meses)</option>
                <option value="bebe-jovem">Bebê (3 a 6 meses)</option>

<option value="introducao-alimentar">Introdução Alimentar (6 a 12 meses)</option>
                <option value="primeiros-passos">Primeiros Passos (1 ano+)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#F0657D] text-white py-3 rounded-xl font-bold hover:bg-[#d9536a] transition shadow-md mt-4"
            >
              Acessar Meu Espaço
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-pink-100 p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo Mãe & Cuidado" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-[#F0657D] leading-none">Mãe & Cuidado</h1>
            <p className="text-xs text-slate-500 mt-0.5">Mãe: {userData.nomeMae} | Bebê: {userData.nomeBabe}</p>
          </div>
        </div>
        <span className="text-xs bg-emerald-100 text-[#2D7A1E] px-2.5 py-1 rounded-full font-semibold capitalize">
          {userData.faseDesenvolvimento.replace('-', ' ')}
        </span>
      </header>

      {/* Conteúdo Principal */}
      <main className="p-4 max-w-lg mx-auto">
        {/* Aba Início / Amamentação e Sono */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            {/* Registro de Amamentação */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="text-[#F0657D] w-5 h-5" />
                <h2 className="font-bold text-slate-700">Registro de Amamentação</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4">Marque de qual lado o bebê mamou por último:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button 
                  onClick={() => addMamada('Seio Esquerdo')} 
                  className="bg-pink-50 text-[#F0657D] border border-pink-200 py-3 rounded-xl font-semibold hover:bg-pink-100 active:scale-95 transition"
                >
                  Seio Esquerdo
                </button>
                <button 
                  onClick={() => addMamada('Seio Direito')} 
                  className="bg-pink-50 text-[#F0657D] border border-pink-200 py-3 rounded-xl font-semibold hover:bg-pink-100 active:scale-95 transition"
                >
                  Seio Direito
                </button>
              </div>

              {mamadas.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <h3 className="text-xs font-semibold text-slate-500 mb-2">Últimas Mamadas:</h3>
                  <div className="space-y-1">
                    {mamadas.slice(0, 3).map((m) => (
                      <div key={m.id} className="flex justify-between text-xs bg-slate-50 p-2 rounded-lg">
                        <span className="font-medium text-slate-700">{m.lado}</span>
                        <span className="text-slate-500">{m.hora}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rastreador e Calculadora de Sono */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
              <div className="flex items-center space-x-2 mb-3">
                <Moon className="text-[#2D7A1E] w-5 h-5" />
                <h2 className="font-bold text-slate-700">Calculadora & Registro de Sono</h2>
              </div>
              <div className="text-center py-4 bg-emerald-50/50 rounded-xl mb-4 border border-emerald-100">
                <span className="text-3xl font-mono font-bold text-[#2D7A1E]">{formatTime(tempoSono)}</span>
                <p className="text-xs text-slate-500 mt-1">
                  {sonoTimer ? 'Cronometrando soneca...' : 'Pronto para iniciar'}
                </p>
              </div>
              <button 
                onClick={toggleSono}
                className={`w-full py-3 rounded-xl font-bold text-white transition ${
                  sonoTimer ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2D7A1E] hover:bg-emerald-800'
                }`}
              >
                {sonoTimer ? 'Finalizar Soneca' : 'Iniciar Soneca'}
              </button>

              {registrosSono.length > 0 && (
                <div className="border-t border-slate-100 pt-3 mt-4">
                  <h3 className="text-xs font-semibold text-slate-500 mb-2">Histórico Recente de Sonecas:</h3>
                  <div className="space-y-1">
                    {registrosSono.slice(0, 3).map((s) => (
                      <div key={s.id} className="flex justify-between text-xs bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-500">{s.data}</span>
                        <span className="font-semibold text-[#2D7A1E]">{s.duracao}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Aba Alimentação */}
        {activeTab === 'alimentacao' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
              <div className="flex items-center space-x-2 mb-3">
                <Utensils className="text-[#F0657D] w-5 h-5" />
                <h2 className="font-bold text-slate-700">Introdução Alimentar</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                <input 
                  type="text" 
                  placeholder="Nome do alimento (Ex: Abóbora)" 
                  value={novoAlimento.nome}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, nome: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-pink-200"
                />
                <select 
                  value={novoAlimento.aceitacao}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, aceitacao: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-pink-200"
                >
                  <option value="ótima">Aceitação: Ótima</option>
                  <option value="moderada">Aceitação: Moderada</option>
                  <option value="recusou">Recusou / Alergia</option>
                </select>
                <button 
                  onClick={addAlimento} 
                  className="w-full bg-[#F0657D] text-white py-2.5 rounded-xl font-bold text-sm"
                >
                  Registrar Alimento
                </button>
              </div>

              {alimentosIA.length > 0 && (
                <div className="space-y-2 border-t pt-3">
                  {alimentosIA.map((a) => (
                    <div key={a.id} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-lg">
                      <span className="font-semibold text-slate-700">{a.nome}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-pink-100 text-[#F0657D]">
                        {a.aceitacao}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lista de Compras Automática */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="text-[#2D7A1E] w-5 h-5" />
                <h2 className="font-bold text-slate-700">Lista de Compras Semanal</h2>
              </div>
              <div className="flex space-x-2 mb-3">
                <input 
                  type="text" 
                  placeholder="Novo item..." 
                  value={novoItemCompra}
                  onChange={(e) => setNovoItemCompra(e.target.value)}
                  className="flex-1 p-2 text-sm rounded-xl border border-emerald-200"
                />
                <button 
                  onClick={addCompra}
                  className="bg-[#2D7A1E] text-white px-4 rounded-xl font-bold text-sm"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2">
                {listaCompras.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-700">{item.texto}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba Rotina */}
        {activeTab === 'rotina' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-[#F0657D] w-5 h-5" />
              <h2 className="font-bold text-slate-700">Cronograma da Rotina</h2>
            </div>
            <p className="text-xs text-slate-500">Sugestão de horários para a fase atual ({userData.faseDesenvolvimento.replace('-', ' ')}):</p>
            
            <div className="space-y-3">
              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#F0657D]">07:00</span>
                  <p className="text-slate-700 font-medium">Acordar + Amamentação / Café</p>
                </div>
                <span className="text-slate-400">Editável</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#2D7A1E]">09:30</span>
                  <p className="text-slate-700 font-medium">Soneca da Manhã</p>
                </div>
                <span className="text-slate-400">Editável</span>
              </div>
              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#F0657D]">12:00</span>
                  <p className="text-slate-700 font-medium">Almoço + Banho do Bebê</p>
                </div>
                <span className="text-slate-400">Editável</span>
              </div>
            </div>
          </div>
        )}

        {/* Aba Finanças */}
        {activeTab === 'financas' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 space-y-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-[#2D7A1E] w-5 h-5" />
              <h2 className="font-bold text-slate-700">Controle Financeiro</h2>
            </div>

            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Descrição (Ex: Fraldas)" 
                value={novaFinanca.desc}
                onChange={(e) => setNovaFinanca({ ...novaFinanca, desc: e.target.value })}
                className="w-full p-2.5 text-sm rounded-xl border border-emerald-200"
              />
              <input 
                type="number" 
                placeholder="Valor (R$)" 
                value={novaFinanca.valor}
                onChange={(e) => setNovaFinanca({ ...novaFinanca, valor: e.target.value })}
                className="w-full p-2.5 text-sm rounded-xl border border-emerald-200"
              />
              <button 
                onClick={addFinanca} 
                className="w-full bg-[#2D7A1E] text-white py-2.5 rounded-xl font-bold text-sm"
              >
                Adicionar Registro
              </button>
            </div>

            {financas.length > 0 && (
              <div className="space-y-2 border-t pt-3">
                {financas.map((f) => (
                  <div key={f.id} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-lg">
                    <span className="font-medium text-slate-700">{f.desc}</span>
                    <span className="font-bold text-[#2D7A1E]">R$ {parseFloat(f.valor).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Aba Desapego */}
        {activeTab === 'desapego' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-[#F0657D] w-5 h-5" />
              <h2 className="font-bold text-slate-700">Espaço Desapego (Marketplace)</h2>
            </div>
            <p className="text-xs text-slate-500">Troque ou venda itens de maternidade acumulados em casa:</p>

            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Título do Item (Ex: Carrinho Chicco)" 
                value={novoDesapego.titulo}
                onChange={(e) => setNovoDesapego({ ...novoDesapego, titulo: e.target.value })}
                className="w-full p-2.5 text-sm rounded-xl border border-pink-200"
              />
              <input 
                type="text" 
                placeholder="Preço (Ex: R$ 150 ou Troca)" 
                value={novoDesapego.preco}
                onChange={(e) => setNovoDesapego({ ...novoDesapego, preco: e.target.value })}
                className="w-full p-2.5 text-sm rounded-xl border border-pink-200"
              />
              <button 
                onClick={addDesapego} 
                className="w-full bg-[#F0657D] text-white py-2.5 rounded-xl font-bold text-sm"
              >
                Publicar Anúncio
              </button>
            </div>

            {desapegos.length > 0 && (
              <div className="grid grid-cols-1 gap-3 border-t pt-3">
                {desapegos.map((d) => (
                  <div key={d.id} className="bg-pink-50/50 p-3 rounded-xl border border-pink-100 text-xs">
                    <h4 className="font-bold text-slate-800">{d.titulo}</h4>
                    <span className="text-[#F0657D] font-bold block mt-1">{d.preco}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navegação Inferior (Bottom Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 p-2 flex justify-around items-center z-20">
        <button 
          onClick={() => setActiveTab('inicio')} 
          className={`flex flex-col items-center p-1.5 ${activeTab === 'inicio' ? 'text-[#F0657D]' : 'text-slate-400'}`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Início</span>
        </button>

        <button 
          onClick={() => setActiveTab('alimentacao')} 
          className={`flex flex-col items-center p-1.5 ${activeTab === 'alimentacao' ? 'text-[#F0657D]' : 'text-slate-400'}`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Alimentação</span>
        </button>

        <button 
          onClick={() => setActiveTab('rotina')} 
          className={`flex flex-col items-center p-1.5 ${activeTab === 'rotina' ? 'text-[#F0657D]' : 'text-slate-400'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Rotina</span>
        </button>

        <button 
          onClick={() => setActiveTab('financas')} 
          className={`flex flex-col items-center p-1.5 ${activeTab === 'financas' ? 'text-[#2D7A1E]' : 'text-slate-400'}`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Finanças</span>
        </button>

        <button 
          onClick={() => setActiveTab('desapego')} 
          className={`flex flex-col items-center p-1.5 ${activeTab === 'desapego' ? 'text-[#F0657D]' : 'text-slate-400'}`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Desapego</span>
        </button>
      </nav>
    </div>
  );
}
