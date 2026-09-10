   'use client';
import React, { useState, useEffect } from 'react';
import { 
  Baby, Home, Calendar, Wallet, Plus, 
  Clock, Utensils, ShoppingCart, RefreshCw, Leaf
} from 'lucide-react';

export default function MaeNoControleApp() {
  const [activeTab, setActiveTab] = useState('rastreador');
  
  // Estados do Perfil e Rastreador
  const [logs, setLogs] = useState([]);
  
  // Estado da Logística da Casa
  const [pantry, setPantry] = useState('');
  const [generatedMenu, setGeneratedMenu] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Estado do QG da Rotina
  const [ageGroup, setAgeGroup] = useState('bebe');

  // Estado das Finanças e Desapegos
  const [expenses, setExpenses] = useState([]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [itemsToSell, setItemsToSell] = useState([]);
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  // Carregar dados salvos no celular
  useEffect(() => {
    const savedLogs = localStorage.getItem('mnc_logs');
    const savedShopping = localStorage.getItem('mnc_shopping');
    const savedExpenses = localStorage.getItem('mnc_expenses');
    const savedItems = localStorage.getItem('mnc_items');

    if (savedLogs) setLogs(JSON.parse(savedLogs));
    if (savedShopping) setShoppingList(JSON.parse(savedShopping));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedItems) setItemsToSell(JSON.parse(savedItems));
  }, []);

  const saveToLocal = (key, value) => {
    localStorage.setItem(`mnc_${key}`, JSON.stringify(value));
  };

  // Funções de Ação
  const addLog = (type, detail) => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      detail
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    saveToLocal('logs', updated);
  };

  const generateMenu = () => {
    if (!pantry) return;
    setGeneratedMenu({
      segunda: `Refeição leve com: ${pantry}`,
      terca: `Torta prática de legumes / proteína de forno`,
      quarta: `Creme nutritivo acolhedor`
    });
  };

  const addShoppingItem = () => {
    if (!newItem) return;
    const updated = [...shoppingList, { id: Date.now(), text: newItem }];
    setShoppingList(updated);
    saveToLocal('shopping', updated);
    setNewItem('');
  };

  const addExpense = () => {
    if (!expTitle || !expAmount) return;
    const updated = [...expenses, { id: Date.now(), title: expTitle, amount: parseFloat(expAmount) }];
    setExpenses(updated);
    saveToLocal('expenses', updated);
    setExpTitle('');
    setExpAmount('');
  };

  const addItemToSell = () => {
    if (!itemTitle || !itemPrice) return;
    const updated = [...itemsToSell, { id: Date.now(), title: itemTitle, price: parseFloat(itemPrice) }];
    setItemsToSell(updated);
    saveToLocal('items', updated);
    setItemTitle('');
    setItemPrice('');
  };

  const routines = {
    bebe: [
      { time: "07:00", act: "Despertar + Mamar" },
      { time: "09:00", act: "Primeira Soneca (Janela ~2h)" },
      { time: "12:00", act: "Almoço / Introdução Alimentar" },
      { time: "19:00", act: "Ritual do Sono Noturno" }
    ],
    crianca: [
      { time: "07:30", act: "Café da Manhã + Escovação" },
      { time: "09:00", act: "Atividade Educativa / Livre" },
      { time: "12:00", act: "Almoço em Família" },
      { time: "20:00", act: "Leitura Acolhedora + Cama" }
    ],
    adolescente: [
      { time: "06:30", act: "Rotina Matinal + Escola" },
      { time: "15:00", act: "Estudos & Organização" },
      { time: "21:30", act: "Desconexão de Telas" }
    ]
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFBFB] text-[#4A3B32] flex flex-col font-sans pb-24 border-x border-[#F5EBEA]">
      
      {/* CABEÇALHO COM A SUA LOGO OFICIAL */}
      <header className="bg-white px-6 py-4 rounded-b-3xl shadow-sm border-b border-[#F2E3E5] flex flex-col items-center justify-center">
        <img 
          src="/logo.png" 
          alt="Mãe & Cuidado" 
          className="h-24 w-auto object-contain py-1"
        />
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="p-5 flex-1 space-y-5">

        {/* MÓDULO 1: RASTREADOR DO BEBÊ */}
        {activeTab === 'rastreador' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h2 className="font-serif text-lg text-[#F0657D] mb-3 flex items-center gap-2 font-semibold">
                <Baby size={20} className="text-[#F0657D]" /> Registro Diário do Bebê
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => addLog('Amamentação', 'Peito Esquerdo')} className="p-3.5 bg-[#FDF0F2] text-[#D84361] rounded-xl text-xs font-medium hover:bg-[#FADCE2] transition">
                  🤱 Peito Esquerdo
                </button>
                <button onClick={() => addLog('Amamentação', 'Peito Direito')} className="p-3.5 bg-[#FDF0F2] text-[#D84361] rounded-xl text-xs font-medium hover:bg-[#FADCE2] transition">
                  🤱 Peito Direito
                </button>
                <button onClick={() => addLog('Sono', 'Iniciou Soneca')} className="p-3.5 bg-[#F0F7EF] text-[#2D7A1E] rounded-xl text-xs font-medium hover:bg-[#E1F0DF] transition">
                  🌙 Iniciou Soneca
                </button>
                <button onClick={() => addLog('Sono', 'Acordou')} className="p-3.5 bg-[#FFF8EE] text-[#9E6B20] rounded-xl text-xs font-medium hover:bg-[#FCEFD9] transition">
                  ☀️ Acordou
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h3 className="text-xs font-medium uppercase tracking-wider text-[#A08885] mb-3">Registros de Hoje</h3>
              {logs.length === 0 ? (
                <p className="text-xs text-[#C2B0AD] italic">Nenhum registro ainda hoje.</p>
              ) : (
                <ul className="space-y-2">
                  {logs.slice(0, 5).map((log) => (
                    <li key={log.id} className="flex justify-between items-center text-xs p-3 bg-[#FDF8F9] rounded-xl border border-[#F7E8EB]">
                      <span className="font-medium text-[#4A3B32]">{log.type}: {log.detail}</span>
                      <span className="text-[#B09995] text-[11px]">{log.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* MÓDULO 2: LOGÍSTICA DA CASA */}
        {activeTab === 'casa' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h2 className="font-serif text-lg text-[#2D7A1E] mb-3 flex items-center gap-2 font-semibold">
                <Utensils size={20} className="text-[#2D7A1E]" /> Cardápio Prático
              </h2>
              <textarea 
                className="w-full p-3 border border-[#E8D3D6] rounded-xl text-xs bg-[#FDFBFB] focus:outline-none focus:border-[#2D7A1E] transition" 
                rows="2"
                placeholder="O que tem na geladeira hoje..."
                value={pantry}
                onChange={(e) => setPantry(e.target.value)}
              />
              <button onClick={generateMenu} className="w-full mt-3 bg-[#2D7A1E] text-white py-3 rounded-xl text-xs font-medium hover:bg-[#236117] transition shadow-sm">
                Gerar Sugestões de Refeições
              </button>

              {generatedMenu && (
                <div className="mt-4 p-4 bg-[#F0F7EF] rounded-xl text-xs space-y-2 border border-[#D9EBD7]">
                  <p className="text-[#2D7A1E]"><strong>Segunda:</strong> {generatedMenu.segunda}</p>
                  <p className="text-[#2D7A1E]"><strong>Terça:</strong> {generatedMenu.terca}</p>
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h3 className="font-serif text-base text-[#4A3B32] mb-3 flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#F0657D]" /> Lista de Compras Express
              </h3>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  className="flex-1 p-3 border border-[#E8D3D6] bg-[#FDFBFB] rounded-xl text-xs" 
                  placeholder="Novo item..." 
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={addShoppingItem} className="bg-[#F0657D] text-white px-4 rounded-xl flex items-center justify-center">
                  <Plus size={18} />
                </button>
              </div>
              <ul className="space-y-1.5 text-xs">
                {shoppingList.map((item) => (
                  <li key={item.id} className="p-3 bg-[#FDF8F9] rounded-xl flex items-center justify-between border border-[#F7E8EB]">
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* MÓDULO 3: QG DA ROTINA */}
        {activeTab === 'rotina' && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4] space-y-4">
            <h2 className="font-serif text-lg text-[#F0657D] flex items-center gap-2 font-semibold">
              <Clock size={20} className="text-[#F0657D]" /> QG da Rotina
            </h2>
            <div className="flex gap-1.5 bg-[#FDF8F9] p-1.5 rounded-xl border border-[#F7E8EB] text-xs">
              {['bebe', 'crianca', 'adolescente'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setAgeGroup(cat)}
                  className={`flex-1 py-2 capitalize rounded-lg font-medium transition ${ageGroup === cat ? 'bg-white shadow-sm text-[#F0657D] font-bold' : 'text-[#8A7572]'}`}
                >
                  {cat === 'bebe' ? 'Bebê' : cat === 'crianca' ? 'Criança' : 'Jovem'}
                </button>
              ))}
            </div>

            <div className="space-y-2 mt-3">
              {routines[ageGroup].map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-[#FDF0F2]/70 rounded-xl text-xs items-center border border-[#FA2B52]/10">
                  <span className="font-bold text-[#F0657D] min-w-[48px]">{item.time}</span>
                  <span className="text-[#4A3B32]">{item.act}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MÓDULO 4: FINANÇAS E DESAPEGOS */}
        {activeTab === 'financas' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h2 className="font-serif text-lg text-[#F0657D] mb-3 flex items-center gap-2 font-semibold">
                <Wallet size={18} className="text-[#F0657D]" /> Finanças Infantis
              </h2>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  placeholder="Gasto (ex: Fraldas)" 
                  className="flex-1 p-3 border border-[#E8D3D6] bg-[#FDFBFB] rounded-xl text-xs"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="R$" 
                  className="w-20 p-3 border border-[#E8D3D6] bg-[#FDFBFB] rounded-xl text-xs"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                />
                <button onClick={addExpense} className="bg-[#F0657D] text-white px-3.5 rounded-xl">
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-xs font-semibold text-[#D84361] pt-1">
                Total acumulado: R$ {expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F5E0E4]">
              <h2 className="font-serif text-base text-[#2D7A1E] mb-3 flex items-center gap-2 font-semibold">
                <RefreshCw size={18} className="text-[#2D7A1E]" /> Brechó & Desapegos
              </h2>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  placeholder="Item para desapegar..." 
                  className="flex-1 p-3 border border-[#E8D3D6] bg-[#FDFBFB] rounded-xl text-xs"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="R$" 
                  className="w-20 p-3 border border-[#E8D3D6] bg-[#FDFBFB] rounded-xl text-xs"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
                <button onClick={addItemToSell} className="bg-[#2D7A1E] text-white px-3.5 rounded-xl">
                  <Plus size={18} />
                </button>
              </div>
              <ul className="space-y-1.5 text-xs">
                {itemsToSell.map((item) => (
                  <li key={item.id} className="p-3 bg-[#F0F7EF] rounded-xl flex justify-between items-center border border-[#D9EBD7]">
                    <span>{item.title}</span>
                    <span className="font-semibold text-[#2D7A1E]">R$ {item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </main>

      {/* BARRA DE NAVEGAÇÃO INFERIOR NAS CORES DA MARCA */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#F5E0E4] flex justify-around py-3 px-2 shadow-lg">
        <button 
          onClick={() => setActiveTab('rastreador')} 
          className={`flex flex-col items-center text-[11px] transition ${activeTab === 'rastreador' ? 'text-[#F0657D] font-bold' : 'text-[#A08885]'}`}
        >
          <Baby size={20} />
          <span className="mt-1">Bebê</span>
        </button>
        <button 
          onClick={() => setActiveTab('casa')} 
          className={`flex flex-col items-center text-[11px] transition ${activeTab === 'casa' ? 'text-[#2D7A1E] font-bold' : 'text-[#A08885]'}`}
        >
          <Home size={20} />
          <span className="mt-1">Casa</span>
        </button>
        <button 
          onClick={() => setActiveTab('rotina')} 
          className={`flex flex-col items-center text-[11px] transition ${activeTab === 'rotina' ? 'text-[#F0657D] font-bold' : 'text-[#A08885]'}`}
        >
          <Calendar size={20} />
          <span className="mt-1">Rotina</span>
        </button>
        <button 
          onClick={() => setActiveTab('financas')} 
          className={`flex flex-col items-center text-[11px] transition ${activeTab === 'financas' ? 'text-[#2D7A1E] font-bold' : 'text-[#A08885]'}`}
        >
          <Wallet size={20} />
          <span className="mt-1">Finanças</span>
        </button>
      </nav>

    </div>
  );
}
