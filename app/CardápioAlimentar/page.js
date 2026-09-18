<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Mãe & Cuidado - Nutrição & Introdução Alimentar</title>
    
    <!-- PWA & Mobile Meta Tags -->
    <meta name="theme-color" content="#fbcfe8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Mãe&Cuidado">
    <link rel="apple-touch-icon" href="logo.jpg">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brandPink: '#e05375',
                        brandPinkLight: '#fde8ef',
                        brandGreen: '#2e7d32',
                        brandGreenLight: '#e8f5e9',
                        brandCream: '#fdfbf7',
                        brandDark: '#2d3748'
                    },
                    fontFamily: {
                        sans: ['Nunito', 'sans-serif']
                    }
                }
            }
        }
    </script>

    <!-- Google Fonts & FontAwesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
            background-color: #fcf8f6;
            color: #334155;
            -webkit-tap-highlight-color: transparent;
        }
        .tab-btn.active {
            background-color: #e05375;
            color: white;
            box-shadow: 0 4px 12px rgba(224, 83, 117, 0.25);
        }
        .subtab-btn.active {
            border-bottom: 3px solid #2e7d32;
            color: #2e7d32;
            font-weight: 700;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .badge-ferro { background-color: #fee2e2; color: #991b1b; }
        .badge-vitc { background-color: #fef3c7; color: #92400e; }
        .badge-proteina { background-color: #e0e7ff; color: #3730a3; }
        .modal-backdrop {
            background-color: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px);
        }
    </style>
</head>
<body class="pb-24">

    <!-- PWA Install Banner Top -->
    <div id="installBanner" class="hidden bg-gradient-to-r from-brandPink to-rose-500 text-white px-4 py-3 shadow-md">
        <div class="max-w-4xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-mobile-screen-button text-xl animate-bounce"></i>
                <span>Instale o App <strong>Mãe & Cuidado</strong> no seu celular para acesso offline rápido!</span>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="installApp()" class="bg-white text-brandPink font-bold px-3 py-1.5 rounded-full text-xs shadow hover:bg-rose-50 transition">Instalar Agora</button>
                <button onclick="closeInstallBanner()" class="text-white/80 hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    </div>

    <!-- Header Section -->
    <header class="bg-white border-b border-rose-100 sticky top-0 z-30 shadow-sm">
        <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <img src="logo.jpg" alt="Logo Mãe & Cuidado" class="h-14 w-14 object-contain rounded-full border-2 border-rose-200 p-0.5 shadow-sm" onerror="this.src='https://via.placeholder.com/60?text=App'">
                <div>
                    <h1 class="text-xl font-extrabold text-slate-800 leading-tight">Mãe & Cuidado</h1>
                    <p class="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <i class="fa-solid fa-shield-halved text-emerald-600"></i> Nutrição Atualizada SBP
                    </p>
                </div>
            </div>
            <button onclick="openInstallModal()" class="flex items-center gap-2 bg-rose-50 text-brandPink border border-rose-200 px-3 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition shadow-sm">
                <i class="fa-solid fa-download"></i>
                <span class="hidden sm:inline">Baixar App</span>
            </button>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="max-w-4xl mx-auto px-4 py-6">

        <!-- Navigation Tabs -->
        <nav class="flex overflow-x-auto hide-scrollbar gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 text-sm font-semibold">
            <button onclick="switchTab('cardapios')" id="tab-cardapios" class="tab-btn active flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition">
                <i class="fa-solid fa-calendar-days"></i> Cardápios
            </button>
            <button onclick="switchTab('base-unica')" id="tab-base-unica" class="tab-btn flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-rose-50 transition">
                <i class="fa-solid fa-utensils"></i> Base Única SOS
            </button>
            <button onclick="switchTab('cortes')" id="tab-cortes" class="tab-btn flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-rose-50 transition">
                <i class="fa-solid fa-apple-whole"></i> Guia de Cortes
            </button>
            <button onclick="switchTab('compras')" id="tab-compras" class="tab-btn flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-rose-50 transition">
                <i class="fa-solid fa-cart-shopping"></i> Lista Compras
            </button>
            <button onclick="switchTab('seguranca')" id="tab-seguranca" class="tab-btn flex-1 min-w-[130px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-rose-50 transition">
                <i class="fa-solid fa-heart-pulse"></i> GAG vs Engasgo
            </button>
        </nav>

        <!-- ================= TAB 1: CARDÁPIOS (4 SEMANAS) ================= -->
        <section id="sec-cardapios" class="space-y-6">
            <div class="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                    <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">28 Dias de Refeições Equilibradas</span>
                    <h2 class="text-2xl font-black mb-1">Cardápios da Família & Bebê</h2>
                    <p class="text-rose-100 text-sm max-w-xl">Base única de refeição para todos com adaptação de texturas e temperos para cada fase da introdução alimentar (6m, 9m, 12m+).</p>
                </div>
                <i class="fa-solid fa-bowl-food text-white/10 text-9xl absolute -right-4 -bottom-6"></i>
            </div>

            <!-- Selector: Weeks -->
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Selecione a Semana de Planejamento:</div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button onclick="selectWeek(1)" id="btn-week-1" class="week-btn py-3 rounded-xl border-2 border-brandPink bg-rose-50 text-brandPink font-bold text-sm text-center shadow-xs">Semana 1</button>
                    <button onclick="selectWeek(2)" id="btn-week-2" class="week-btn py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm text-center hover:bg-slate-50">Semana 2</button>
                    <button onclick="selectWeek(3)" id="btn-week-3" class="week-btn py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm text-center hover:bg-slate-50">Semana 3</button>
                    <button onclick="selectWeek(4)" id="btn-week-4" class="week-btn py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm text-center hover:bg-slate-50">Semana 4</button>
                </div>
            </div>

            <!-- Selector: Day of Week -->
            <div class="flex overflow-x-auto hide-scrollbar gap-2 py-1" id="daysBar">
                <button onclick="selectDay('Segunda')" class="day-btn active py-2 px-4 rounded-xl bg-slate-800 text-white font-bold text-xs whitespace-nowrap shadow">Segunda-feira</button>
                <button onclick="selectDay('Terça')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Terça-feira</button>
                <button onclick="selectDay('Quarta')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Quarta-feira</button>
                <button onclick="selectDay('Quinta')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Quinta-feira</button>
                <button onclick="selectDay('Sexta')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Sexta-feira</button>
                <button onclick="selectDay('Sábado')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Sábado</button>
                <button onclick="selectDay('Domingo')" class="day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50">Domingo</button>
            </div>

            <!-- Meal Content Display -->
            <div id="mealDisplayArea" class="space-y-6">
                <!-- Populated dynamically -->
            </div>
        </section>

        <!-- ================= TAB 2: MÉTODO BASE ÚNICA (SOS FAMÍLIA) ================= -->
        <section id="sec-base-unica" class="hidden space-y-6">
            <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                    <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Método Mãe & Cuidado</span>
                    <h2 class="text-2xl font-black mb-1">Cozinhe Uma Vez para Todos</h2>
                    <p class="text-emerald-100 text-sm max-w-xl">Como preparar a comida da casa mantendo a praticidade, sem precisar fazer duas panelas separadas do zero.</p>
                </div>
                <i class="fa-solid fa-kitchen-set text-white/10 text-9xl absolute -right-4 -bottom-6"></i>
            </div>

            <div class="grid sm:grid-cols-3 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                    <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">1</div>
                    <h3 class="font-bold text-slate-800 mb-2">Refogado Base Sem Sal</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">Cozinhe a proteína, grãos e legumes usando temperos naturais livres (alho, cebola, azeite, salsinha, orégano, cúrcuma). <strong>NADA de sal ou caldos prontos.</strong></p>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                    <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">2</div>
                    <h3 class="font-bold text-slate-800 mb-2">Separe a Porção do Bebê</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">Antes de finalizar a comida dos adultos, retire a porção do bebê e ajuste a textura necessária para a idade dele (bastões amassáveis ou pedacinhos macios).</p>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                    <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg mb-3">3</div>
                    <h3 class="font-bold text-slate-800 mb-2">Finalize para a Família</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">Adicione o sal com moderação e seus temperos favoritos (pimenta, molhos caseiros) na panela principal da família. Prático e nutritivo para todos!</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 class="font-extrabold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-pepper-hot text-rose-500"></i> Guia de Temperos na Introdução Alimentar
                </h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                        <h4 class="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-circle-check text-emerald-600"></i> PERMITIDOS E RECOMENDADOS (Liberados)
                        </h4>
                        <ul class="text-xs text-slate-700 space-y-2">
                            <li class="flex items-center gap-2"><i class="fa-solid fa-leaf text-emerald-600"></i> <strong>Aromáticos:</strong> Alho, cebola, cebolinha, salsinha, alho-poró.</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-leaf text-emerald-600"></i> <strong>Ervas Frescas/Secas:</strong> Orégano, manjericão, tomilho, alecrim, coentro.</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-leaf text-emerald-600"></i> <strong>Especiarias Suaves:</strong> Cúrcuma (azafrão da terra), páprica doce, cominho (pitada).</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-leaf text-emerald-600"></i> <strong>Gordura Boa:</strong> Azeite de oliva extra virgem adicionado ao prato pronto.</li>
                        </ul>
                    </div>
                    <div class="bg-rose-50 rounded-xl p-4 border border-rose-200">
                        <h4 class="font-bold text-rose-800 text-sm mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-circle-xmark text-rose-600"></i> PROIBIDOS / EVITAR
                        </h4>
                        <ul class="text-xs text-slate-700 space-y-2">
                            <li class="flex items-center gap-2"><i class="fa-solid fa-ban text-rose-500"></i> <strong>Sal Adicionado:</strong> Proibido até 1 ano (sobrecarrega rins do bebê).</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-ban text-rose-500"></i> <strong>Açúcar e Adoçantes:</strong> Proibido até 2 anos.</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-ban text-rose-500"></i> <strong>Industrializados:</strong> Caldos em cubo, saquinhos de tempero pronto, shoyu, ketchup.</li>
                            <li class="flex items-center gap-2"><i class="fa-solid fa-ban text-rose-500"></i> <strong>Mel:</strong> Proibido até 1 ano (risco de Botulismo infantil).</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 class="font-extrabold text-slate-800 text-lg mb-3">Substituições Inteligentes de Nutrientes</h3>
                <p class="text-xs text-slate-500 mb-4">Atrasou na feira ou falta um ingrediente em casa? Troque mantendo o mesmo grupo nutricional:</p>
                <div class="overflow-x-auto">
                    <table class="w-full text-xs text-left text-slate-700">
                        <thead class="bg-slate-50 text-slate-800 font-bold uppercase text-[10px]">
                            <tr>
                                <th class="p-3">Grupo Alimentar</th>
                                <th class="p-3">Ingrediente do Cardápio</th>
                                <th class="p-3">Substituto Equivalente</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr>
                                <td class="p-3 font-semibold text-rose-600">Ferro Hêmico (Proteína)</td>
                                <td class="p-3">Patinho Moído / Carne Bovina</td>
                                <td class="p-3">Frango desfiado, Coxão mole, Fígado bovino ou Ovos cozidos.</td>
                            </tr>
                            <tr>
                                <td class="p-3 font-semibold text-amber-600">Ferro Não-Hêmico (Leguminosa)</td>
                                <td class="p-3">Feijão Carioca / Preto</td>
                                <td class="p-3">Lentilha, Grão-de-bico bem cozido, Feijão fradinho ou Tofu.</td>
                            </tr>
                            <tr>
                                <td class="p-3 font-semibold text-emerald-600">Vitamina C (Ativador do Ferro)</td>
                                <td class="p-3">Laranja Pera</td>
                                <td class="p-3">Mamão, Goiaba vermelha, Acerola, Morango ou Mexerica.</td>
                            </tr>
                            <tr>
                                <td class="p-3 font-semibold text-violet-600">Carboidrato / Tubérculo</td>
                                <td class="p-3">Batata Doce / Arroz Integral</td>
                                <td class="p-3">Mandioquinha (Batata salsa), Inhame, Macaxeira (Aipim) ou Abóbora.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- ================= TAB 3: GUIA DE CORTES E TEXTURAS ================= -->
        <section id="sec-cortes" class="hidden space-y-6">
            <div class="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                    <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Anatomia do Corte Seguro (BLW e Tradicional)</span>
                    <h2 class="text-2xl font-black mb-1">Como Oferecer Alimentos Com Segurança</h2>
                    <p class="text-amber-100 text-sm max-w-xl">Consistência correta e formatos seguros para prevenir engasgos em cada fase do bebê.</p>
                </div>
                <i class="fa-solid fa-cut text-white/10 text-9xl absolute -right-4 -bottom-6"></i>
            </div>

            <div class="flex gap-2 overflow-x-auto hide-scrollbar">
                <button onclick="filterCuts('6m')" id="cut-btn-6m" class="cut-age-btn active bg-amber-500 text-white font-bold py-2.5 px-5 rounded-2xl text-xs shadow-sm">6 a 8 Meses (Início/Bastões)</button>
                <button onclick="filterCuts('9m')" id="cut-btn-9m" class="cut-age-btn bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-2xl text-xs hover:bg-slate-50">9 a 11 Meses (Movimento Pinça)</button>
                <button onclick="filterCuts('12m')" id="cut-btn-12m" class="cut-age-btn bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-2xl text-xs hover:bg-slate-50">12+ Meses (Comida da Família)</button>
            </div>

            <div id="cutsContainer" class="grid sm:grid-cols-2 gap-4">
                <!-- Dynamically loaded -->
            </div>

            <div class="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 shadow-xs">
                <h3 class="font-extrabold text-rose-800 text-base mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation text-rose-600 text-lg"></i> ALIMENTOS DE ALTO RISCO DE ASFIXIA / ENGASGO
                </h3>
                <p class="text-xs text-rose-900 leading-relaxed mb-3">Estes alimentos NUNCA devem ser oferecidos inteiros, redondos ou crus para crianças pequenas:</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div class="bg-white p-3 rounded-xl border border-rose-200 font-bold text-slate-800 text-center">
                        <i class="fa-solid fa-circle text-rose-500 mb-1 block"></i> Uvas Inteiras
                        <span class="block font-normal text-[10px] text-slate-500 mt-1">Corte sempre em 4 no sentido longitudinal</span>
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-rose-200 font-bold text-slate-800 text-center">
                        <i class="fa-solid fa-circle text-rose-500 mb-1 block"></i> Tomate Cereja
                        <span class="block font-normal text-[10px] text-slate-500 mt-1">Corte em 4 partes compridas</span>
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-rose-200 font-bold text-slate-800 text-center">
                        <i class="fa-solid fa-circle text-rose-500 mb-1 block"></i> Salsicha / Azeitona
                        <span class="block font-normal text-[10px] text-slate-500 mt-1">Proibidos inteiros / rodelas</span>
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-rose-200 font-bold text-slate-800 text-center">
                        <i class="fa-solid fa-circle text-rose-500 mb-1 block"></i> Oleaginosas Inteiras
                        <span class="block font-normal text-[10px] text-slate-500 mt-1">Castanhas e nozes somente em pasta</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= TAB 4: LISTA DE COMPRAS ================= -->
        <section id="sec-compras" class="hidden space-y-6">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                    <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Sincronizada com seu Planejamento</span>
                    <h2 class="text-2xl font-black mb-1">Lista de Compras Inteligente</h2>
                    <p class="text-blue-100 text-sm max-w-xl">Marque o que já tem em casa e leve no supermercado para não esquecer nenhum item essencial.</p>
                </div>
                <i class="fa-solid fa-cart-flatbed text-white/10 text-9xl absolute -right-4 -bottom-6"></i>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div class="text-xs font-bold text-slate-700">
                    Itens Marcados: <span id="checkedCount" class="text-brandPink font-extrabold text-sm">0</span> / <span id="totalCount">0</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="clearCheckedItems()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl transition">
                        <i class="fa-solid fa-rotate-left"></i> Desmarcar Todos
                    </button>
                    <button onclick="addCustomShoppingItem()" class="text-xs bg-brandPink hover:bg-rose-600 text-white font-bold px-3 py-2 rounded-xl shadow-xs transition">
                        <i class="fa-solid fa-plus"></i> Add Item
                    </button>
                </div>
            </div>

            <div id="shoppingListCategories" class="space-y-4">
                <!-- Dynamically Generated -->
            </div>
        </section>

        <!-- ================= TAB 5: SEGURANÇA (GAG VS ENGASGO) ================= -->
        <section id="sec-seguranca" class="hidden space-y-6">
            <div class="bg-gradient-to-r from-rose-600 to-red-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                    <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Tranquilidade Para os Pais</span>
                    <h2 class="text-2xl font-black mb-1">Reflexo de GAG vs. Engasgo Verdadeiro</h2>
                    <p class="text-rose-100 text-sm max-w-xl">Aprenda a reconhecer a diferença fisiológica para agir com calma e segurança.</p>
                </div>
                <i class="fa-solid fa-shield-heart text-white/10 text-9xl absolute -right-4 -bottom-6"></i>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Reflexo de GAG -->
                <div class="bg-amber-50 rounded-2xl p-6 border-2 border-amber-300 shadow-sm">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-black">
                            <i class="fa-solid fa-face-grimace"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-amber-900 text-lg">REFLEXO DE GAG (Normal)</h3>
                            <span class="text-xs font-bold text-amber-700 uppercase">Mecanismo de Proteção do Bebê</span>
                        </div>
                    </div>
                    <ul class="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                        <li class="flex items-start gap-2"><i class="fa-solid fa-check text-amber-600 mt-0.5"></i> <strong>Faz barulho:</strong> O bebê tosse, gagueja, faz ânsia ou barulhos com a boca.</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-check text-amber-600 mt-0.5"></i> <strong>Cor normal:</strong> O rosto pode ficar levemente avermelhado pelo esforço, mas volta ao normal logo.</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-check text-amber-600 mt-0.5"></i> <strong>Ação de expelir:</strong> O bebê coloca a língua para fora e projeta o alimento sozinho para a frente da boca.</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-circle-exclamation text-amber-700 mt-0.5"></i> <strong>O QUE FAZER:</strong> Mantenha a calma! Não coloque o dedo na boca do bebê. Apenas observe com apoio visual encorajador.</li>
                    </ul>
                </div>

                <!-- Engasgo Verdadeiro -->
                <div class="bg-rose-50 rounded-2xl p-6 border-2 border-rose-400 shadow-sm">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl font-black animate-pulse">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-rose-900 text-lg">ENGASGO (Emergência)</h3>
                            <span class="text-xs font-bold text-rose-700 uppercase">Obstrução Total da Via Aérea</span>
                        </div>
                    </div>
                    <ul class="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                        <li class="flex items-start gap-2"><i class="fa-solid fa-xmark text-rose-600 mt-0.5"></i> <strong>Silêncio total:</strong> O bebê NÃO consegue tossir, chorar ou emitir qualquer som.</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-xmark text-rose-600 mt-0.5"></i> <strong>Alteração de cor:</strong> Os lábios e o rosto ficam pálidos ou arroxeados (cianóticos).</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-xmark text-rose-600 mt-0.5"></i> <strong>Olhos arregalados:</strong> Demonstra pânico, com dificuldade visível para puxar o ar.</li>
                        <li class="flex items-start gap-2"><i class="fa-solid fa-triangle-exclamation text-rose-700 mt-0.5"></i> <strong>O QUE FAZER:</strong> Inicie imediatamente a <strong>Manobra de Desengasgo (Heimlich Infantil)</strong> e chame o SAMU (192).</li>
                    </ul>
                </div>
            </div>

            <!-- Passo a passo Manobra -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 class="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-truck-medical text-rose-600"></i> Passo a Passo da Manobra de Desengasgo em Bebês (Menores de 1 Ano)
                </h3>
                <div class="grid sm:grid-cols-3 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="font-extrabold text-rose-600 mb-1">Passo 1: Posição Inclinada</div>
                        <p class="text-slate-600 leading-relaxed">Coloque o bebê de bruços sobre o seu antebraço, com a cabeça mais baixa que o corpo, apoiando a mandíbula com a mão (sem apertar o pescoço).</p>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="font-extrabold text-rose-600 mb-1">Passo 2: 5 Tapas nas Costas</div>
                        <p class="text-slate-600 leading-relaxed">Com o calcanhar da outra mão, dê <strong>5 tapas firmes</strong> nas costas do bebê, no meio das escápulas (entre os ombros).</p>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="font-extrabold text-rose-600 mb-1">Passo 3: 5 Compressões no Toráx</div>
                        <p class="text-slate-600 leading-relaxed">Vire o bebê de frente no seu outro braço e faça <strong>5 compressões no tórax</strong> com 2 dedos, no centro do peito. Repita até expelir.</p>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Modal: Como Servir por Idade -->
    <div id="modalServe" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop hidden">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 text-lg">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div id="modalContent">
                <!-- Loaded via JS -->
            </div>
        </div>
    </div>

    <!-- Modal: Baixar App / PWA -->
    <div id="modalInstall" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop hidden">
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button onclick="closeInstallModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 text-lg">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="w-16 h-16 bg-rose-100 text-brandPink rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h3 class="font-extrabold text-slate-800 text-lg mb-2">Instalar Mãe & Cuidado</h3>
            <p class="text-xs text-slate-600 mb-4 leading-relaxed">
                Adicione à tela inicial do seu celular para abrir como um aplicativo nativo, sem precisar de internet!
            </p>
            <div class="bg-slate-50 p-3 rounded-2xl text-left text-xs text-slate-600 mb-5 space-y-2">
                <p><strong>iOS (iPhone):</strong> Toque no botão de <em>Compartilhar</em> <i class="fa-solid fa-share-nodes"></i> no Safari e escolha <em>"Adicionar à Tela de Início"</em>.</p>
                <p><strong>Android:</strong> Toque nos 3 pontinhos <i class="fa-solid fa-ellipsis-vertical"></i> do Chrome e selecione <em>"Instalar aplicativo"</em>.</p>
            </div>
            <button onclick="closeInstallModal()" class="w-full bg-brandPink text-white font-bold py-3 rounded-xl text-sm hover:bg-rose-600 transition">Entendido</button>
        </div>
    </div>

    <!-- JavaScript Logic -->
    <script>
        // App State
        let currentWeek = 1;
        let currentDay = 'Segunda';
        let deferredPrompt = null;

        // Expanded 4-Week Menu Database
        const menuData = {
            1: {
                'Segunda': {
                    almoco: {
                        base: 'Arroz Integral, Feijão Carioca, Patinho Moído Refogado e Abóbora Cozida',
                        baby6m: 'Abóbora em bastão cozido no vapor + carne moída úmida + caldinho de feijão.',
                        baby9m: 'Arroz levemente amassado, feijão inteiro cozido macio, carne moída e abóbora em pedacinhos.',
                        baby12m: 'Comida da família cortada de forma adequada.',
                        ferro: true, vitc: 'Laranja Pera fatiada'
                    },
                    jantar: {
                        base: 'Sopa cremosa de Legumes com Frango Desfiado e Macarrão Alfabeto',
                        baby6m: 'Legumes amassados com garfo (cenoura, batata doce) + frango desfiado bem fininho.',
                        baby9m: 'Legumes picadinhos macios, frango picado e macarrão macio.',
                        baby12m: 'Sopa em pedaços para autoalimentação com colher.',
                        ferro: true, vitc: 'Goiaba vermelha'
                    }
                },
                'Terça': {
                    almoco: {
                        base: 'Iscas de Peito de Frango grelhado nas ervas, Mandioquinha e Brócolis no vapor',
                        baby6m: 'Brócolis com talo grande, mandioquinha em bastão macio e tira grossa de frango.',
                        baby9m: 'Brócolis picado em floretes pequenos, mandioquinha em cubos e frango desfiado.',
                        baby12m: 'Mesma refeição da família cortada adequadamente.',
                        ferro: false, vitc: 'Manga Rosa'
                    },
                    jantar: {
                        base: 'Omelete de Forno com Espinafre, Tomate e Batata Doce Assada',
                        baby6m: 'Tira de omelete bem passada (sem sal) + bastão de batata doce assada sem casca.',
                        baby9m: 'Omelete picadinho e cubos de batata doce.',
                        baby12m: 'Pedaços de omelete e batata doce em rodelas/bastões.',
                        ferro: true, vitc: 'Morango fatiado'
                    }
                },
                'Quarta': {
                    almoco: {
                        base: 'Arroz Branco, Lentilha Cozida com Ervas, Iscas de Carne Bovina e Couve Refogada',
                        baby6m: 'Tira longa de carne macia para chupar + grãos de lentilha amassados + purê de couve.',
                        baby9m: 'Lentilha inteira cozida, carne em cubinhos pequenos e couve picada bem fina.',
                        baby12m: 'Prato idêntico ao da família com corte seguro.',
                        ferro: true, vitc: 'Abacaxi maduro'
                    },
                    jantar: {
                        base: 'Creme de Mandioca com Carne Seca Dessalgada e Desfiada e Cheiro Verde',
                        baby6m: 'Purê de mandioca sem sal + carne desfiada bem úmida e batida/desfiada fina.',
                        baby9m: 'Mandioca em pedaços macios e carne seca bem desfiadinha.',
                        baby12m: 'Creme espesso com pedacinhos de mandioca e carne.',
                        ferro: true, vitc: 'Acerola ou Caju'
                    }
                },
                'Quinta': {
                    almoco: {
                        base: 'Purê de Inhame, Feijão Preto, Sobrecoxa de Frango Assada e Chuchu no Vapor',
                        baby6m: 'Coxa de frango sem pele (para segurar no osso) + purê de inhame + bastão de chuchu.',
                        baby9m: 'Frango desfiado, inhame em cubos pequenos e chuchu em pedaços macios.',
                        baby12m: 'Frango picado sem osso com purê e legumes.',
                        ferro: true, vitc: 'Mamão Formosa'
                    },
                    jantar: {
                        base: 'Macarrão de Polpa Integral ao Molho Caseiro de Tomate com Carne Moída',
                        baby6m: 'Macarrão fusilli/parafuso bem cozido inteiro + molho de tomate natural picadinho.',
                        baby9m: 'Macarrão picadinho com carne moída ao molho.',
                        baby12m: 'Macarrão inteiro com molho encorpado.',
                        ferro: true, vitc: 'Melancia fatiada'
                    }
                },
                'Sexta': {
                    almoco: {
                        base: 'Filé de Peixe (Tilápia) Assado com Ervas, Arroz com Cúrcuma e Purê de Abóbora',
                        baby6m: 'Filé de peixe minunciosamente verificado sem espinhas + purê de abóbora.',
                        baby9m: 'Lascas de peixe, arroz amarelinho soltinho e abóbora em cubinhos.',
                        baby12m: 'Posta de peixe grelhada com acompanhamentos.',
                        ferro: false, vitc: 'Tangerina/Mexerica sem semente'
                    },
                    jantar: {
                        base: 'Sopa de Grão-de-Bico com Legumes (Cenoura, Bochecha de Aipim e Espinafre)',
                        baby6m: 'Grão-de-bico sem pele amassado no garfo + legumes em bastão macio.',
                        baby9m: 'Grão-de-bico levemente pressionado + legumes em cubos.',
                        baby12m: 'Sopa nutritiva completa.',
                        ferro: true, vitc: 'Kiwi em rodelas'
                    }
                },
                'Sábado': {
                    almoco: {
                        base: 'Feijoada Leve (Feijão Preto, Músculo Bovino, Lombo Magro), Arroz e Couve',
                        baby6m: 'Caldinho espesso de feijão + músculo macio em pedaço grande + bastão de laranja.',
                        baby9m: 'Feijão amassadinho com carne desfiada e couve bem picadinha.',
                        baby12m: 'Refeição completa adaptada sem embutidos.',
                        ferro: true, vitc: 'Laranja Seleta'
                    },
                    jantar: {
                        base: 'Panqueca de Aveia Recheada com Frango e Reta de Espinafre',
                        baby6m: 'Tiras de panqueca macia para o bebê segurar e levar à boca.',
                        baby9m: 'Panqueca cortada em quadradinhos pequenos.',
                        baby12m: 'Panqueca inteira enroladinha.',
                        ferro: true, vitc: 'Morangos frescos'
                    }
                },
                'Domingo': {
                    almoco: {
                        base: 'Polenta Caseira com Molho de Carne Moída e Abobrinha Refogada',
                        baby6m: 'Bastão de polenta firme no forno + abobrinha em tiras cozidas.',
                        baby9m: 'Polenta cremosa com carne moída e abobrinha picada.',
                        baby12m: 'Prato da família montado.',
                        ferro: true, vitc: 'Goiaba fatiada'
                    },
                    jantar: {
                        base: 'Canja de Galinha com Arroz Integral, Cenoura e Batata',
                        baby6m: 'Canja bem amassadinha com o garfo e frango desfiado fino.',
                        baby9m: 'Canja rústica em pedacinhos cozidos.',
                        baby12m: 'Canja tradicional em cumbuca.',
                        ferro: true, vitc: 'Melão em cubos'
                    }
                }
            },
            2: {
                'Segunda': {
                    almoco: {
                        base: 'Arroz Integral, Feijão Preto, Hambúrguer Caseiro de Carne Bovina e Vagem no Vapor',
                        baby6m: 'Hambúrguer caseiro sem sal em formato de tiras compridas + vagem inteira bem cozida.',
                        baby9m: 'Hambúrguer despedaçado em cubinhos e vagem picadinha.',
                        baby12m: 'Mini hambúrguer com arroz, feijão e salada quente.',
                        ferro: true, vitc: 'Laranja Pera'
                    },
                    jantar: {
                        base: 'Escondidinho de Batata Doce com Frango Desfiado e Requeijão Caseiro',
                        baby6m: 'Purê de batata doce com frango desfiado úmido misturado.',
                        baby9m: 'Escondidinho montado em textura levemente pedaçuda.',
                        baby12m: 'Porção do escondidinho gratinado.',
                        ferro: true, vitc: 'Abacaxi'
                    }
                },
                'Terça': {
                    almoco: {
                        base: 'Purê de Mandioquinha, Grão-de-Bico Ensopado, Carne de Panela e Couve-Flor',
                        baby6m: 'Carne de panela desmanchando em fibra longa + florete grande de couve-flor.',
                        baby9m: 'Carne picadinha, grão de bico sem pele amassado e couve-flor picada.',
                        baby12m: 'Carne com molho e legumes cozidos.',
                        ferro: true, vitc: 'Manga'
                    },
                    jantar: {
                        base: 'Sopa de Lentilha com Batata, Cenoura e Cubos de Peito de Frango',
                        baby6m: 'Lentilha e legumes amassados no garfo com frango desfiado.',
                        baby9m: 'Sopa com legumes em cubos pequenos e lentilha inteira.',
                        baby12m: 'Sopa nutritiva servida com colher.',
                        ferro: true, vitc: 'Kiwi'
                    }
                },
                'Quarta': {
                    almoco: {
                        base: 'Arroz com Cúrcuma, Feijão Carioca, Coxão Mole em Tiras e Abóbora Assada',
                        baby6m: 'Tira longa de coxão mole bem cozido + fatia de abóbora assada com casca (para segurar).',
                        baby9m: 'Tiras de carne cortadas em cubinhos cruzados e abóbora sem casca em cubos.',
                        baby12m: 'Prato completo com legumes assados.',
                        ferro: true, vitc: 'Goiaba'
                    },
                    jantar: {
                        base: 'Torta de Liquificador de Legumes e Ovos com Aveia',
                        baby6m: 'Fatia de torta cortada em bastão macio para autoalimentação.',
                        baby9m: 'Torta picada em pequenos quadradinhos.',
                        baby12m: 'Fatia de torta servida em pedaços.',
                        ferro: false, vitc: 'Morango'
                    }
                },
                'Quinta': {
                    almoco: {
                        base: 'Macarrão Penne com Molho Ragu de Carne Bovina e Brócolis',
                        baby6m: 'Penne cozido bem macio + árvore grande de brócolis cozida.',
                        baby9m: 'Penne cortado ao meio com molho ragu e brócolis picadinho.',
                        baby12m: 'Macarrão com molho ragu encorpado.',
                        ferro: true, vitc: 'Melancia'
                    },
                    jantar: {
                        base: 'Creme de Batata Baroa (Mandioquinha) com Tiras de Frango e Couve',
                        baby6m: 'Creme espesso com frango desfiado fino.',
                        baby9m: 'Creme rústico com cubinhos de legumes.',
                        baby12m: 'Sopa creme saborosa.',
                        ferro: true, vitc: 'Tangerina'
                    }
                },
                'Sexta': {
                    almoco: {
                        base: 'Arroz Integral, Ervilha Fresca Ensopada, Filezinho de Peixe e Chuchu',
                        baby6m: 'Isca de peixe grelhado sem espinha + bastão de chuchu cozido.',
                        baby9m: 'Peixe desfiado com ervilhas levemente amassadas e chuchu em cubos.',
                        baby12m: 'Peixe com arroz, ervilha e legumes.',
                        ferro: false, vitc: 'Laranja'
                    },
                    jantar: {
                        base: 'Omelete Rool com Espinafre, Cenoura Ralada e Batata Doce',
                        baby6m: 'Tiras de omelete bem passado + bastões de batata doce.',
                        baby9m: 'Omelete picadinho em quadradinhos.',
                        baby12m: 'Omelete recheado fatiado.',
                        ferro: true, vitc: 'Mamão'
                    }
                },
                'Sábado': {
                    almoco: {
                        base: 'Risoto Caseiro de Quinoa com Frango, Cenoura e Ervilhas',
                        baby6m: 'Quinoa bem cozida e cremosa com frango desfiado e cenoura em bastão.',
                        baby9m: 'Risoto de quinoa em textura natural picadinha.',
                        baby12m: 'Risoto de quinoa servido na refeição familiar.',
                        ferro: true, vitc: 'Caju ou Acerola'
                    },
                    jantar: {
                        base: 'Sopa de Abóbora Cabotiá com Frango e Couve Rasgada',
                        baby6m: 'Sopa creme grossa com frango fatiado fino.',
                        baby9m: 'Sopa com pedacinhos macios de abóbora e frango.',
                        baby12m: 'Sopa nutritiva de abóbora.',
                        ferro: true, vitc: 'Melão'
                    }
                },
                'Domingo': {
                    almoco: {
                        base: 'Nhoque de Batata Doce ao Molho Bolonhesa de Patinho',
                        baby6m: 'Nhoque macio de batata doce (tamanho comprido) com molho caseiro.',
                        baby9m: 'Nhoques cortados ao meio com molho de carne moída.',
                        baby12m: 'Nhoque completo servido à mesa.',
                        ferro: true, vitc: 'Laranja Pera'
                    },
                    jantar: {
                        base: 'Consomé de Legumes com Ovos Cozidos Picados',
                        baby6m: 'Ovos cozidos (gema e clara) amassados no purê de legumes.',
                        baby9m: 'Legumes e ovos cozidos em cubinhos pequenos.',
                        baby12m: 'Consomé levinho para a noite.',
                        ferro: true, vitc: 'Morango'
                    }
                }
            },
            3: {
                'Segunda': {
                    almoco: {
                        base: 'Arroz 7 Grãos, Feijão Fradinho, Músculo Bovino Cozido e Beterraba no Vapor',
                        baby6m: 'Músculo bem cozido soltando em fibras longas + bastão de beterraba cozida.',
                        baby9m: 'Feijão fradinho macio, carne picadinha e beterraba em cubos.',
                        baby12m: 'Prato completo nutritivo.',
                        ferro: true, vitc: 'Laranja'
                    },
                    jantar: {
                        base: 'Sopa de Fubá com Couve, Carne Moída e Batata',
                        baby6m: 'Polenta/Creme de fubá espesso com carne moída úmida.',
                        baby9m: 'Sopa consistente com carne moída e pedacinhos de batata.',
                        baby12m: 'Sopa de fubá com couve confortante.',
                        ferro: true, vitc: 'Goiaba'
                    }
                },
                'Terça': {
                    almoco: {
                        base: 'Purê de Inhame, Frango Ensopado com Quiabo (sem baba) e Arroz',
                        baby6m: 'Coxa de frango para o bebê segurar + purê de inhame + quiabo cortado ao meio comprido.',
                        baby9m: 'Frango desfiado, quiabo em rodelinhas cozidas e inhame.',
                        baby12m: 'Frango ensopado com quiabo e acompanhamentos.',
                        ferro: true, vitc: 'Abacaxi'
                    },
                    jantar: {
                        base: 'Muffin Salgado de Aveia, Ovos, Legumes e Frango',
                        baby6m: 'Muffin assado e macio cortado ao meio em formato de bastão.',
                        baby9m: 'Muffin picado em pequenos cubos de facil pegada.',
                        baby12m: 'Muffins salgados servidos inteiros.',
                        ferro: true, vitc: 'Manga'
                    }
                },
                'Quarta': {
                    almoco: {
                        base: 'Arroz Integral, Feijão Carioca, Kibe de Forno de Carne Bovina e Abobrinha',
                        baby6m: 'Tira de kibe de forno bem assado e úmido (sem pimenta) + abobrinha em bastão.',
                        baby9m: 'Kibe esfarelado/picado em cubinhos com arroz e feijão.',
                        baby12m: 'Fatia de kibe com acompanhamentos.',
                        ferro: true, vitc: 'Acerola'
                    },
                    jantar: {
                        base: 'Creme de Mandioca com Iscas de Peixe e Coentro',
                        baby6m: 'Creme de mandioca macio com lascas de peixe sem espinha.',
                        baby9m: 'Creme rústico de mandioca com peixe em pedacinhos.',
                        baby12m: 'Sopa creme de peixe com mandioca.',
                        ferro: false, vitc: 'Kiwi'
                    }
                },
                'Quinta': {
                    almoco: {
                        base: 'Purê de Batata Inglesa, Feijão Preto, Bife de Patinho acebolado e Cenoura',
                        baby6m: 'Bife de patinho em tira larga (para chupar o suco) + purê de batata sem leite animal.',
                        baby9m: 'Tiras de carne cortadas contra a fibra em cubinhos macios + cenoura em cubos.',
                        baby12m: 'Bife macio picado com purê e feijão.',
                        ferro: true, vitc: 'Melancia'
                    },
                    jantar: {
                        base: 'Sopa de Macarrão Letrinhas com Legumes e Ovo Poché',
                        baby6m: 'Gema e clara de ovo bem cozidas e amassadas na sopa de legumes.',
                        baby9m: 'Macarrão letrinhas cozido com legumes em cubos e ovo picado.',
                        baby12m: 'Sopa leve de letrinhas.',
                        ferro: true, vitc: 'Tangerina'
                    }
                },
                'Sexta': {
                    almoco: {
                        base: 'Arroz Branco, Tutu de Feijão, Filezinho de Sasami Grelhado e Couve',
                        baby6m: 'Tutu de feijão consistente + tira de sasami grelhado e macio.',
                        baby9m: 'Tutu de feijão, frango em cubinhos e couve bem picadinha.',
                        baby12m: 'Tutu de feijão tradicional com acompanhamentos.',
                        ferro: true, vitc: 'Laranja'
                    },
                    jantar: {
                        base: 'Sopa de Inhame com Espinafre e Iscas de Carne Bovina',
                        baby6m: 'Creme de inhame com espinafre e carne desfiada fininha.',
                        baby9m: 'Inhame em pedaços cozidos com carne em cubinhos.',
                        baby12m: 'Sopa encorpada de inhame.',
                        ferro: true, vitc: 'Morango'
                    }
                },
                'Sábado': {
                    almoco: {
                        base: 'Arroz de Forno Colorido com Frango Desfiado, Ervilha, Cenoura e Milho',
                        baby6m: 'Frango desfiado com cenoura e abóbora cozidas no vapor em bastões.',
                        baby9m: 'Arroz molhadinho de forno com legumes bem macios.',
                        baby12m: 'Arroz de forno completo da família.',
                        ferro: true, vitc: 'Mamão'
                    },
                    jantar: {
                        base: 'Caldo Verde Adaptado (Batata, Couve e Frango Desfiado)',
                        baby6m: 'Caldo espesso de batata com frango desfiado e couve bem batida.',
                        baby9m: 'Caldo com pedacinhos de batata e couve picada fina.',
                        baby12m: 'Caldo verde caseiro saboroso.',
                        ferro: true, vitc: 'Abacaxi'
                    }
                },
                'Domingo': {
                    almoco: {
                        base: 'Macarronada de Parafuso com Molho Caseiro de Tomate, Carne e Manjericão',
                        baby6m: 'Macarrão parafuso bem cozido oferecido inteiro para o bebê agarrar.',
                        baby9m: 'Parafuso cortado ao meio com molho de carne moída.',
                        baby12m: 'Macarronada completa de domingo.',
                        ferro: true, vitc: 'Goiaba'
                    },
                    jantar: {
                        base: 'Sopa de Canja com Legumes Variados',
                        baby6m: 'Canja amassadinha e morninha.',
                        baby9m: 'Canja tradicional com pedacinhos.',
                        baby12m: 'Canja da família.',
                        ferro: true, vitc: 'Melão'
                    }
                }
            },
            4: {
                'Segunda': {
                    almoco: {
                        base: 'Arroz Integral, Feijão Carioca, Lagarto Cozido na Panela de Pressão e Mandioca',
                        baby6m: 'Tira de carne de lagarto desmanchando + bastão de mandioca bem cozida e macia.',
                        baby9m: 'Carne desfiada em cubinhos, mandioca em pedaços e feijão carioca.',
                        baby12m: 'Carne de panela com mandioca cozida.',
                        ferro: true, vitc: 'Laranja Pera'
                    },
                    jantar: {
                        base: 'Sopa Creme de Abóbora com Gengibre Suave e Tiras de Frango',
                        baby6m: 'Creme de abóbora cozida no vapor com frango desfiado fino.',
                        baby9m: 'Abóbora em cubos em sopa cremosa com frango.',
                        baby12m: 'Sopa creme aquecida.',
                        ferro: true, vitc: 'Manga'
                    }
                },
                'Terça': {
                    almoco: {
                        base: 'Purê de Batata Doce, Feijão Preto, Almôndegas Assadas de Carne e Vagem',
                        baby6m: 'Almôndega macia sem sal em formato ovóide/comprido + bastão de batata doce.',
                        baby9m: 'Almôndegas cortadas em 4 partes pequenas com purê e vagem.',
                        baby12m: 'Almôndegas com arroz, feijão e salada quente.',
                        ferro: true, vitc: 'Morango'
                    },
                    jantar: {
                        base: 'Omelete de Ervas Finas com Tomate Concassé e Arroz Integral',
                        baby6m: 'Tiras de omelete bem cozidas + arroz amassadinho.',
                        baby9m: 'Omelete picado em cubos pequenos com tomate sem pele.',
                        baby12m: 'Omelete fofinho servido com arroz.',
                        ferro: true, vitc: 'Kiwi'
                    }
                },
                'Quarta': {
                    almoco: {
                        base: 'Arroz com Cúrcuma, Lentilha Ensopada, Iscas de Peito de Peru/Frango e Chuchu',
                        baby6m: 'Tira macia de peito de frango + lentilha amassada com garfo + chuchu em bastão.',
                        baby9m: 'Lentilha inteira cozida macia com cubinhos de frango e chuchu.',
                        baby12m: 'Prato equilibrado e colorido.',
                        ferro: true, vitc: 'Goiaba'
                    },
                    jantar: {
                        base: 'Creme de Inhame com Carne Seca Dessalgada e Cheiro Verde',
                        baby6m: 'Purê de inhame cremoso com carne seca bem desfiada e úmida.',
                        baby9m: 'Inhame em pedaços macios com carne desfiadinha.',
                        baby12m: 'Sopa creme rica em energia.',
                        ferro: true, vitc: 'Abacaxi'
                    }
                },
                'Quinta': {
                    almoco: {
                        base: 'Purê de Mandioquinha, Feijão Carioca, Coxão Mole Moído e Brocolis no Vapor',
                        baby6m: 'Carne moída bem molhadinha + árvore de brócolis cozida + purê de mandioquinha.',
                        baby9m: 'Carne moída com arroz, feijão e brócolis em floretes pequenos.',
                        baby12m: 'Refeição tradicional brasileira adaptada.',
                        ferro: true, vitc: 'Melancia'
                    },
                    jantar: {
                        base: 'Sopa de Legumes com Macarrão Conchinha e Frango Desfiado',
                        baby6m: 'Macarrão conchinha bem cozido e legumes amassados.',
                        baby9m: 'Conchinhas inteiras macias com legumes em cubos.',
                        baby12m: 'Sopa de macarrão para a família toda.',
                        ferro: true, vitc: 'Tangerina'
                    }
                },
                'Sexta': {
                    almoco: {
                        base: 'Arroz Branco, Feijão Preto, Posta de Peixe ao Molho de Tomate e Batata',
                        baby6m: 'Posta de peixe sem espinha macia + bastão de batata cozida.',
                        baby9m: 'Peixe em lascas macias com purê rústico de batata e molho.',
                        baby12m: 'Peixe ao molho com arroz e feijão.',
                        ferro: true, vitc: 'Laranja'
                    },
                    jantar: {
                        base: 'Sopa de Grão-de-Bico com Abóbora e Couve',
                        baby6m: 'Grão-de-bico sem casca amassado no purê de abóbora.',
                        baby9m: 'Sopa de grão-de-bico macio com pedacinhos de abóbora.',
                        baby12m: 'Sopa nutritiva e reconfortante.',
                        ferro: true, vitc: 'Mamão'
                    }
                },
                'Sábado': {
                    almoco: {
                        base: 'Strogonoff Adaptado (Sem Creme de Leite Industrializado/Sem Sal) de Frango, Arroz e Batata Corada',
                        baby6m: 'Tira de frango cozido em molho de tomate caseiro e iogurte natural + bastão de batata cozida.',
                        baby9m: 'Cubinhos de frango ao molho suave com arroz e batata em cubos.',
                        baby12m: 'Strogonoff leve para toda a família.',
                        ferro: true, vitc: 'Caju ou Acerola'
                    },
                    jantar: {
                        base: 'Crepioca de Aveia com Recheio de Carne Moída',
                        baby6m: 'Tiras de crepioca macia para pegar com a mão.',
                        baby9m: 'Crepioca cortada em quadradinhos com carne moída.',
                        baby12m: 'Crepioca recheada fatiada.',
                        ferro: true, vitc: 'Morango'
                    }
                },
                'Domingo': {
                    almoco: {
                        base: 'Assado de Panela (Carne Bovina), Arroz Integral, Feijão e Legumes Assados',
                        baby6m: 'Pedacinho grande de carne assada bem macia + bastão de cenoura assada.',
                        baby9m: 'Carne picadinha com legumes assados macios em cubos.',
                        baby12m: 'Almoço de domingo em família.',
                        ferro: true, vitc: 'Laranja Pera'
                    },
                    jantar: {
                        base: 'Canja de Galinha com Arroz e Legumes',
                        baby6m: 'Canja morna e levemente amassada.',
                        baby9m: 'Canja tradicional.',
                        baby12m: 'Canja para fechar o final de semana.',
                        ferro: true, vitc: 'Melão'
                    }
                }
            }
        };

        // Cuts Data
        const cutsData = {
            '6m': [
                { title: 'Banana', desc: 'Ofereça com metade da casca mantida (bem lavada) para facilitar a pegada do bebê sem escorregar.', icon: 'fa-apple-whole' },
                { title: 'Cenoura', desc: 'Corte em formato de bastão (tamanho do dedo indicador do adulto) e cozinhe até ficar macia.', icon: 'fa-carrot' },
                { title: 'Carne Bovina', desc: 'Pedaço grande da largura de 2 a 3 dedos para o bebê chupar os nutrientes e suco da carne.', icon: 'fa-drumstick-bite' }
            ],
            '9m': [
                { title: 'Frutas em Cubos', desc: 'Corte morangos, mangas e bananas em pedacinhos pequenos para incentivar o movimento de pinça.', icon: 'fa-lemon' },
                { title: 'Vegetais Cozidos', desc: 'Cubos pequenos de batata, cenoura e abobrinha bem cozidos.', icon: 'fa-cubes' }
            ],
            '12m': [
                { title: 'Alimentos Inteiros e Cortados', desc: 'A criança já transita com facilidade para a textura e formato da mesa da família.', icon: 'fa-utensils' }
            ]
        };

        // Shopping List Data
        const defaultShopping = {
            'Hortifrúti': [
                { name: 'Abóbora Cabotiá', checked: false },
                { name: 'Brócolis Americano', checked: false },
                { name: 'Cenoura', checked: false },
                { name: 'Laranja Pera', checked: false },
                { name: 'Banana Prata', checked: false },
                { name: 'Mandioquinha / Inhame', checked: false },
                { name: 'Couve Fresca', checked: false }
            ],
            'Açougue / Proteínas': [
                { name: 'Patinho Moído', checked: false },
                { name: 'Peito de Frango / Sasami', checked: false },
                { name: 'Músculo ou Coxão Mole', checked: false },
                { name: 'Filé de Tilápia / Peixe Branco', checked: false },
                { name: 'Ovos caipiras', checked: false }
            ],
            'Mercearia & Grãos': [
                { name: 'Feijão Carioca e Preto', checked: false },
                { name: 'Lentilha / Grão-de-Bico', checked: false },
                { name: 'Arroz Integral / 7 Grãos', checked: false },
                { name: 'Macarrão Fusilli / Letrinhas', checked: false },
                { name: 'Azeite de Oliva Extra Virgem', checked: false }
            ]
        };

        // Initialize App
        document.addEventListener('DOMContentLoaded', () => {
            renderMeal();
            filterCuts('6m');
            renderShoppingList();
            
            // Listen for PWA install prompt
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                document.getElementById('installBanner').classList.remove('hidden');
            });
        });

        // Tab Switching
        function switchTab(tabId) {
            const tabs = ['cardapios', 'base-unica', 'cortes', 'compras', 'seguranca'];
            tabs.forEach(t => {
                const sec = document.getElementById(`sec-${t}`);
                const btn = document.getElementById(`tab-${t}`);
                if (t === tabId) {
                    sec.classList.remove('hidden');
                    btn.classList.add('active');
                } else {
                    sec.classList.add('hidden');
                    btn.classList.remove('active');
                }
            });
        }

        // Select Week & Day
        function selectWeek(w) {
            currentWeek = w;
            for (let i = 1; i <= 4; i++) {
                const btn = document.getElementById(`btn-week-${i}`);
                if (i === w) {
                    btn.className = "week-btn py-3 rounded-xl border-2 border-brandPink bg-rose-50 text-brandPink font-bold text-sm text-center shadow-xs";
                } else {
                    btn.className = "week-btn py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm text-center hover:bg-slate-50";
                }
            }
            renderMeal();
        }

        function selectDay(day) {
            currentDay = day;
            const buttons = document.querySelectorAll('#daysBar .day-btn');
            buttons.forEach(btn => {
                if (btn.innerText.includes(day)) {
                    btn.className = "day-btn active py-2 px-4 rounded-xl bg-slate-800 text-white font-bold text-xs whitespace-nowrap shadow";
                } else {
                    btn.className = "day-btn py-2 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs whitespace-nowrap hover:bg-slate-50";
                }
            });
            renderMeal();
        }

        function renderMeal() {
            const area = document.getElementById('mealDisplayArea');
            const weekData = menuData[currentWeek] || menuData[1];
            const data = weekData[currentDay] || weekData['Segunda'];

            area.innerHTML = `
                <!-- Almoço Card -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-bold">
                                <i class="fa-solid fa-sun"></i>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-800 text-lg">Almoço</h3>
                                <span class="text-xs text-slate-400 font-medium">${currentDay} - Semana ${currentWeek}</span>
                            </div>
                        </div>
                        <div class="flex gap-1">
                            ${data.almoco.ferro ? '<span class="badge-ferro text-[10px] font-bold px-2.5 py-1 rounded-full"><i class="fa-solid fa-bolt"></i> Rico em Ferro</span>' : ''}
                        </div>
                    </div>

                    <div class="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                        <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Base da Família (Sem Sal)</span>
                        <p class="text-sm font-bold text-slate-800">${data.almoco.base}</p>
                    </div>

                    <div class="space-y-3">
                        <div class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
                            <span class="text-xs font-extrabold text-rose-700 block mb-0.5"><i class="fa-solid fa-baby"></i> Adaptação 6 a 8 Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.almoco.baby6m}</p>
                        </div>
                        <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                            <span class="text-xs font-extrabold text-emerald-700 block mb-0.5"><i class="fa-solid fa-child"></i> Adaptação 9 a 11 Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.almoco.baby9m}</p>
                        </div>
                        <div class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                            <span class="text-xs font-extrabold text-indigo-700 block mb-0.5"><i class="fa-solid fa-children"></i> Adaptação 12+ Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.almoco.baby12m}</p>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-lemon text-amber-500"></i> Ativador Vitamina C:</span>
                        <span class="font-semibold text-slate-800">${data.almoco.vitc}</span>
                    </div>
                </div>

                <!-- Jantar Card -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold">
                                <i class="fa-solid fa-moon"></i>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-800 text-lg">Jantar</h3>
                                <span class="text-xs text-slate-400 font-medium">${currentDay} - Semana ${currentWeek}</span>
                            </div>
                        </div>
                        <div class="flex gap-1">
                            ${data.jantar.ferro ? '<span class="badge-ferro text-[10px] font-bold px-2.5 py-1 rounded-full"><i class="fa-solid fa-bolt"></i> Rico em Ferro</span>' : ''}
                        </div>
                    </div>

                    <div class="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                        <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Base da Família (Sem Sal)</span>
                        <p class="text-sm font-bold text-slate-800">${data.jantar.base}</p>
                    </div>

                    <div class="space-y-3">
                        <div class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
                            <span class="text-xs font-extrabold text-rose-700 block mb-0.5"><i class="fa-solid fa-baby"></i> Adaptação 6 a 8 Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.jantar.baby6m}</p>
                        </div>
                        <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                            <span class="text-xs font-extrabold text-emerald-700 block mb-0.5"><i class="fa-solid fa-child"></i> Adaptação 9 a 11 Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.jantar.baby9m}</p>
                        </div>
                        <div class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                            <span class="text-xs font-extrabold text-indigo-700 block mb-0.5"><i class="fa-solid fa-children"></i> Adaptação 12+ Meses:</span>
                            <p class="text-xs text-slate-700 leading-relaxed">${data.jantar.baby12m}</p>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-lemon text-amber-500"></i> Sobremesa Vitamina C:</span>
                        <span class="font-semibold text-slate-800">${data.jantar.vitc}</span>
                    </div>
                </div>
            `;
        }

        // Render Cuts Filter
        function filterCuts(age) {
            const container = document.getElementById('cutsContainer');
            const items = cutsData[age] || [];

            document.querySelectorAll('.cut-age-btn').forEach(btn => {
                if (btn.id === `cut-btn-${age}`) {
                    btn.className = "cut-age-btn active bg-amber-500 text-white font-bold py-2.5 px-5 rounded-2xl text-xs shadow-sm";
                } else {
                    btn.className = "cut-age-btn bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-2xl text-xs hover:bg-slate-50";
                }
            });

            container.innerHTML = items.map(item => `
                <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-slate-800 text-base mb-1">${item.title}</h4>
                        <p class="text-xs text-slate-600 leading-relaxed">${item.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        // Render Shopping List
        function renderShoppingList() {
            const container = document.getElementById('shoppingListCategories');
            let total = 0;
            let checked = 0;

            let html = '';
            for (const [cat, items] of Object.entries(defaultShopping)) {
                html += `
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h4 class="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-angle-right text-brandPink"></i> ${cat}
                        </h4>
                        <div class="space-y-2">
                `;
                items.forEach((item, idx) => {
                    total++;
                    if (item.checked) checked++;
                    html += `
                        <label class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                            <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem('${cat}', ${idx})" class="w-4 h-4 accent-rose-500 rounded">
                            <span class="text-xs text-slate-700 font-medium ${item.checked ? 'line-through text-slate-400' : ''}">${item.name}</span>
                        </label>
                    `;
                });
                html += `</div></div>`;
            }

            container.innerHTML = html;
            document.getElementById('checkedCount').innerText = checked;
            document.getElementById('totalCount').innerText = total;
        }

        function toggleShoppingItem(cat, idx) {
            defaultShopping[cat][idx].checked = !defaultShopping[cat][idx].checked;
            renderShoppingList();
        }

        function clearCheckedItems() {
            for (const cat in defaultShopping) {
                defaultShopping[cat].forEach(item => item.checked = false);
            }
            renderShoppingList();
        }

        function addCustomShoppingItem() {
            const name = prompt('Digite o nome do item para adicionar:');
            if (name) {
                if (!defaultShopping['Outros']) defaultShopping['Outros'] = [];
                defaultShopping['Outros'].push({ name, checked: false });
                renderShoppingList();
            }
        }

        // Modal Controls
        function openInstallModal() { document.getElementById('modalInstall').classList.remove('hidden'); }
        function closeInstallModal() { document.getElementById('modalInstall').classList.add('hidden'); }
        function closeInstallBanner() { document.getElementById('installBanner').classList.add('hidden'); }

        function installApp() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => {
                    deferredPrompt = null;
                    closeInstallBanner();
                });
            } else {
                openInstallModal();
            }
        }
    </script>
</body>
</html>
