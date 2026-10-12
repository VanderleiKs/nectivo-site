export type PlanId = "landing" | "catalogo" | "cardapio";
export type Period = "m" | "a";
export type Pay = "pix" | "card" | "boleto";

export interface Plan {
  id: PlanId;
  name: string;
  icon: string;
  description: string;
  features: string[];
  setupCents: number;
  monthlyCents: number;
  yearlyCents: number;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "landing",
    name: "Landing page",
    icon: "pi pi-file",
    setupCents: 19700,
    monthlyCents: 3990,
    yearlyCents: 43000,
    description: "Ideal para profissionais, autônomos e pequenos negócios.",
    features: [
      "Uma página personalizada",
      "Apresentação do seu negócio",
      "WhatsApp, endereço e mapa",
      "Redes sociais",
      "Layout responsivo",
      "Publicação e configuração do domínio",
    ],
  },
  {
    id: "catalogo",
    name: "Site com catálogo",
    icon: "pi pi-shopping-bag",
    setupCents: 29700,
    monthlyCents: 6990,
    yearlyCents: 77000,
    popular: false,
    description:
      "Perfeito para lojas, prestadores de serviço e negócios com produtos.",
    features: [
      "Página personalizada",
      "Até 20 produtos no cadastro inicial",
      "Categorias e descrições",
      "Painel administrativo",
      "Fotos, preços e estoque",
      "QR Code e botão para WhatsApp",
    ],
  },
  {
    id: "cardapio",
    name: "Cardápio digital",
    icon: "pi pi-book",
    setupCents: 29700,
    monthlyCents: 6990,
    yearlyCents: 77000,
    description: "Ideal para restaurantes, cafés, lanchonetes e delivery.",
    features: [
      "Página personalizada",
      "Cardápio com categorias",
      "Fotos, preços e descrições",
      "Painel administrativo",
      "QR Code para mesas e balcão",
      "Botão para WhatsApp e pedidos",
    ],
  },
];

export const recurringCents = (p: Plan, period: Period) =>
  period === "m" ? p.monthlyCents : p.yearlyCents;
export const totalCents = (p: Plan, period: Period) =>
  p.setupCents + recurringCents(p, period);
export const fmt = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
