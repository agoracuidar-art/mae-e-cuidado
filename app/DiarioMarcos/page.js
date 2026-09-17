'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, TrendingUp, Syringe, FileText, Sun, Moon, 
  Calendar, CheckCircle, Plus, Sparkles, Heart, ChevronRight, Download
} from 'lucide-react';

export default function DiarioMarcosApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('marcos'); // 'marcos', 'crescimento', 'vacinas'

  // --- 1. ESTADO: LINHA DO TEMPO DE MARCOS ---
  const [marcos, setMarcos] = useState([
    { id: 1, titulo: 'Primeiro Sorriso Intencional', icon: '😊', data: '', concluido: false, categoria: 'Social' },
    { id: 2, titulo: 'Segurou a Cabeça Firme', icon: '👶', data: '', concluido: false, categoria: 'Motor' },
    { id: 3, titulo: 'Primeira Gargalhada', icon: '😄', data: '', concluido: false, categoria: 'Social' },
    { id: 4, titulo: 'Rolou de Barriga para Cima', icon: '🔄', data: '', concluido: false, categoria: 'Motor' },
    { id: 5, titulo: 'Pegou o Primeiro Brinquedo', icon: '🧸', data: '', concluido: false, categoria: 'Motor' },
    { id: 6, titulo: 'Primeiro Dentinho Nascendo', icon: '🦷', data: '', concluido: false, categoria: 'Saúde' },
    { id: 7, titulo: 'Sentou sem Apoio', icon: '🧘', data: '', concluido: false, categoria: 'Motor' },
    { id: 8, titulo: 'Primeira Papinha / Frutinha', icon: '🥑', data: '', concluido: false, categoria: 'Alimentação' },
    { id: 9, titulo: 'Engatinhou pela Primeira Vez', icon: '🚼', data: '', concluido: false, categoria: 'Motor' },
    { id: 10, titulo: 'Primeira Palavra (Mama/Papa)', icon: '💬', data: '', concluido: false, categoria: 'Linguagem' },
    { id: 11, titulo: 'Ficou em Pé Segurando Apoio', icon: '🧍', data: '', concluido: false, categoria: 'Motor' },
    { id: 12, titulo: 'Primeiros Passinhos Independentes', icon: '🚶', data: '', concluido: false, categoria: 'Motor' },
  ]);

  // --- 2. ESTADO: CRESCIMENTO (PESO, ALTURA, PERÍMETRO) ---
  const [registrosCrescimento, setRegistrosCrescimento] = useState([
    { mes: 'Nascimento', peso: '3.200', altura: '49', pc: '34', data: '' },
    { mes: '1º Mês', peso: '4.100', altura: '53', pc: '36.5', data: '' },
    { mes: '2º Mês', peso: '5.000', altura: '56.5', pc: '38', data: '' },
  ]);

  const [novoRegistro, setNovoRegistro] = useState({ mes: '', peso: '', altura: '', pc: '', data: '' });

  // --- 3. ESTADO: CALENDÁRIO DE VACINAS ---
  const [vacinas, setVacinas] = useState([
    { id: 1, dose: 'Ao Nascer', nome: 'BCG + Hepatite B', tomada: true, data: 'No hospital' },
    { id: 2, dose: '2 Meses', nome: 'Penta + VIP + Rotavírus + Pneumo 10v', tomada: true, data: '' },
    { id: 3, dose: '3 Meses', nome: 'Meningocócica C', tomada: false, data: '' },
    { id: 4, dose: '4 Meses', nome: 'Penta + VIP + Rotavírus + Pneumo 10v (2ª dose)', tomada: false, data: '' },
    { id: 5, dose: '5 Meses', nome: 'Meningocócica C (2ª dose)', tomada: false, data: '' },
    { id: 6, dose: '6 Meses', nome: 'Penta + VIP (3ª dose) + Influenza', tomada: false, data: '' },
    { id: 7, dose: '9 Meses', nome: 'Febre Amarela', tomada: false, data: '' },
    { id: 8, dose: '12 Meses (1 Ano)', nome: 'Tríplice Viral + Pneumo 10v + MenC', tomada: false, data: '' },
  ]);

  // Carregar e Salvar LocalStorage
  useEffect(() => {
    const savedMarcos = localStorage.getItem('dm_marcos');
    if (savedMarcos) setMarcos(JSON.parse(savedMarcos));

    const savedCrescimento = localStorage.getItem('dm_crescimento');
    if (savedCrescimento) setRegistrosCrescimento(JSON.parse(savedCrescimento));

    const savedVacinas = localStorage.getItem('dm_vacinas');
    if (savedVacinas) setVacinas(JSON.parse(savedVacinas));
  }, []);

  useEffect(() => { localStorage.setItem('dm_marcos', JSON.stringify(marcos)); }, [marcos]);
  useEffect(() => { localStorage.setItem('dm_crescimento', JSON.stringify(registrosCrescimento)); }, [registrosCrescimento]);
  useEffect(() => { localStorage.setItem('dm_vacinas', JSON.stringify(vacinas)); }, [vacinas]);

  // Ações de Marcos
  const toggleMarco = (id) => {
    setMarcos(marcos.map(m => {
      if (m.id === id) {
        const novoStatus = !m.concluido;
        const hoje = new Date().toLocaleDateString('pt-BR');
        return { ...m, concluido: novoStatus, data: novoStatus ? (m.data || hoje) : '' };
      }
      return m;
    }));
  };

  // Ações de Crescimento
  const adicionarCrescimento = (e) => {
    e.preventDefault();
    if (!novoRegistro.mes || !novoRegistro.peso) return;
    setRegistrosCrescimento([...registrosCrescimento, novoRegistro]);
    setNovoRegistro({ mes: '', peso: '', altura: '', pc: '', data: '' });
  };

  // Ações de Vacinas
  const toggleVacina = (id) => {
    setVacinas(vacinas.map(v => {
      if (v.id === id) {
        const novaTomada = !v.tomada;
        const hoje = new Date().toLocaleDateString('pt-BR');
        return { ...v, tomada: novaTomada, data: novaTomada ? (v.data || hoje) : '' };
      }
      return v;
    }));
  };

  // Gerar Impressão / PDF do Relatório
  const imprimirRelatorioPDF = () => {
    window.print();
  };

  const themeClasses = darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#FFFDF9] text-slate-800';
  const cardClasses = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100';

  return (
    <div className={`min-h-screen pb-16 transition-colors ${themeClasses}`}>
      
      {/* Header */}
      <header className={`p-4 sticky top-0 z-10 flex items-center justify-between border-b shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Mãe & Cuidado" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-[#F0657D] leading-none">Diário de Marcos</h1>
            <p className="text-[10px] text-[#2D7A1E] font-semibold mt-0.5">Primeiro Ano de Memórias</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={imprimirRelatorioPDF}
            className="p-2 rounded-xl bg-pink-50 text-[#F0657D] dark:bg-slate-700 dark:text-pink-300 font-bold text-xs flex items-center gap-1 border border-pink-200 dark:border-slate-600"
            title="Exportar Livro do Bebê"
          >
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">PDF</span>
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Navegação Secundária em Tabs */}
      <div className="p-4 max-w-md mx-auto pb-0">
        <div className="grid grid-cols-3 gap-1 bg-pink-100/60 dark:bg-slate-800 p-1 rounded-2xl border border-pink-100 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveTab('marcos')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'marcos' ? 'bg-[#F0657D] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Conquistas
          </button>

          <button
            onClick={() => setActiveTab('crescimento')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'crescimento' ? 'bg-[#F0657D] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Curva
          </button>

          <button
            onClick={() => setActiveTab('vacinas')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'vacinas' ? 'bg-[#F0657D] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" /> Vacinas
          </button>
        </div>
      </div>

      <main className="p-4 max-w-md mx-auto space-y-5">

        {/* ================= TAB 1: LINHA DO TEMPO DE MARCOS ================= */}
        {activeTab === 'marcos' && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses} flex items-center justify-between`}>
              <div>
                <h2 className="font-bold text-sm text-[#F0657D]">Primeiras Conquistas</h2>
                <p className="text-[11px] opacity-75">Marque os momentos inesquecíveis do bebê</p>
              </div>
              <span className="text-xs font-bold bg-[#2D7A1E]/10 text-[#2D7A1E] px-2.5 py-1 rounded-full border border-[#2D7A1E]/20">
                {marcos.filter(m => m.concluido).length} / {marcos.length} Concluídos
              </span>
            </div>

            <div className="space-y-2.5">
              {marcos.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleMarco(item.id)}
                  className={`p-3.5 rounded-2xl border shadow-sm cursor-pointer transition flex items-center justify-between ${
                    item.concluido 
                      ? 'bg-emerald-50/70 border-emerald-200 dark:bg-slate-800 dark:border-emerald-800' 
                      : cardClasses
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className={`font-bold text-xs ${item.concluido ? 'text-[#2D7A1E] dark:text-emerald-400 line-through' : ''}`}>
                        {item.titulo}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">{item.categoria}</p>
                      {item.concluido && item.data && (
                        <span className="text-[10px] font-bold text-[#2D7A1E] flex items-center gap-1 mt-0.5">
                          📅 Registrado em: {item.data}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    item.concluido 
                      ? 'bg-[#2D7A1E] border-[#2D7A1E] text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {item.concluido && <CheckCircle className="w-4 h-4 fill-[#2D7A1E] text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: TABELA DE CRESCIMENTO ================= */}
        {activeTab === 'crescimento' && (
          <div className="space-y-4">
            {/* Formulário de Novo Registro */}
            <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
              <h3 className="text-xs font-bold text-[#F0657D] mb-3 flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Adicionar Medição da Consulta
              </h3>
              <form onSubmit={adicionarCrescimento} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Mês (ex: 3º Mês)" 
                    value={novoRegistro.mes} 
                    onChange={(e) => setNovoRegistro({...novoRegistro, mes: e.target.value})}
                    className="p-2 rounded-xl border border-pink-200 dark:border-slate-700 bg-pink-50/50 dark:bg-slate-900 text-xs focus:outline-none"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Peso (kg) ex: 6.200" 
                    value={novoRegistro.peso} 
                    onChange={(e) => setNovoRegistro({...novoRegistro, peso: e.target.value})}
                    className="p-2 rounded-xl border border-pink-200 dark:border-slate-700 bg-pink-50/50 dark:bg-slate-900 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Altura (cm) ex: 61" 
                    value={novoRegistro.altura} 
                    onChange={(e) => setNovoRegistro({...novoRegistro, altura: e.target.value})}
                    className="p-2 rounded-xl border border-pink-200 dark:border-slate-700 bg-pink-50/50 dark:bg-slate-900 text-xs focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Perímetro Cefálico (cm)" 
                    value={novoRegistro.pc} 
                    onChange={(e) => setNovoRegistro({...novoRegistro, pc: e.target.value})}
                    className="p-2 rounded-xl border border-pink-200 dark:border-slate-700 bg-pink-50/50 dark:bg-slate-900 text-xs focus:outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#F0657D] text-white py-2 rounded-xl text-xs font-bold shadow-sm"
                >
                  Salvar Medição
                </button>
              </form>
            </div>

            {/* Tabela de Histórico */}
            <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses}`}>
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3">Histórico de Desenvolvimento</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-pink-100 dark:border-slate-700 text-slate-400 uppercase text-[9px]">
                      <th className="pb-2">Idade</th>
                      <th className="pb-2">Peso</th>
                      <th className="pb-2">Altura</th>
                      <th className="pb-2">P. Cefálico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {registrosCrescimento.map((r, idx) => (
                      <tr key={idx} className="font-medium">
                        <td className="py-2.5 font-bold text-[#F0657D]">{r.mes}</td>
                        <td className="py-2.5">{r.peso} kg</td>
                        <td className="py-2.5">{r.altura} cm</td>
                        <td className="py-2.5">{r.pc} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CALENDÁRIO DE VACINAS ================= */}
        {activeTab === 'vacinas' && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-4 border shadow-sm ${cardClasses} flex items-center justify-between`}>
              <div>
                <h2 className="font-bold text-sm text-[#F0657D]">Carteira de Vacinação</h2>
                <p className="text-[11px] opacity-75">Esquema vacinal simplificado do 1º ano</p>
              </div>
              <span className="text-xs font-bold bg-[#2D7A1E]/10 text-[#2D7A1E] px-2.5 py-1 rounded-full border border-[#2D7A1E]/20">
                {vacinas.filter(v => v.tomada).length} / {vacinas.length} Doses
              </span>
            </div>

            <div className="space-y-2.5">
              {vacinas.map((vacina) => (
                <div 
                  key={vacina.id}
                  onClick={() => toggleVacina(vacina.id)}
                  className={`p-3.5 rounded-2xl border shadow-sm cursor-pointer transition flex items-center justify-between ${
                    vacina.tomada 
                      ? 'bg-emerald-50/70 border-emerald-200 dark:bg-slate-800 dark:border-emerald-800' 
                      : cardClasses
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl text-xs font-bold ${
                      vacina.tomada ? 'bg-[#2D7A1E] text-white' : 'bg-pink-100 text-[#F0657D] dark:bg-slate-700'
                    }`}>
                      <Syringe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#F0657D] uppercase tracking-wide">{vacina.dose}</span>
                      <h3 className={`font-bold text-xs ${vacina.tomada ? 'text-[#2D7A1E] dark:text-emerald-400' : ''}`}>
                        {vacina.nome}
                      </h3>
                      {vacina.tomada && vacina.data && (
                        <span className="text-[10px] text-[#2D7A1E] font-medium block">
                          Aplicada em: {vacina.data}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    vacina.tomada 
                      ? 'bg-[#2D7A1E] border-[#2D7A1E] text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {vacina.tomada && <CheckCircle className="w-4 h-4 fill-[#2D7A1E] text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
