   "use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("cardapios");
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou instalar o App");
        }
        setDeferredPrompt(null);
        setIsInstallModalOpen(false);
        setShowInstallBanner(false);
      });
    } else {
      alert(
        'Para instalar no iOS, clique no ícone de compartilhamento do Safari e selecione "Adicionar à Tela de Início".'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f6] text-slate-700 pb-24 font-sans">
      {/* PWA Install Banner Top */}
      {showInstallBanner && (
        <div className="bg-gradient-to-r from-[#e05375] to-rose-500 text-white px-4 py-3 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen-button text-xl animate-bounce" />
              <span>
                Instale o App <strong>Mãe & Cuidado</strong> no seu celular para acesso offline rápido!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallApp}
                className="bg-white text-[#e05375] font-bold px-3 py-1.5 rounded-full text-xs shadow hover:bg-rose-50 transition"
              >
                Instalar Agora
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Fechar banner"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Logo Mãe & Cuidado"
              width={56}
              height={56}
              className="h-14 w-14 object-contain rounded-full border-2 border-rose-200 p-0.5 shadow-sm"
            />
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 leading-tight">
                Mãe & Cuidado
              </h1>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <i className="fa-solid fa-shield-halved text-emerald-600" /> Nutrição Atualizada SBP
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="flex items-center gap-2 bg-rose-50 text-[#e05375] border border-rose-200 px-3 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition shadow-sm"
          >
            <i className="fa-solid fa-download" />
            <span className="hidden sm:inline">Baixar App</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <nav className="flex overflow-x-auto gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 text-sm font-semibold scrollbar-none">
          <button
            onClick={() => setActiveTab("cardapios")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === "cardapios"
                ? "bg-[#e05375] text-white shadow-[0_4px_12px_rgba(224,83,117,0.25)]"
                : "text-slate-600 hover:bg-rose-50"
            }`}
          >
            <i className="fa-solid fa-calendar-days" /> Cardápios
          </button>

          <button
            onClick={() => setActiveTab("base-unica")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === "base-unica"
                ? "bg-[#e05375] text-white shadow-[0_4px_12px_rgba(224,83,117,0.25)]"
                : "text-slate-600 hover:bg-rose-50"
            }`}
          >
            <i className="fa-solid fa-utensils" /> Base Única SOS
          </button>

          <button
            onClick={() => setActiveTab("cortes")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === "cortes"
                ? "bg-[#e05375] text-white shadow-[0_4px_12px_rgba(224,83,117,0.25)]"
                : "text-slate-600 hover:bg-rose-50"
            }`}
          >
            <i className="fa-solid fa-apple-whole" /> Guia de Cortes
          </button>

          <button
            onClick={() => setActiveTab("compras")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === "compras"
                ? "bg-[#e05375] text-white shadow-[0_4px_12px_rgba(224,83,117,0.25)]"
                : "text-slate-600 hover:bg-rose-50"
            }`}
          >
            <i className="fa-solid fa-cart-shopping" /> Lista Compras
          </button>

          <button
            onClick={() => setActiveTab("seguranca")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === "seguranca"
                ? "bg-[#e05375] text-white shadow-[0_4px_12px_rgba(224,83,117,0.25)]"
                : "text-slate-600 hover:bg-rose-50"
            }`}
          >
            <i className="fa-solid fa-heart-pulse" /> GAG vs Engasgo
          </button>
        </nav>

        {/* TAB 1: CARDÁPIOS */}
        {activeTab === "cardapios" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  28 Dias de Refeições Equilibradas
                </span>
                <h2 className="text-2xl font-black mb-1">Cardápios da Família & Bebê</h2>
                <p className="text-rose-100 text-sm max-w-xl">
                  Base única de refeição para todos com adaptação de texturas e temperos para cada fase da introdução alimentar (6m, 9m, 12m+).
                </p>
              </div>
              <i className="fa-solid fa-bowl-food text-white/10 text-9xl absolute -right-4 -bottom-6" />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500">Selecione uma opção de menu para visualizar.</p>
            </div>
          </section>
        )}

        {/* TAB 2: BASE ÚNICA */}
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
              <i className="fa-solid fa-kitchen-set text-white/10 text-9xl absolute -right-4 -bottom-6" />
            </div>
          </section>
        )}

        {/* TAB 3: GUIA DE CORTES */}
        {activeTab === "cortes" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Anatomia do Corte Seguro
                </span>
                <h2 className="text-2xl font-black mb-1">Como Oferecer Alimentos Com Segurança</h2>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: LISTA DE COMPRAS */}
        {activeTab === "compras" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-1">Lista de Compras Inteligente</h2>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: SEGURANÇA */}
        {activeTab === "seguranca" && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-1">Reflexo de GAG vs. Engasgo Verdadeiro</h2>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal: Baixar App / PWA */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsInstallModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 text-lg"
              aria-label="Fechar modal"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-rose-100 text-[#e05375] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                <i className="fa-solid fa-mobile-screen-button" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">Como Baixar o Aplicativo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Você pode adicionar este aplicativo diretamente na tela inicial do seu celular sem precisar de loja de aplicativos.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl text-left space-y-2 text-xs text-slate-700">
                <p>
                  <strong>no iPhone (Safari):</strong> Clique no botão{" "}
                  <i className="fa-solid fa-share-nodes text-[#e05375]" /> (Compartilhar) e selecione{" "}
                  <strong>"Adicionar à Tela de Início"</strong>.
                </p>
                <p>
                  <strong>no Android (Chrome):</strong> Clique no botão de instalar abaixo ou no menu de 3 pontos do navegador e selecione{" "}
                  <strong>"Instalar aplicativo"</strong>.
                </p>
              </div>

              <button
                onClick={handleInstallApp}
                className="w-full bg-[#e05375] text-white font-bold py-3 rounded-xl shadow-md hover:bg-rose-600 transition"
              >
                Instalar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}             
