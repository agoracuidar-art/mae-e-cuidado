"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Smartphone,
  X,
  ShieldCheck,
  Download,
  Calendar,
  Utensils,
  Apple,
  ShoppingCart,
  HeartPulse,
  Bowl,
  Pepper,
  CircleCheck,
  CircleXmark,
  TriangleAlert,
  RotateCcw,
  Plus,
  Grimace,
  TruckMedical,
  Sun,
  Moon,
  Zap,
  Citrus,
  Baby,
  Smile,
  Users,
  ChevronRight,
  Share2,
  MoreVertical,
} from "lucide-react";

// Base de Dados dos Cardápios (4 Semanas)
const menuData = {
  1: {
    Segunda: {
      almoco: {
        base: "Arroz Integral, Feijão Carioca, Patinho Moído Refogado e Abóbora Cozida",
        baby6m: "Abóbora em bastão cozido no vapor + carne moída úmida + caldinho de feijão.",
        baby9m: "Arroz levemente amassado, feijão inteiro cozido macio, carne moída e abóbora em pedacinhos.",
        baby12m: "Comida da família cortada de forma adequada.",
        ferro: true,
        vitc: "Laranja Pera fatiada",
      },
      jantar: {
        base: "Sopa cremosa de Legumes com Frango Desfiado e Macarrão Alfabeto",
        baby6m: "Legumes amassados com garfo (cenoura, batata doce) + frango desfiado bem fininho.",
        baby9m: "Legumes picadinhos macios, frango picado e macarrão macio.",
        baby12m: "Sopa em pedaços para autoalimentação com colher.",
        ferro: true,
        vitc: "Goiaba vermelha",
      },
    },
    Terça: {
      almoco: {
        base: "Iscas de Peito de Frango grelhado nas ervas, Mandioquinha e Brócolis no vapor",
        baby6m: "Brócolis com talo grande, mandioquinha em bastão macio e tira grossa de frango.",
        baby9m: "Brócolis picado em floretes pequenos, mandioquinha em cubos e frango desfiado.",
        baby12m: "Mesma refeição da família cortada adequadamente.",
        ferro: false,
        vitc: "Manga Rosa",
      },
      jantar: {
        base: "Omelete de Forno com Espinafre, Tomate e Batata Doce Assada",
        baby6m: "Tira de omelete bem passada (sem sal) + bastão de batata doce assada sem casca.",
        baby9m: "Omelete picadinho e cubos de batata doce.",
        baby12m: "Pedaços de omelete e batata doce em rodelas/bastões.",
        ferro: true,
        vitc: "Morango fatiado",
      },
    },
    Quarta: {
      almoco: {
        base: "Arroz Branco, Lentilha Cozida com Ervas, Iscas de Carne Bovina e Couve Refogada",
        baby6m: "Tira longa de carne macia para chupar + grãos de lentilha amassados + purê de couve.",
        baby9m: "Lentilha inteira cozida, carne em cubinhos pequenos e couve picada bem fina.",
        baby12m: "Prato idêntico ao da família com corte seguro.",
        ferro: true,
        vitc: "Abacaxi maduro",
      },
      jantar: {
        base: "Creme de Mandioca com Carne Seca Dessalgada e Desfiada e Cheiro Verde",
        baby6m: "Purê de mandioca sem sal + carne desfiada bem úmida e batida/desfiada fina.",
        baby9m: "Mandioca em pedaços macios e carne seca bem desfiadinha.",
        baby12m: "Creme espesso com pedacinhos de mandioca e carne.",
        ferro: true,
        vitc: "Acerola ou Caju",
      },
    },
    Quinta: {
      almoco: {
        base: "Purê de Inhame, Feijão Preto, Sobrecoxa de Frango Assada e Chuchu no Vapor",
        baby6m: "Coxa de frango sem pele (para segurar no osso) + purê de inhame + bastão de chuchu.",
        baby9m: "Frango desfiado, inhame em cubos pequenos e chuchu em pedaços macios.",
        baby12m: "Frango picado sem osso com purê e legumes.",
        ferro: true,
        vitc: "Mamão Formosa",
      },
      jantar: {
        base: "Macarrão de Polpa Integral ao Molho Caseiro de Tomate com Carne Moída",
        baby6m: "Macarrão fusilli/parafuso bem cozido inteiro + molho de tomate natural picadinho.",
        baby9m: "Macarrão picadinho com carne moída ao molho.",
        baby12m: "Macarrão inteiro com molho encorpado.",
        ferro: true,
        vitc: "Melancia fatiada",
      },
    },
    Sexta: {
      almoco: {
        base: "Filé de Peixe (Tilápia) Assado com Ervas, Arroz com Cúrcuma e Purê de Abóbora",
        baby6m: "Filé de peixe minuciosamente verificado sem espinhas + purê de abóbora.",
        baby9m: "Lascas de peixe, arroz amarelinho soltinho e abóbora em cubinhos.",
        baby12m: "Posta de peixe grelhada com acompanhamentos.",
        ferro: false,
        vitc: "Tangerina/Mexerica sem semente",
      },
      jantar: {
        base: "Sopa de Grão-de-Bico com Legumes (Cenoura, Batata e Espinafre)",
        baby6m: "Grão-de-bico sem pele amassado no garfo + legumes em bastão macio.",
        baby9m: "Grão-de-bico levemente pressionado + legumes em cubos.",
        baby12m: "Sopa nutritiva completa.",
        ferro: true,
        vitc: "Kiwi em rodelas",
      },
    },
    Sábado: {
      almoco: {
        base: "Feijoada Leve (Feijão Preto, Músculo Bovino, Lombo Magro), Arroz e Couve",
        baby6m: "Caldinho espesso de feijão + músculo macio em pedaço grande + bastão de laranja.",
        baby9m: "Feijão amassadinho com carne desfiada e couve bem picadinha.",
        baby12m: "Refeição completa adaptada sem embutidos.",
        ferro: true,
        vitc: "Laranja Seleta",
      },
      jantar: {
        base: "Panqueca de Aveia Recheada com Frango e Reta de Espinafre",
        baby6m: "Tiras de panqueca macia para o bebê segurar e levar à boca.",
        baby9m: "Panqueca cortada em quadradinhos pequenos.",
        baby12m: "Panqueca inteira enroladinha.",
        ferro: true,
        vitc: "Morangos frescos",
      },
    },
    Domingo: {
      almoco: {
        base: "Polenta Caseira com Molho de Carne Moída e Abobrinha Refogada",
        baby6m: "Bastão de polenta firme no forno + abobrinha em tiras cozidas.",
        baby9m: "Polenta cremosa com carne moída e abobrinha picada.",
        baby12m: "Prato da família montado.",
        ferro: true,
        vitc: "Goiaba fatiada",
      },
      jantar: {
        base: "Canja de Galinha com Arroz Integral, Cenoura e Batata",
        baby6m: "Canja bem amassadinha com o garfo e frango desfiado fino.",
        baby9m: "Canja rústica em pedacinhos cozidos.",
        baby12m: "Canja tradicional em cumbuca.",
        ferro: true,
        vitc: "Melão em cubos",
      },
    },
  },
};

const cutsData = {
  "6m": [
    { title: "Banana", desc: "Ofereça com metade da casca mantida (bem lavada) para facilitar a pegada do bebê sem escorregar." },
    { title: "Cenoura", desc: "Corte em formato de bastão (tamanho do dedo indicador do adulto) e cozinhe até ficar macia." },
    { title: "Carne Bovina", desc: "Pedaço grande da largura de 2 a 3 dedos para o bebê chupar os nutrientes e suco da carne." },
  ],
  "9m": [
    { title: "Frutas em Cubos", desc: "Corte morangos, mangas e bananas em pedacinhos pequenos para incentivar o movimento de pinça." },
    { title: "Vegetais Cozidos", desc: "Cubos pequenos de batata, cenoura e abobrinha bem cozidos." },
  ],
  "12m": [
    { title: "Alimentos Inteiros e Cortados", desc: "A criança já transita com facilidade para a textura e formato da mesa da família." },
  ],
};

const initialShoppingList = {
  Hortifrúti: [
    { name: "Abóbora Cabotiá", checked: false },
    { name: "Brócolis Americano", checked: false },
    { name: "Cenoura", checked: false },
    { name: "Laranja Pera", checked: false },
    { name: "Banana Prata", checked: false },
    { name: "Mandioquinha / Inhame", checked: false },
    { name: "Couve Fresca", checked: false },
  ],
  "Açougue / Proteínas": [
    { name: "Patinho Moído", checked: false },
    { name: "Peito de Frango / Sasami", checked: false },
    { name: "Músculo ou Coxão Mole", checked: false },
    { name: "Filé de Tilápia / Peixe Branco", checked: false },
    { name: "Ovos caipiras", checked: false },
  ],
  "Mercearia & Grãos": [
    { name: "Feijão Carioca e Preto", checked: false },
    { name: "Lentilha / Grão-de-Bico", checked: false },
    { name: "Arroz Integral / 7 Grãos", checked: false },
    { name: "Macarrão Fusilli / Letrinhas", checked: false },
    { name: "Azeite de Oliva Extra Virgem", checked: false },
  ],
};

export default function MaeECuidadoApp() {
  const [activeTab, setActiveTab] = useState("cardapios");
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState("Segunda");
  const [cutAge, setCutAge] = useState("6m");
  const [shoppingList, setShoppingList] = useState(initialShoppingList);

  // Estados PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      });
    } else {
      setShowInstallModal(true);
    }
  };

  const toggleShoppingItem = (category, index) => {
    setShoppingList((prev) => {
      const updatedCat = [...prev[category]];
      updatedCat[index].checked = !updatedCat[index].checked;
      return { ...prev, [category]: updatedCat };
    });
  };

  const clearCheckedItems = () => {
    setShoppingList((prev) => {
      const reset = {};
      for (const cat in prev) {
        reset[cat] = prev[cat].map((item) => ({ ...item, checked: false }));
      }
      return reset;
    });
  };

  const addCustomShoppingItem = () => {
    const name = prompt("Digite o nome do item para adicionar:");
    if (name) {
      setShoppingList((prev) => ({
        ...prev,
        Outros: [...(prev.Outros || []), { name, checked: false }],
      }));
    }
  };

  const totalShoppingItems = Object.values(shoppingList).reduce((acc, curr) => acc + curr.length, 0);
  const checkedShoppingItems = Object.values(shoppingList).reduce(
    (acc, curr) => acc + curr.filter((i) => i.checked).length,
    0
  );

  const activeDayMeal = (menuData[currentWeek] || menuData[1])[currentDay] || menuData[1]["Segunda"];

  return (
    <div className="min-h-screen bg-[#fcf8f6] text-slate-700 font-sans pb-24">
      {/* Banner PWA do Topo */}
      {showInstallBanner && (
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-3 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Smartphone className="animate-bounce" size={18} />
              <span>Instale o App <strong>Mãe & Cuidado</strong> no seu celular para acesso offline!</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="bg-white text-pink-600 font-bold px-3 py-1.5 rounded-full text-xs shadow hover:bg-pink-50 transition"
              >
                Instalar Agora
              </button>
              <button onClick={() => setShowInstallBanner(false)} className="text-white/80 hover:text-white p-1">
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Sticky com Botão de Instalar Pequeno */}
      <header className="bg-white border-b border-pink-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-pink-200 shadow-sm shrink-0">
              <Image src="/logo.png" alt="Logo Mãe & Cuidado" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 leading-tight">Mãe & Cuidado</h1>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Nutrição Atualizada SBP
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInstallModal(true)}
            className="flex items-center gap-1.5 bg-pink-50 text-pink-600 border border-pink-200 px-2.5 py-1.5 rounded-xl text-xs font-bold hover:bg-pink-100 transition shadow-xs"
          >
            <Download size={14} />
            <span>Instalar</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Navegação por Abas */}
        <nav className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 text-sm font-semibold">
          {[
            { id: "cardapios", label: "Cardápios", icon: Calendar },
            { id: "base-unica", label: "Base Única SOS", icon: Utensils },
            { id: "cortes", label: "Guia de Cortes", icon: Apple },
            { id: "compras", label: "Lista Compras", icon: ShoppingCart },
            { id: "seguranca", label: "GAG vs Engasgo", icon: HeartPulse },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
                  isActive
                    ? "bg-pink-400 text-white shadow-md shadow-pink-200"
                    : "text-slate-600 hover:bg-pink-50"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ABA 1: CARDÁPIOS */}
        {activeTab === "cardapios" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-300 rounded-3xl p-6 text-slate-800 shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/40 backdrop-blur-md text-pink-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  28 Dias de Refeições Equilibradas
                </span>
                <h2 className="text-2xl font-black mb-1 text-slate-900">Cardápios da Família & Bebê</h2>
                <p className="text-slate-700 text-sm max-w-xl">
                  Base única de refeição para todos com adaptação de texturas e temperos para cada fase da introdução alimentar (6m, 9m, 12m+).
                </p>
              </div>
            </div>

            {/* Seleção de Semanas */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Selecione a Semana de Planejamento:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    onClick={() => setCurrentWeek(w)}
                    className={`py-3 rounded-xl font-bold text-sm text-center transition ${
                      currentWeek === w
                        ? "border-2 border-pink-400 bg-pink-50 text-pink-600 shadow-xs"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Semana {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de Dias */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 py-1">
              {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`py-2 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition ${
                    currentDay === day
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {day}-feira
                </button>
              ))}
            </div>

            {/* Exibição das Refeições */}
            <div className="space-y-6">
              {/* Almoço */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-bold">
                      <Sun size={20} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Almoço</h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {currentDay} - Semana {currentWeek}
                      </span>
                    </div>
                  </div>
                  {activeDayMeal.almoco.ferro && (
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap size={10} /> Rico em Ferro
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Base da Família (Sem Sal)
                  </span>
                  <p class="text-sm font-bold text-slate-800">{activeDayMeal.almoco.base}</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100">
                    <span className="text-xs font-extrabold text-pink-700 block mb-0.5 flex items-center gap-1">
                      <Baby size={12} /> Adaptação 6 a 8 Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.almoco.baby6m}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-xs font-extrabold text-emerald-700 block mb-0.5 flex items-center gap-1">
                      <Smile size={12} /> Adaptação 9 a 11 Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.almoco.baby9m}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <span className="text-xs font-extrabold text-indigo-700 block mb-0.5 flex items-center gap-1">
                      <Users size={12} /> Adaptação 12+ Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.almoco.baby12m}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold flex items-center gap-1.5">
                    <Citrus size={14} className="text-amber-500" /> Ativador Vitamina C:
                  </span>
                  <span className="font-semibold text-slate-800">{activeDayMeal.almoco.vitc}</span>
                </div>
              </div>

              {/* Jantar */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold">
                      <Moon size={20} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Jantar</h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {currentDay} - Semana {currentWeek}
                      </span>
                    </div>
                  </div>
                  {activeDayMeal.jantar.ferro && (
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap size={10} /> Rico em Ferro
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Base da Família (Sem Sal)
                  </span>
                  <p className="text-sm font-bold text-slate-800">{activeDayMeal.jantar.base}</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100">
                    <span className="text-xs font-extrabold text-pink-700 block mb-0.5 flex items-center gap-1">
                      <Baby size={12} /> Adaptação 6 a 8 Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.jantar.baby6m}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-xs font-extrabold text-emerald-700 block mb-0.5 flex items-center gap-1">
                      <Smile size={12} /> Adaptação 9 a 11 Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.jantar.baby9m}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <span className="text-xs font-extrabold text-indigo-700 block mb-0.5 flex items-center gap-1">
                      <Users size={12} /> Adaptação 12+ Meses:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{activeDayMeal.jantar.baby12m}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold flex items-center gap-1.5">
                    <Citrus size={14} className="text-amber-500" /> Sobremesa Vitamina C:
                  </span>
                  <span className="font-semibold text-slate-800">{activeDayMeal.jantar.vitc}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABA 2: BASE ÚNICA SOS */}
        {activeTab === "base-unica" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Método Mãe & Cuidado
                </span>
                <h2 className="text-2xl font-black mb-1">Cozinhe Uma Vez para Todos</h2>
                <p className="text-emerald-100 text-sm max-w-xl">
                  Como preparar a comida da casa mantendo a praticidade, sem precisar fazer duas panelas separadas do zero.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">
                  1
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Refogado Base Sem Sal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cozinhe a proteína, grãos e legumes usando temperos naturais livres (alho, cebola, azeite, salsinha, orégano, cúrcuma). <strong>NADA de sal ou caldos prontos.</strong>
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">
                  2
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Separe a Porção do Bebê</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Antes de finalizar a comida dos adultos, retire a porção do bebê e ajuste a textura necessária para a idade dele (bastões amassáveis ou pedacinhos macios).
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">
                  3
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Finalize para a Família</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Adicione o sal com moderação e seus temperos favoritos (pimenta, molhos caseiros) na panela principal da família. Prático e nutritivo para todos!
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <Pepper size={18} className="text-pink-500" /> Guia de Temperos na Introdução Alimentar
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
                    <CircleCheck size={16} className="text-emerald-600" /> PERMITIDOS E RECOMENDADOS (Liberados)
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2">
                    <li><strong>Aromáticos:</strong> Alho, cebola, cebolinha, salsinha, alho-poró.</li>
                    <li><strong>Ervas Frescas/Secas:</strong> Orégano, manjericão, tomilho, alecrim, coentro.</li>
                    <li><strong>Especiarias Suaves:</strong> Cúrcuma (azafrão da terra), páprica doce, cominho.</li>
                    <li><strong>Gordura Boa:</strong> Azeite de oliva extra virgem adicionado ao prato pronto.</li>
                  </ul>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                  <h4 className="font-bold text-rose-800 text-sm mb-3 flex items-center gap-2">
                    <CircleXmark size={16} className="text-rose-600" /> PROIBIDOS / EVITAR
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2">
                    <li><strong>Sal Adicionado:</strong> Proibido até 1 ano (sobrecarrega os rins).</li>
                    <li><strong>Açúcar e Adoçantes:</strong> Proibido até 2 anos.</li>
                    <li><strong>Industrializados:</strong> Caldos em cubo, tempero pronto, shoyu, ketchup.</li>
                    <li><strong>Mel:</strong> Proibido até 1 ano (risco de Botulismo infantil).</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABA 3: CORTES */}
        {activeTab === "cortes" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Anatomia do Corte Seguro (BLW e Tradicional)
                </span>
                <h2 className="text-2xl font-black mb-1">Como Oferecer Alimentos Com Segurança</h2>
                <p className="text-amber-100 text-sm max-w-xl">
                  Consistência correta e formatos seguros para prevenir engasgos em cada fase do bebê.
                </p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {[
                { id: "6m", label: "6 a 8 Meses (Bastões)" },
                { id: "9m", label: "9 a 11 Meses (Movimento Pinça)" },
                { id: "12m", label: "12+ Meses (Comida da Família)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setCutAge(btn.id)}
                  className={`font-bold py-2.5 px-5 rounded-2xl text-xs whitespace-nowrap transition ${
                    cutAge === btn.id
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {cutsData[cutAge].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0 font-bold">
                    <Apple size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA 4: LISTA DE COMPRAS */}
        {activeTab === "compras" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Sincronizada com seu Planejamento
                </span>
                <h2 className="text-2xl font-black mb-1">Lista de Compras Inteligente</h2>
                <p className="text-blue-100 text-sm max-w-xl">
                  Marque o que já tem em casa e leve ao supermercado para não esquecer nenhum item essencial.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-xs font-bold text-slate-700">
                Itens Marcados: <span className="text-pink-600 font-extrabold text-sm">{checkedShoppingItems}</span> / {totalShoppingItems}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCheckedItems}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl transition flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Desmarcar Todos
                </button>
                <button
                  onClick={addCustomShoppingItem}
                  className="text-xs bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-2 rounded-xl shadow-xs transition flex items-center gap-1"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(shoppingList).map(([cat, items]) => (
                <div key={cat} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-1">
                    <ChevronRight size={16} className="text-pink-500" /> {cat}
                  </h4>
                  <div className="space-y-2">
                    {items.map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleShoppingItem(cat, idx)}
                          className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
                        />
                        <span className={`text-xs font-medium ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>
                          {item.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA 5: SEGURANÇA */}
        {activeTab === "seguranca" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Tranquilidade Para os Pais
                </span>
                <h2 className="text-2xl font-black mb-1">Reflexo de GAG vs. Engasgo Verdadeiro</h2>
                <p className="text-rose-100 text-sm max-w-xl">
                  Aprenda a reconhecer a diferença fisiológica para agir com calma e segurança.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* GAG */}
              <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-300 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-black">
                    <Grimace size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-900 text-lg">REFLEXO DE GAG (Normal)</h3>
                    <span className="text-xs font-bold text-amber-700 uppercase">Mecanismo de Proteção</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                  <li><strong>Faz barulho:</strong> O bebê tosse, faz ânsia ou ruídos com a boca.</li>
                  <li><strong>Cor normal:</strong> O rosto pode ficar levemente avermelhado pelo esforço.</li>
                  <li><strong>Ação de expelir:</strong> O bebê projeta o alimento sozinho para a frente da boca.</li>
                  <li><strong>O QUE FAZER:</strong> Mantenha a calma! Não ponha a mão na boca do bebê. Apenas observe encorajando.</li>
                </ul>
              </div>

              {/* Engasgo */}
              <div className="bg-rose-50 rounded-2xl p-6 border-2 border-rose-400 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl font-black animate-pulse">
                    <TriangleAlert size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-rose-900 text-lg">ENGASGO (Emergência)</h3>
                    <span className="text-xs font-bold text-rose-700 uppercase">Obstrução Total da Via Aérea</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                  <li><strong>Silêncio total:</strong> O bebê NÃO consegue tossir, chorar ou emitir som.</li>
                  <li><strong>Alteração de cor:</strong> Os lábios e o rosto ficam pálidos ou cianóticos (azulados).</li>
                  <li><strong>Olhos arregalados:</strong> Dificuldade visível e pânico para puxar o ar.</li>
                  <li><strong>O QUE FAZER:</strong> Inicie a <strong>Manobra de Desengasgo Infantil</strong> e chame o SAMU (192).</li>
                </ul>
              </div>
            </div>

            {/* Passo a Passo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
                <TruckMedical size={18} className="text-rose-600" /> Passo a Passo da Manobra em Bebês (Menores de 1 Ano)
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-extrabold text-rose-600 mb-1">Passo 1: Posição Inclinada</div>
                  <p className="text-slate-600 leading-relaxed">
                    Coloque o bebê de bruços sobre o seu antebraço, com a cabeça mais baixa que o corpo, apoiando a mandíbula.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-extrabold text-rose-600 mb-1">Passo 2: 5 Tapas nas Costas</div>
                  <p className="text-slate-600 leading-relaxed">
                    Dê <strong>5 tapas firmes</strong> nas costas do bebê, no meio das escápulas, com a base da mão.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-extrabold text-rose-600 mb-1">Passo 3: 5 Compressões no Toráx</div>
                  <p className="text-slate-600 leading-relaxed">
                    Vire o bebê e faça <strong>5 compressões no tórax</strong> com 2 dedos, no centro do peito. Repita.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal de Instalação PWA */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <Smartphone size={32} />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">Instalar Mãe & Cuidado</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Adicione à tela inicial do seu celular para abrir como um aplicativo nativo, sem precisar de internet!
            </p>
            <div className="bg-slate-50 p-3 rounded-2xl text-left text-xs text-slate-600 mb-5 space-y-2">
              <p className="flex items-center gap-1.5">
                <strong>iOS (iPhone):</strong> Toque em <Share2 size={12} /> no Safari e selecione <em>"Adicionar à Tela de Início"</em>.
              </p>
              <p className="flex items-center gap-1.5">
                <strong>Android:</strong> Toque nos 3 pontos <MoreVertical size={12} /> do Chrome e selecione <em>"Instalar aplicativo"</em>.
              </p>
            </div>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-pink-600 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
