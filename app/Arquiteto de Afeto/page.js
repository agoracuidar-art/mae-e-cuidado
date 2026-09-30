'use client';

import { useState, useEffect } from 'react';

// BANCOS DE DADOS LOCAIS (45 CONTEÚDOS INTEGRAIS)
const TIJOLINHOS_BANCO = [
  { id: 1, cat: 'Reconhecimento', texto: 'Percebi o seu esforço hoje na rotina da casa. Muito obrigado(a) por cuidar de nós!' },
  { id: 2, cat: 'Reconhecimento', texto: 'Amo ver a sua paciência e carinho no cuidado com nosso(s) filho(s).' },
  { id: 3, cat: 'Reconhecimento', texto: 'Obrigado(a) por assumir essa tarefa quando eu estava no meu limite de cansaço.' },
  { id: 4, cat: 'Reconhecimento', texto: 'Você é uma peça fundamental no equilíbrio e na paz da nossa casa hoje.' },
  { id: 5, cat: 'Reconhecimento', texto: 'Vi como você lidou com a birra com tanta calma. Você deu um show de paciência!' },
  { id: 6, cat: 'Reconhecimento', texto: 'Obrigado(a) por preparar nosso cantinho/refeição com tanto afeto.' },
  { id: 7, cat: 'Reconhecimento', texto: 'Sua presença deixa o dia da nossa família muito mais leve e seguro.' },
  { id: 8, cat: 'Reconhecimento', texto: 'Aprecio demais a nossa parceria, principalmente nos dias mais desafiadores.' },
  { id: 9, cat: 'Reparação', texto: 'Desculpe por ter falado num tom acima do necessário. Eu estava sobrecarregado(a) e errei.' },
  { id: 10, cat: 'Reparação', texto: 'Podemos apertar o botão de "recomeçar o dia"? O seu bem-estar importa muito para mim.' },
  { id: 11, cat: 'Reparação', texto: 'Preciso de 10 minutos para respirar e me acalmar, mas continuo aqui com você.' },
  { id: 12, cat: 'Reparação', texto: 'Sinto muito pela forma como reagi. Quero ouvir o seu lado com calma assim que der.' },
  { id: 13, cat: 'Reparação', texto: 'Percebi que o clima entre nós ficou pesado. Vamos conversar com carinho depois?' },
  { id: 14, cat: 'Reparação', texto: 'Eu não soube me expressar bem antes. O que eu realmente queria dizer é que preciso de ajuda.' },
  { id: 15, cat: 'Reparação', texto: 'Me desculpe pela falta de paciência. Você não tem culpa do meu cansaço acumulado.' }
];

const CNV_CRIANCAS_BANCO = [
  { id: 1, cenario: 'Hora de Desligar as Telas / TV', erro: 'Chega de TV! Já falei mil vezes, passa pra cá esse controle agora!', cnv: 'O tempo da TV acabou por hoje. Eu sei que dá vontade de assistir mais um pouco, mas nosso combinado foi até agora. Você quer desligar o controle ou prefere que eu desligue pra você?' },
  { id: 2, cenario: 'Birra e Resistência ao Banho', erro: 'Vai pro banho agora, se não vai ficar sem desenho e vai apanhar!', cnv: 'Entendo que você quer continuar brincando com os blocos. Agora é a hora do banho para o seu corpo ficar limpinho. Você quer levar o carrinho vermelho ou o dinossauro pra água?' },
  { id: 3, cenario: 'Recusa para Comer Legumes/Verduras', erro: 'Engole isso! Tem criança passando fome e você fazendo frescura.', cnv: 'Você não precisa comer se não quiser agora, mas este alimento é importante para o seu corpo crescer forte. Quer apenas encostar o garfo para sentir o gosto ou prefere tentar mais tarde?' },
  { id: 4, cenario: 'Arrumar os Brinquedos Espalhados', erro: 'Sua sala tá uma nojeira! Se eu tiver que arrumar, vou jogar tudo no lixo!', cnv: 'Gosto de ver a nossa sala organizada para a gente poder caminhar sem pisar em nada. Quer guardar primeiro os carrinhos ou os livros comigo?' },
  { id: 5, cenario: 'Disputa de Brinquedo entre Irmãos', erro: 'Devolve agora pra ele! Você é mais velho e devia ter vergonha de ser tão egoísta.', cnv: 'Vejo que vocês dois querem brincar com o mesmo brinquedo agora. Vamos usar o cronômetro para cada um brincar por 5 minutos enquanto o outro escolhe outro brinquedo?' },
  { id: 6, cenario: 'Medo de Dormir no Escuro / Cama Própria', erro: 'Deixa de bobagem, não tem nada no escuro! Vai dormir logo!', cnv: 'Eu vejo que você está assustado(a) com a escuridão. O seu quarto está seguro e eu estou no corredor. Quer que a gente deixe a luz do corredor acesa ou a porta encostada?' },
  { id: 7, cenario: 'Frustração por Não Ganhar Algo no Mercado', erro: 'Para de chorar agora que tá todo mundo olhando! Que vergonha!', cnv: 'Você ficou triste porque eu não pude comprar esse brinquedo hoje. Eu entendo sua frustração. Posso te dar um abraço até essa tristeza passar?' },
  { id: 8, cenario: 'Gritar dentro de Casa', erro: 'Cala a boca! Para de gritar nessa casa, você me deixa louco(a)!', cnv: 'O seu grito machuca meus ouvidos. Quando estivermos dentro de casa, podemos usar a nossa "voz de espaço fechado". Se quiser gritar bem alto, podemos ir ao quintal/praça.' },
  { id: 9, cenario: 'Jogar Objetos no Chão com Raiva', erro: 'Para de jogar as coisas no chão, seu menino feio/bagunceiro!', cnv: 'Jogar as coisas faz um barulho legal, mas os brinquedos quebram e podem machucar. Se você está com vontade de jogar algo com força, podemos jogar esta bola macia no cesto.' },
  { id: 10, cenario: 'Atraso para Sair de Casa de Manhã', erro: 'Você sempre me atrasa! É um enrolado, não faz nada direito!', cnv: 'Precisamos sair em 5 minutos para não atrasar na escola. O que falta você colocar no corpo: os sapatos ou a jaqueta?' },
  { id: 11, cenario: 'Uso Excessivo de Celular / Jogos (Maiores)', erro: 'Você virou um viciado nesse celular, não serve pra nada nessa casa!', cnv: 'Percebo que você passa muitas horas no jogo e sinto falta da nossa convivência. Vamos combinar um horário fixo de jogo para que você também tenha tempo para a família e estudos?' },
  { id: 12, cenario: 'Respostas Ríspidas ou Falta de Educação', erro: 'Você não fala assim comigo! Sou seu pai/mãe e exijo respeito!', cnv: 'Não gosto quando você fala comigo nesse tom, me sinto desrespeitado(a). Quando você estiver mais calmo(a), podemos conversar sobre o que te deixou chateado(a).' },
  { id: 13, cenario: 'Resistência para Fazer o TPC / Dever', erro: 'Se você não fizer a tarefa agora, vai ficar sem videogame o mês inteiro!', cnv: 'Fazer o dever de casa quando você está cansado(a) é difícil. Quer fazer 15 minutos agora, fazer uma pausa para um lanche e depois terminar o resto?' },
  { id: 14, cenario: 'Não Querer Tomar Remédio', erro: 'Abre a boca por bem ou vou segurar o seu nariz pra você engolir!', cnv: 'Este remédio não tem um gosto gostoso, mas ele vai ajudar o seu corpo a sarar da febre. Você quer tomar com o copinho ou com a seringa?' },
  { id: 15, cenario: 'Hábito de Morder ou Bater nos Outros', erro: 'Menino mau! Se bater de novo eu vou te dar um tapinha pra ver como dói!', cnv: 'Bater/morder machuca a pessoa. Eu não posso deixar você machucar seu amigo. Se você está bravo, pode apertar esta almofada com força.' }
];

const CNV_CASAL_BANCO = [
  { id: 1, cenario: 'Sobrecarga das Tarefas Domésticas', erro: 'Você não faz nada nessa casa, eu tenho que fazer tudo sozinho(a)!', cnv: 'Estou me sentindo exausto(a) com o acúmulo de tarefas de hoje. Preciso que você assuma a cozinha para eu conseguir tomar um banho com calma.' },
  { id: 2, cenario: 'Choro do Bebê de Madrugada', erro: 'Você finge que tá dormindo só para não levantar e pegar o bebê!', cnv: 'Acordei 3 vezes nesta noite e estou no meu limite físico. Você pode levantar desta vez para eu recuperar um pouco de energia?' },
  { id: 3, cenario: 'Discordância sobre Limites dos Filhos', erro: 'Você mima demais essa criança, estraga tudo o que eu tento educar!', cnv: 'Fico inseguro(a) quando mudamos as regras na frente dele(a). Vamos alinhar como vamos agir na próxima vez para mantermos a mesma postura?' },
  { id: 4, cenario: 'Uso de Celular no Tempo em Família', erro: 'Você não sai desse celular, prefere as redes sociais do que a sua família!', cnv: 'Sinto falta da sua atenção quando estamos à mesa. Podemos deixar os celulares em outro cômodo durante o jantar para conversarmos?' },
  { id: 5, cenario: 'Falta de Tempo para O Casal', erro: 'Nós viramos dois estranhos morando na mesma casa, você não se importa mais.', cnv: 'Sinto saudade dos nossos momentos a sós. Que tal pedirmos ajuda para a vovó/babá neste sábado para sairmos por 2 horas?' },
  { id: 6, cenario: 'Estresse Financeiro da Casa', erro: 'Você gasta dinheiro com besteira enquanto as contas da casa só acumulam!', cnv: 'Estou preocupado(a) com os nossos gastos deste mês. Podemos sentar hoje à noite para rever o orçamento juntos sem cobranças?' },
  { id: 7, cenario: 'Tom de Voz Ríspido na Frente dos Filhos', erro: 'Você é um grosso(a), não sabe nem falar com as pessoas!', cnv: 'Fiquei desconfortável com a forma como você falou comigo perto dos nossos filhos. Vamos conversar sobre isso em particular quando as crianças dormirem?' },
  { id: 8, cenario: 'Falta de Iniciativa para Tarefas do Bebê', erro: 'Tenho que desenhar tudo o que você precisa fazer, parece mais um filho!', cnv: 'Fico sobrecarregado(a) quando preciso gerenciar e planejar todas as tarefas do bebê. Gostaria que você assumisse totalmente a rotina do banho e da mochila.' },
  { id: 9, cenario: 'Chegar Atrasado do Trabalho', erro: 'Você não cumpre horários, não tá nem aí para a rotina das crianças.', cnv: 'Quando você atrasa sem avisar, o jantar e a hora de dormir saem do controle. Pode me mandar uma mensagem se perceber que vai atrasar mais de 15 minutos?' },
  { id: 10, cenario: 'Críticas da Família Estendida (Sogros)', erro: 'Sua mãe adora dar palpite na nossa vida e você nunca me defende!', cnv: 'Me sinto desrespeitado(a) quando sua mãe questiona nossas escolhas na criação. Preciso que você imponha esse limite com ela para proteger o nosso espaço.' },
  { id: 11, cenario: 'Falta de Espaço Pessoal / Autocuidado', erro: 'Você sai com seus amigos e eu fico aqui presa(o) cuidando de tudo!', cnv: 'Também estou precisando de um tempo a sós para recarregar as energias. Podemos combinar um turno no fim de semana para eu ter 3 horas livres?' },
  { id: 12, cenario: 'Comparações com Outros Casais', erro: 'Olha o marido/esposa da Fulana, faz de tudo por ela e você nada!', cnv: 'Tenho sentido falta de pequenos gestos de carinho no nosso dia a dia. Adoraria receber um abraço mais longo ou um elogio de vez em quando.' },
  { id: 13, cenario: 'Desconectar da Carga Mental Escolar', erro: 'Você nem sabe o nome da professora do seu filho!', cnv: 'A carga mental com trabalhos e avisos da escola está pesada para mim. Você pode ficar responsável pelo grupo de pais da escola a partir de agora?' },
  { id: 14, cenario: 'Intimidade e Afeto Físico', erro: 'Você só me procura quando quer sexo, não tem carinho nenhum no dia.', cnv: 'Preciso me sentir conectado(a) emocionalmente com você ao longo do dia com abraços e conversas para me sentir à vontade na nossa intimidade.' },
  { id: 15, cenario: 'Reorganização de Prioridades no Fim de Semana', erro: 'Você passa o sábado inteiro no videogame/TV e esquece que tem casa.', cnv: 'Quero aproveitar o fim de semana com a casa organizada e tempo com as crianças. Vamos dividir os afazeres da manhã para termos a tarde livre juntos?' }
];

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('solo');
  const [promptInstalacao, setPromptInstalacao] = useState(null);
  const [pwaInstalado, setPwaInstalado] = useState(false);
  const [humorAtual, setHumorAtual] = useState('🟢');
  const [accordionAberto, setAccordionAberto] = useState(null);
  const [tijolosEnviadosCount, setTijolosEnviadosCount] = useState(6);
  const [filtroTijolo, setFiltroTijolo] = useState('Todos');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const humorSalvo = localStorage.getItem('arquiteto_humor');
      if (humorSalvo) setHumorAtual(humorSalvo);

      const countSalvo = localStorage.getItem('arquiteto_tijolos_count');
      if (countSalvo) setTijolosEnviadosCount(parseInt(countSalvo, 10));
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.log(err));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setPromptInstalacao(e);
    });

    window.addEventListener('appinstalled', () => {
      setPwaInstalado(true);
      setPromptInstalacao(null);
    });
  }, []);

  const instalarApp = async () => {
    if (!promptInstalacao) return;
    promptInstalacao.prompt();
    const { outcome } = await promptInstalacao.userChoice;
    if (outcome === 'accepted') setPromptInstalacao(null);
  };

  const mudarHumor = (novoHumor) => {
    setHumorAtual(novoHumor);
    localStorage.setItem('arquiteto_humor', novoHumor);
  };

  // Função para enviar Tijolinho diretamente pelo WhatsApp
  const enviarTijolinho = (tijolo) => {
    const novoCount = tijolosEnviadosCount + 1;
    setTijolosEnviadosCount(novoCount);
    localStorage.setItem('arquiteto_tijolos_count', novoCount.toString());

    const texto = encodeURIComponent(
      `🧱 *Tijolinho de Afeto (${tijolo.cat})*\n\n"${tijolo.texto}"\n\n_Enviado pelo App Arquiteto de Afeto_ ❤️`
    );
    window.open(`https://api.whatsapp.com/send?text=${texto}`, '_blank');
  };

  // Função para enviar o Alerta SOS no WhatsApp
  const dispararSosWhatsApp = () => {
    const texto = encodeURIComponent(
      `🚨 *ALERTA SOS - ARQUITETO DE AFETO*\n\nMinha bateria emocional acabou e estou no meu limite físico e mental agora.\nPreciso que você assuma a rotina e me dê um tempo de pausa sem perguntas! 🪫❤️`
    );
    window.open(`https://api.whatsapp.com/send?text=${texto}`, '_blank');
  };

  // Função para compartilhar frase de CNV no WhatsApp
  const compartilharCnvWhatsApp = (cenario, cnvTexto) => {
    const texto = encodeURIComponent(
      `💬 *Comunicação Não Violenta - ${cenario}*\n\n*Como podemos falar:* "${cnvTexto}"\n\n_Dica do App Arquiteto de Afeto_ ✨`
    );
    window.open(`https://api.whatsapp.com/send?text=${texto}`, '_blank');
  };

  const tijolosFiltrados = filtroTijolo === 'Todos' 
    ? TIJOLINHOS_BANCO 
    : TIJOLINHOS_BANCO.filter(t => t.cat === filtroTijolo);

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#FFFBF8', boxShadow: '0 0 25px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Topo Fixo Premium com a logo.png */}
      <header style={{
        padding: '16px 20px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F0E6DF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/logo.png" 
            alt="Mãe & Cuidado" 
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E88D94' }} 
          />
          <div>
            <h1 style={{ fontSize: '16px', margin: 0, fontWeight: 700, color: '#2D3748' }}>Arquiteto de Afeto</h1>
            <p style={{ fontSize: '11px', margin: 0, color: '#E88D94', fontWeight: 600 }}>MÃE & CUIDADO</p>
          </div>
        </div>

        {promptInstalacao && !pwaInstalado && (
          <button
            onClick={instalarApp}
            style={{
              backgroundColor: '#4E8362',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(78, 131, 98, 0.25)'
            }}
          >
            📲 Instalar App
          </button>
        )}
      </header>

      {/* Conteúdo Dinâmico das 5 Abas */}
      <main style={{ padding: '20px', paddingBottom: '110px' }}>
        
        {/* ABA 1: NOSSO SOLO */}
        {abaAtiva === 'solo' && (
          <div>
            <div style={{ backgroundColor: '#FFF5F5', padding: '16px', borderRadius: '16px', border: '1px solid #FADCDC', marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#B8525A' }}>🌱 Nosso Solo Familiar</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Acompanhe o clima emocional da casa em tempo real.</p>
            </div>

            {/* Muro de Afeto (Representação Visual do Progresso) */}
            <div style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '16px', border: '1px solid #F0E6DF', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#2D3748' }}>🏛️ Nosso Muro de Afeto</h4>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#E88D94' }}>{tijolosEnviadosCount} Tijolos Construídos</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', backgroundColor: '#FAF5F1', padding: '12px', borderRadius: '12px', border: '1px dashed #E2E8F0' }}>
                {Array.from({ length: tijolosEnviadosCount }).map((_, i) => (
                  <div key={i} style={{ width: '40px', height: '22px', backgroundColor: i % 2 === 0 ? '#E88D94' : '#4E8362', borderRadius: '4px', opacity: 0.85 }} />
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '16px', border: '1px solid #F0E6DF', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Atualizar Meu Termômetro:</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['🟢 Verde', '🟡 Amarelo', '🔴 Vermelho'].map((status) => {
                  const emoji = status.split(' ')[0];
                  return (
                    <button
                      key={emoji}
                      onClick={() => mudarHumor(emoji)}
                      style={{
                        flex: 1,
                        padding: '10px 4px',
                        borderRadius: '12px',
                        border: humorAtual === emoji ? '2px solid #E88D94' : '1px solid #E2E8F0',
                        backgroundColor: humorAtual === emoji ? '#FFF0F2' : '#FFF',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '16px', border: '1px solid #F0E6DF' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Status da Casa Agora:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>👩 Mãe (Você)</span>
                  <span style={{ fontSize: '18px' }}>{humorAtual}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>👨 Pai</span>
                  <span style={{ fontSize: '18px' }}>🟡</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>👧 Criança</span>
                  <span style={{ fontSize: '18px' }}>🟢</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: TIJOLINHOS */}
        {abaAtiva === 'tijolos' && (
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2D3748' }}>🧱 Banco de Tijolinhos (15 Frases)</h3>
            
            {/* Filtros */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['Todos', 'Reconhecimento', 'Reparação'].map(f => (
                <button
                  key={f}
                  onClick={() => setFiltroTijolo(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: filtroTijolo === f ? '#E88D94' : '#EDF2F7',
                    color: filtroTijolo === f ? '#FFF' : '#4A5568',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tijolosFiltrados.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#FFF', padding: '14px', borderRadius: '12px', border: '1px solid #F0E6DF' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: item.cat === 'Reconhecimento' ? '#4E8362' : '#E88D94', textTransform: 'uppercase' }}>
                    {item.cat}
                  </span>
                  <p style={{ margin: '6px 0 10px 0', fontSize: '13px', color: '#4A5568' }}>"{item.texto}"</p>
                  <button 
                    onClick={() => enviarTijolinho(item)} 
                    style={{ backgroundColor: '#25D366', color: '#FFF', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    📲 Enviar via WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 3: SOS BATERIA ACABOU */}
        {abaAtiva === 'sos' && (
          <div>
            <div style={{ backgroundColor: '#FFF0F0', padding: '20px', borderRadius: '20px', border: '1px solid #F8B4B4', textAlign: 'center' }}>
              <h2 style={{ color: '#C53030', margin: '0 0 10px 0', fontSize: '20px' }}>🔋 Bateria Acabou</h2>
              <p style={{ fontSize: '13px', color: '#742A2A', margin: '0 0 20px 0' }}>
                Aperte o botão para notificar os adultos no WhatsApp de que você precisa de pausa e suporte imediato sem precisar falar.
              </p>
              <button
                onClick={dispararSosWhatsApp}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '60px',
                  backgroundColor: '#E53E3E',
                  color: '#FFF',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(229, 62, 62, 0.4)',
                  cursor: 'pointer',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <span>⚡ SOS</span>
                <span style={{ fontSize: '10px', fontWeight: 400 }}>WhatsApp</span>
              </button>
            </div>

            <div style={{ marginTop: '20px', backgroundColor: '#FFF', padding: '16px', borderRadius: '16px', border: '1px solid #F0E6DF' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>📋 Plano de Ação dos 3 Minutos:</h4>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: '1.6' }}>
                1. Assuma a rotina da criança imediatamente.<br/>
                2. Entregue um copo d'água sem fazer perguntas de decisão.<br/>
                3. Garanta 15 minutos de silêncio para a pessoa recarregar.
              </p>
            </div>
          </div>
        )}

        {/* ABA 4: BIBLIOTECA CNV CRIANÇAS */}
        {abaAtiva === 'biblioteca' && (
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>💬 CNV com Crianças (15 Cenários)</h3>
            {CNV_CRIANCAS_BANCO.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #F0E6DF', marginBottom: '10px', overflow: 'hidden' }}>
                <div onClick={() => setAccordionAberto(accordionAberto === item.id ? null : item.id)} style={{ padding: '14px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', backgroundColor: '#FAF5F1' }}>
                  <span>{item.cenario}</span>
                  <span>{accordionAberto === item.id ? '▲' : '▼'}</span>
                </div>
                {accordionAberto === item.id && (
                  <div style={{ padding: '14px', fontSize: '12px' }}>
                    <p style={{ color: '#C53030', margin: '0 0 8px 0' }}>❌ <strong>Antes:</strong> {item.erro}</p>
                    <p style={{ color: '#2F855A', margin: '0 0 12px 0' }}>✅ <strong>Como Falar Agora:</strong> {item.cnv}</p>
                    <button 
                      onClick={() => compartilharCnvWhatsApp(item.cenario, item.cnv)}
                      style={{ backgroundColor: '#EAF5ED', color: '#25D366', border: '1px solid #C2E7CB', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      📲 Enviar Frase no WhatsApp
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ABA 5: MÃE & PAI */}
        {abaAtiva === 'casal' && (
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2D3748' }}>👩‍❤️‍👨 Espaço Mãe & Pai (15 Cenários)</h3>
            {CNV_CASAL_BANCO.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #F0E6DF', marginBottom: '10px', overflow: 'hidden' }}>
                <div onClick={() => setAccordionAberto(accordionAberto === `casal_${item.id}` ? null : `casal_${item.id}`)} style={{ padding: '14px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFF5F5' }}>
                  <span>{item.cenario}</span>
                  <span>{accordionAberto === `casal_${item.id}` ? '▲' : '▼'}</span>
                </div>
                {accordionAberto === `casal_${item.id}` && (
                  <div style={{ padding: '14px', fontSize: '12px' }}>
                    <p style={{ color: '#C53030', margin: '0 0 8px 0' }}>❌ <strong>Abordagem com Ruído:</strong> {item.erro}</p>
                    <p style={{ color: '#2F855A', margin: '0 0 12px 0' }}>✅ <strong>Alinhamento com CNV:</strong> {item.cnv}</p>
                    <button 
                      onClick={() => compartilharCnvWhatsApp(item.cenario, item.cnv)}
                      style={{ backgroundColor: '#EAF5ED', color: '#25D366', border: '1px solid #C2E7CB', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      📲 Enviar Frase no WhatsApp
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Menu Inferior Fixo de 5 Abas (Corrigido para 100% de largura distribuída) */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F0E6DF',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100
      }}>
        {[
          { id: 'solo', label: 'Solo', icon: '🌱' },
          { id: 'tijolos', label: 'Tijolos', icon: '🧱' },
          { id: 'sos', label: 'SOS', icon: '🔋' },
          { id: 'biblioteca', label: 'CNV', icon: '💬' },
          { id: 'casal', label: 'Mãe & Pai', icon: '👩‍❤️‍👨' }
        ].map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '10px',
              fontWeight: abaAtiva === aba.id ? 700 : 500,
              color: abaAtiva === aba.id ? '#E88D94' : '#A0AEC0',
              cursor: 'pointer',
              flex: 1
            }}
          >
            <span style={{ fontSize: '18px' }}>{aba.icon}</span>
            {aba.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
