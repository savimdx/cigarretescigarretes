import { BenefitItem, BonusItem, TestimonialItem, FAQItem } from './types';

export const CHECKOUT_URL = "https://pay.wiapy.com/f-dzU_VQGWB3";

export const HERO_BULLETS = [
  "Método prático estruturado para parar de fumar em 30 dias",
  "Exercícios diários para identificar e mapear seus gatilhos",
  "Planejamento passo a passo para transformar sua rotina em 30 dias",
  "Ferramentas e folhas de registro para acompanhar seu progresso diário",
  "Acesso digital imediato ao método completo de 30 dias"
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "ben-1",
    title: "Mapeamento claro de gatilhos",
    description: "Identifique com exatidão os horários, emoções, lugares e pessoas associados ao hábito, antecipando os momentos de maior vulnerabilidade."
  },
  {
    id: "ben-2",
    title: "Preparação do ambiente e da rotina",
    description: "Organize sua casa, seu local de trabalho e seus hábitos diários para reduzir a exposição a estímulos que disparam o impulso de fumar."
  },
  {
    id: "ben-3",
    title: "Estratégias comportamentais práticas",
    description: "Aprenda técnicas simples e comprovadas para atravessar o desejo intenso nos primeiros minutos sem ceder ao impulso imediato."
  },
  {
    id: "ben-4",
    title: "Ferramentas de registro e auto-observação",
    description: "Utilize fichas estruturadas para acompanhar sua evolução dia após dia, compreendendo suas reações e ajustando seu ritmo pessoal."
  },
  {
    id: "ben-5",
    title: "Proteção contra recaídas e deslizes",
    description: "Esteja preparado para situações de risco e saiba exatamente como retomar o plano caso ocorra um deslize, sem frustração ou culpa."
  },
  {
    id: "ben-6",
    title: "Visualização do impacto financeiro",
    description: "Monitore o dinheiro que você deixa de gastar a cada semana e mês, transformando a economia em um estímulo visível e concreto."
  }
];

export const MODULES_INFO = [
  {
    number: "01",
    title: "Entenda seu hábito",
    description: "Identifique os horários, situações e gatilhos associados ao hábito de fumar. Entenda como o ciclo de recompensa funciona no seu cérebro e mapeie seus padrões diários.",
    tag: "AUTOCONHECIMENTO"
  },
  {
    number: "02",
    title: "Prepare sua tentativa",
    description: "Organize um plano pessoal detalhado, prepare seu ambiente físico eliminando cinzeiros e isqueiros, e estruture sua rede de apoio com familiares e amigos.",
    tag: "PLANEJAMENTO"
  },
  {
    number: "03",
    title: "Enfrente a vontade de fumar",
    description: "Conheça estratégias comportamentais eficazes para lidar com gatilhos e momentos de desejo intenso, substituindo o impulso por ações saudáveis e respiração guiada.",
    tag: "ESTRATÉGIAS PRÁTICAS"
  },
  {
    number: "04",
    title: "Acompanhe seu progresso",
    description: "Utilize registros diários e exercícios para observar seu comportamento, identificar dificuldades recorrentes e comemorar pequenos marcos de consistência.",
    tag: "MONITORAMENTO"
  },
  {
    number: "05",
    title: "Proteja sua decisão",
    description: "Prepare-se para situações de alto risco (festas, viagens, estresse no trabalho) e saiba como retomar o caminho caso ocorra um deslize, evitando que ele se torne uma recaída.",
    tag: "PREVENÇÃO"
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: "bon-1",
    number: 1,
    title: "10 Dicas Essenciais Para Parar De Fumar",
    description: "Um manual direto ao ponto com as 10 técnicas mais eficazes para neutralizar a vontade imediata, controlar a ansiedade e acelerar sua vitória nos dias mais desafiadores.",
    originalPrice: 37.00,
    tag: "TÉCNICAS PRÁTICAS",
    image: "https://i.ibb.co/hFgNt1M7/Guia-para-Parar-de-Fumar.png",
    fallbackImage: "/images/bonus_10_dicas.webp",
    fallbackSources: [
      "/images/bonus_10_dicas.webp",
      "/images/bonus_10_dicas.jpg"
    ]
  },
  {
    id: "bon-2",
    number: 2,
    title: "Adeus, Cigarro",
    description: "O guia comportamental para reprogramar sua mente, quebrar a dependência psicológica e construir uma identidade fortalecida e definitiva de quem nunca mais precisa fumar.",
    originalPrice: 47.00,
    tag: "TRANSFORMAÇÃO MENTAL",
    image: "https://i.ibb.co/bjFQr27h/Guia-Adeus-Cigarro-Liberdade-Renovada.png",
    fallbackImage: "/images/bonus_adeus_cigarro.webp",
    fallbackSources: [
      "/images/bonus_adeus_cigarro.webp",
      "/images/bonus_adeus_cigarro.jpg"
    ]
  },
  {
    id: "bon-3",
    number: 3,
    title: "Como Parar De Fumar Maconha",
    description: "Método estruturado para quem deseja interromper o consumo de maconha, recuperar a clareza mental, regular o ciclo de sono e resgatar o foco e a produtividade no dia a dia.",
    originalPrice: 47.00,
    tag: "LIBERDADE COGNITIVA",
    image: "https://i.ibb.co/Y71jKYhk/Guia-Pr-tico-para-Parar-de-Fumar-Maconha.png",
    fallbackImage: "/images/bonus_parar_maconha.webp",
    fallbackSources: [
      "/images/bonus_parar_maconha.webp",
      "/images/bonus_parar_maconha.jpg"
    ]
  },
  {
    id: "bon-4",
    number: 4,
    title: "Guia Para Abandonar O Vício em Cigarro Eletrônico",
    description: "Estratégias específicas para vencer a alta dosagem de sais de nicotina de pods e vapes, superar o impulso repetitivo e desintoxicar o organismo com segurança.",
    originalPrice: 47.00,
    tag: "DESINTOXICAÇÃO DE VAPE",
    image: "https://i.ibb.co/LBJJzHC/Guia-para-Abandonar-o-V-cio-em-Cigarro-Eletr-nico.png",
    fallbackImage: "/images/bonus_cigarro_eletronico.webp",
    fallbackSources: [
      "/images/bonus_cigarro_eletronico.webp",
      "/images/bonus_cigarro_eletronico.jpg"
    ]
  },
  {
    id: "bon-5",
    number: 5,
    title: "Quebre O Ciclo",
    description: "O plano anti-recaída para desarmar gatilhos sociais, resistir à pressão do ambiente e garantir que sua decisão de liberdade seja sustentável e permanente por toda a vida.",
    originalPrice: 37.00,
    tag: "BLINDAGEM CONTRA RECAÍDAS",
    image: "https://i.ibb.co/MkQZtzj5/Quebre-o-Ciclo-Liberdade-e-Transforma-o-1.png",
    fallbackImage: "/images/bonus_quebre_o_ciclo.webp",
    fallbackSources: [
      "/images/bonus_quebre_o_ciclo.webp",
      "/images/bonus_quebre_o_ciclo.jpg"
    ]
  },
  {
    id: "bon-6",
    number: 6,
    title: "Mapa Mental para Vencer os Gatilhos no Vício em Cigarro",
    description: "Um diagrama visual completo e intuitivo para mapear conexões neurais, antecipar reações automáticas e desarmar gatilhos emocionais com extrema rapidez.",
    originalPrice: 47.00,
    tag: "MAPA VISUAL PRÁTICO",
    image: "https://i.ibb.co/kg3Hgyfd/Mapa-Mental-para-Vencer-os-Gatilhos-1.png",
    fallbackImage: "/images/bonus_mapa_mental.webp",
    fallbackSources: [
      "/images/bonus_mapa_mental.webp",
      "/images/bonus_mapa_mental.jpg"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Marcos Silveira",
    role: "Fumante por 18 anos • São Paulo, SP",
    quote: "Fumava havia mais de 18 anos e achava impossível tomar café sem fumar. O Projeto Livre me deu um passo a passo tão claro que hoje estou há 4 meses 100% livre. O Mapa Mental de Gatilhos foi um divisor de águas na minha rotina!",
    rating: 5,
    achievement: "✓ 4 meses sem fumar",
    avatarSeed: "marcos",
    avatarUrl: "https://i.ibb.co/RGYLdDP8/pexels-italo-melo-2379004.jpg",
    avatarFallback: "/images/depoimento_italo.webp"
  },
  {
    id: "test-2",
    name: "Camila Vasconcelos",
    role: "Ex-usuária de Pod • Rio de Janeiro, RJ",
    quote: "Eu usava pod e vape achando que era inofensivo, mas estava mais viciada do que antes. O guia prático me ajudou a sair desse ciclo sem crises de ansiedade. Minha respiração e meu sono melhoraram logo na primeira semana!",
    rating: 5,
    achievement: "✓ Livre do Vape & Pod",
    avatarSeed: "camila",
    avatarUrl: "https://i.ibb.co/CsDtwWfw/Depoimento-01.jpg",
    avatarFallback: "/images/depoimento_01.webp"
  },
  {
    id: "test-3",
    name: "Roberto Mendes",
    role: "Economia de R$ 650/mês • Curitiba, PR",
    quote: "O que mais me impressionou foi a simplicidade do cronograma de 30 dias. Não tem promessa milagrosa, é método, técnica e organização diária. Já se passaram 5 meses e economizei mais de R$ 3.000 que antes viravam fumaça.",
    rating: 5,
    achievement: "✓ Concluiu os 30 dias",
    avatarSeed: "roberto",
    avatarUrl: "https://i.ibb.co/jkXX8k5t/sssss.jpg",
    avatarFallback: "/images/depoimento_sssss.webp"
  },
  {
    id: "test-4",
    name: "Juliana Ferreira",
    role: "Mãe e Empresária • Belo Horizonte, MG",
    quote: "Minha maior fraqueza eram as noites de estresse e a rotina pesada. A técnica de 4 minutos contra a fissura funcionou com perfeição. Consegui quebrar o hábito automático e minha disposição para brincar com meus filhos é outra.",
    rating: 5,
    achievement: "✓ Superou as fissuras",
    avatarSeed: "juliana",
    avatarUrl: "https://i.ibb.co/Fknsjjmt/Depoimento-02.jpg",
    avatarFallback: "/images/depoimento_02.webp"
  },
  {
    id: "test-5",
    name: "Eduardo Costa",
    role: "Livre do Tabaco • Porto Alegre, RS",
    quote: "Já tinha tentado parar 3 vezes por conta própria e sempre recaía na segunda semana em eventos sociais. O bônus Quebre o Ciclo me ensinou a me blindar nessas situações. Valeu cada centavo do investimento!",
    rating: 5,
    achievement: "✓ 100% sem recaídas",
    avatarSeed: "eduardo",
    avatarUrl: "https://i.ibb.co/zH8CGq9d/zaas.jpg",
    avatarFallback: "/images/depoimento_zaas.webp"
  }
];

export const CHALLENGE_INSIGHTS = TESTIMONIALS;

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "O que é o Projeto Livre?",
    answer: "O Projeto Livre é um método digital prático desenvolvido para ajudar a pessoa a parar de fumar em 30 dias. Ele organiza todo o processo através de exercícios diários, planejamento pessoal e ferramentas de acompanhamento para mapear gatilhos, enfrentar a fissura e consolidar uma nova rotina saudável ao longo de 30 dias."
  },
  {
    id: "faq-2",
    question: "O que está incluído na compra?",
    answer: "Ao adquirir o Projeto Livre por R$ 14,90 (pagamento único), você recebe o método principal com os 5 módulos completos, além de 6 bônus exclusivos: Bônus 1 (10 Dicas Essenciais Para Parar De Fumar), Bônus 2 (Adeus, Cigarro), Bônus 3 (Como Parar De Fumar Maconha), Bônus 4 (Guia Para Abandonar O Vício em Cigarro Eletrônico), Bônus 5 (Quebre O Ciclo) e Bônus 6 (Mapa Mental para Vencer os Gatilhos no Vício em Cigarro)."
  },
  {
    id: "faq-3",
    question: "Como o material será entregue?",
    answer: "O material é 100% digital. Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link seguro da plataforma para baixar todos os arquivos no seu celular, tablet ou computador. Você também poderá imprimir as folhas e exercícios para preenchimento manual, se preferir."
  },
  {
    id: "faq-4",
    question: "O método garante que a pessoa vai parar de fumar?",
    answer: "Não. Nenhuma ferramenta séria pode garantir resultados clínicos ou prometer que você deixará de fumar sem esforço. O Projeto Livre é um guia educativo de planejamento e apoio comportamental que fornece ferramentas práticas e organização para a sua jornada. A decisão, o comprometimento e a consistência no dia a dia dependem de cada pessoa."
  },
  {
    id: "faq-5",
    question: "O material substitui acompanhamento profissional?",
    answer: "Não. O Projeto Livre é um material digital de orientação prática e planejamento pessoal. Ele não substitui consultas médicas, diagnósticos clínicos, acompanhamento psicológico ou tratamentos com profissionais de saúde habilitados."
  },
  {
    id: "faq-6",
    question: "Por quanto tempo terei acesso ao material?",
    answer: "O acesso é vitalício. Uma vez baixados os arquivos para seus dispositivos, eles são seus para sempre. Não existem mensalidades, assinaturas ou renovações ocultas."
  },
  {
    id: "faq-7",
    question: "Como funciona a garantia de 7 dias?",
    answer: "Você tem 7 dias de garantia incondicional a partir da data de compra. Se dentro desse período você avaliar que o material não atende às suas expectativas, basta solicitar o reembolso diretamente na plataforma para receber 100% do valor pago de volta."
  }
];
