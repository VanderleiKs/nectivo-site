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
export const WHATSAPP_NUMBER = "5551920107584";

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
    tagline: "Apresente seu negócio com uma página profissional, objetiva e personalizada.",
    description:
      "Uma página profissional para apresentar sua empresa, destacar seus diferenciais e transformar visitantes em oportunidades de contato.",
    highlights: [
      { icon: "pi pi-palette", label: "Design personalizado" },
      { icon: "pi pi-mobile", label: "Adaptado a qualquer tela" },
      { icon: "pi pi-whatsapp", label: "WhatsApp integrado" },
      { icon: "pi pi-globe", label: "Domínio em seu nome" },
    ],
    summary: [
      "Página única personalizada",
      "Apresentação do seu negócio",
      "Endereço e localização no Google Maps, quando aplicável.",
      "Integração com WhatsApp",
      "Links para redes sociais",
      "Design responsivo",
      "Publicação e configuração do domínio",
    ],
    construction: [
      "Página única personalizada",
      "Apresentação da empresa e dos serviços",
      "Botão de contato pelo WhatsApp",
      "Endereço e localização no Google Maps, quando aplicável.",
      "Links para redes sociais",
      "Design responsivo para celular, tablet e computador",
      "Configuração inicial de SEO para mecanismos de busca.",
      "Configuração e publicação no domínio registrado em seu nome.",
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
    tagline: "Apresente sua empresa, seus serviços e diferenciais com mais detalhes.",
    description:
      "Um site com páginas organizadas para apresentar sua empresa, detalhar seus serviços e transmitir mais profissionalismo.",
    highlights: [
      { icon: "pi pi-palette", label: "Design personalizado" },
      { icon: "pi pi-clone", label: "Estrutura completa" },
      { icon: "pi pi-whatsapp", label: "WhatsApp integrado" },
      { icon: "pi pi-mobile", label: "Adaptado a qualquer tela" },
    ],
    summary: [
      "Página inicial personalizada",
      "Páginas de serviços",
      "Página sobre a empresa",
      "Página de contato",
      "Integração com WhatsApp",
      "Links para redes sociais",
      "Design responsivo",
      "Publicação e configuração do domínio",
    ],
    construction: [
      "Página inicial personalizada",
      "Páginas de serviços",
      "Página sobre a empresa",
      "Página de contato",
      "Integração com WhatsApp",
      "Links para redes sociais",
      "Design responsivo para celular, tablet e computador",
      "Configuração básica para mecanismos de busca",
      "Configuração e publicação no domínio registrado em seu nome.",
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
    text: "Você realiza o pagamento inicial e iniciamos o projeto.",
  },
  {
    percent: 0,
    title: "Desenvolvimento e revisão",
    text: `Criamos seu site e você acompanha o desenvolvimento, com até ${REVISIONS} revisões incluídas na construção.`,
    note: REVISIONS_NOTE,
  },
  {
    percent: 50,
    title: "50% na aprovação final",
    text: "Após sua aprovação, você realiza o pagamento restante e o site é publicado.",
  },
];

/** Rótulo do valor mensal nos quadros de preço. */
export const MONTHLY_LABEL = "Hospedagem e acompanhamento";

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
  "Registro e renovação do domínio"
];

export const CANCELLATION = [
  "Você pode cancelar a hospedagem e o acompanhamento quando quiser, sem multa ou fidelidade.",
  "A hospedagem e o suporte são encerrados conforme as condições contratadas.",
  "Você pode solicitar os arquivos do site e hospedá-lo onde preferir.",
  "O domínio continua registrado em seu nome.",
];

export const fmt = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
