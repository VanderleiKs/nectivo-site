import { Component, signal } from "@angular/core";
import { fmt, PLANS, type Period, type Plan } from "../../shared/plans";
import { CheckoutDialog } from "../checkout/checkout-dialog";

@Component({
  selector: "app-home",
  imports: [CheckoutDialog],
  templateUrl: "home.html",
})
export class Home {
  protected readonly plans = PLANS;
  protected readonly period = signal<Period>("m");
  protected readonly selected = signal<Plan | null>(null);
  protected readonly money = fmt;
  protected readonly steps = [
    {
      i: "pi pi-list",
      t: "1. Escolha o plano",
      d: "Selecione a solução ideal para o seu negócio.",
    },
    {
      i: "pi pi-file-edit",
      t: "3. Envie o briefing",
      d: "Informe seus dados, logo, fotos e preferências.",
    },
    {
      i: "pi pi-credit-card",
      t: "2. Faça o pagamento",
      d: "Por cartão, Pix ou boleto, de forma segura.",
    },
    {
      i: "pi pi-send",
      t: "4. Seu site no ar",
      d: "Entregamos seu site pronto para receber clientes.",
    },
  ];
  protected readonly faq = [
    [
      "O domínio está incluído?",
      "Fazemos a publicação e a configuração do domínio em todos os planos.",
    ],
    [
      "Eu mesmo posso atualizar o conteúdo?",
      "Sim. Os planos com painel administrativo permitem editar textos, fotos e preços.",
    ],
    ["Posso cancelar quando quiser?", "No plano mensal, sim, sem fidelidade."],
    [
      "Quanto tempo leva para ficar pronto?",
      "Depende do envio do briefing. A entrega é rápida.",
    ],
    [
      "O que está incluído na manutenção?",
      "Suporte contínuo, hospedagem e pequenos ajustes.",
    ],
    [
      "Vocês atendem outros tipos de projetos?",
      "Sim, pelo projeto personalizado. Peça um orçamento.",
    ],
  ];

  protected tog(on: boolean) {
    return (
      "rounded-xl px-4 py-2.5 text-sm font-bold " +
      (on ? "bg-brand text-white" : "text-slate-500")
    );
  }
}
