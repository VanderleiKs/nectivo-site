// Configuração comercial centralizada. Todos os valores estão em centavos.
// Ajuste aqui preços, textos de oferta e contato; as páginas leem tudo deste arquivo.

export type PlanId = "landing" | "institucional";

export interface Plan {
  id: PlanId;
  /** Caminho da página de detalhes. */
  slug: string;
  name: string;
  /** Rótulo curto usado em botões ("a landing page", "o site institucional"). */
  article: string;
  icon: string;
  tagline: string;
  description: string;
  /** Destaques exibidos no topo da página de detalhes. */
  highlights: { icon: string; label: string }[];
  /** Resumo exibido no card da página inicial. */
  summary: string[];
  /** O que está incluído na construção (página de detalhes). */
  construction: string[];
  setupCents: number;
  maintenanceCents: number;
  /** Projeto de exemplo publicado (opcional). */
  exampleUrl?: string;
  /** true enquanto o valor do plano mensal ainda é apenas referência interna. */
  maintenancePending?: boolean;
}

export const BRAND = {
  name: "Nectivo",
  slogan: "Sua presença digital, sem complicação.",
  pitch:
    "Criamos sites profissionais para apresentar sua empresa, valorizar seus serviços e facilitar o contato com seus clientes.",
};

// Número comercial (somente dígitos, com DDI + DDD).
// ATENÇÃO: substitua pelo número real antes de publicar.
export const WHATSAPP_NUMBER = "5551997147059";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WA_GENERAL = waLink(
  "Olá! Gostaria de saber mais sobre os sites da Nectivo.",
);

export const planWaLink = (p: Plan) =>
  waLink(
    `Olá! Tenho interesse ${p.id === "landing" ? "na" : "no"} ${p.name.toLowerCase()}. Pode me passar mais informações?`,
  );

export const PLANS: Plan[] = [
  {
    id: "landing",
    slug: "landing-page",
    name: "Landing page",
    article: "a landing page",
    icon: "pi pi-file",
    tagline: "Sua empresa na internet, de forma simples e profissional.",
    description:
      "Uma página personalizada para apresentar seu negócio, destacar seus serviços e facilitar o contato com novos clientes.",
    highlights: [
      { icon: "pi pi-pen-to-square", label: "Design profissional" },
      { icon: "pi pi-mobile", label: "Layout responsivo" },
      { icon: "pi pi-whatsapp", label: "WhatsApp integrado" },
      { icon: "pi pi-globe", label: "Domínio em seu nome" },
    ],
    summary: [
      "Página única personalizada",
      "Apresentação do seu negócio",
      "WhatsApp, endereço e mapa",
      "Redes sociais",
      "Layout responsivo",
      "Publicação e configuração do domínio",
    ],
    construction: [
      "Página única personalizada",
      "Apresentação da empresa e dos serviços",
      "Botão de contato pelo WhatsApp",
      "Endereço e localização no mapa, quando aplicável",
      "Links para redes sociais",
      "Layout responsivo para celular e computador",
      "Configuração básica para mecanismos de busca",
      "Publicação e configuração do domínio (no nome do cliente)",
    ],
    setupCents: 29700,
    maintenanceCents: 3990,
    exampleUrl: "https://oficina-mecanica.pages.dev/",
  },
  {
    id: "institucional",
    slug: "site-institucional",
    name: "Site institucional",
    article: "o site institucional",
    icon: "pi pi-building",
    tagline: "Mais espaço para apresentar sua empresa.",
    description:
      "Um site com várias páginas para organizar suas informações, apresentar seus serviços e transmitir mais profissionalismo.",
    highlights: [
      { icon: "pi pi-pen-to-square", label: "Design profissional" },
      { icon: "pi pi-clone", label: "Várias páginas" },
      { icon: "pi pi-whatsapp", label: "WhatsApp integrado" },
      { icon: "pi pi-mobile", label: "Layout responsivo" },
    ],
    summary: [
      "Página inicial personalizada",
      "Páginas de serviços",
      "Página sobre a empresa",
      "Página de contato",
      "WhatsApp e redes sociais",
      "Layout responsivo",
      "Publicação e configuração do domínio",
    ],
    construction: [
      "Página inicial personalizada",
      "Páginas de serviços",
      "Página sobre a empresa",
      "Página de contato",
      "WhatsApp e redes sociais",
      "Layout responsivo para celular e computador",
      "Configuração básica para mecanismos de busca",
      "Publicação e configuração do domínio (no nome do cliente)",
    ],
    setupCents: 89700,
    // Valor de referência, ainda sujeito à confirmação.
    maintenanceCents: 5990,
    maintenancePending: true,
  },
];

export const planBySlug = (slug: string) => PLANS.find((p) => p.slug === slug);

/** Quantidade de revisões incluídas na construção. */
export const REVISIONS = 2;
export const REVISIONS_NOTE = `* Até ${REVISIONS} revisões incluídas na construção.`;

/** Divisão do pagamento da construção (percentuais somam 100). */
export const PAYMENT_SPLIT: { percent: number; title: string; text: string; note?: string }[] = [
  {
    percent: 50,
    title: "50% na contratação",
    text: "Você faz o pagamento de 50% e iniciamos o projeto.",
  },
  {
    percent: 0,
    title: "Desenvolvimento e revisão",
    text: "Criamos o site e você acompanha a evolução, com revisões.*",
    note: REVISIONS_NOTE,
  },
  {
    percent: 50,
    title: "50% na aprovação final",
    text: "Após a sua aprovação, você paga os outros 50% e o site é publicado.",
  },
];

/** Rótulo do valor mensal nos quadros de preço. */
export const MONTHLY_LABEL = "Plano mensal";

/** As duas formas de contratar qualquer solução. */
export const OPTIONS = {
  build: "Só a construção",
  hosted: "Construção + hospedagem",
};


/** O que o plano mensal inclui, dentro do escopo contratado. */
export const MAINTENANCE_INCLUDES = [
  "Hospedagem do site, com certificado de segurança (SSL)",
  "Manutenção básica",
  "Manutenção técnica para ajustes pontuais",
  "Suporte",
];

/** A mesma lista, em forma de frase (para textos corridos). */
export const MAINTENANCE_SUMMARY =
  "hospedagem com SSL, manutenção básica, manutenção técnica para ajustes pontuais e suporte";

/** Itens orçados à parte. */
export const NOT_INCLUDED = [
  "Criação de novas páginas",
  "Reformulação de layout",
  "Novas funcionalidades",
];

export const CANCELLATION = [
  "Você pode cancelar o plano mensal quando quiser, sem fidelidade.",
  "A hospedagem e o suporte são encerrados conforme as condições contratadas.",
  "Você recebe os arquivos do site para hospedá-lo onde preferir.",
  "O domínio continua registrado em seu nome.",
];

export const fmt = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
