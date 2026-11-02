import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  BRAND,
  fmt,
  MAINTENANCE_SUMMARY,
  MONTHLY_LABEL,
  OPTIONS,
  REVISIONS,
  PLANS,
  WA_GENERAL,
} from "../../shared/plans";
import { MockupImage } from "../ui/mockup-image";

@Component({
  selector: "app-home",
  imports: [RouterLink, MockupImage],
  templateUrl: "home.html",
})
export class Home {
  protected readonly brand = BRAND;
  protected readonly plans = PLANS;
  protected readonly money = fmt;
  protected readonly wa = WA_GENERAL;
  protected readonly monthlyLabel = MONTHLY_LABEL;
  protected readonly options = OPTIONS;
  protected readonly maintenanceSummary = MAINTENANCE_SUMMARY;
  protected readonly revisions = REVISIONS;
  protected readonly from = PLANS[0];

  protected readonly badges = [
    { i: "pi pi-palette", t: "Design personalizado" },
    { i: "pi pi-globe", t: "Domínio em seu nome" },
    { i: "pi pi-whatsapp", t: "Atendimento pelo WhatsApp" },
    { i: "pi pi-verified", t: "Hospedagem sem fidelidade" },
  ];

  protected readonly trust = [
    {
      i: "pi pi-cog",
      t: "Implantação completa",
      d: "Cuidamos da criação do site, configuração técnica, SEO básico e presença no Google."
    },
    {
      i: "pi pi-shield",
      t: "Suporte e manutenção",
      d: "Acompanhamento técnico, atualizações e suporte para manter sua presença digital funcionando."
    },
    {
      i: "pi pi-globe",
      t: "Seu domínio, sua marca",
      d: "O domínio é registrado em seu nome. Você mantém a propriedade e o controle da sua identidade digital."
    },
    {
      i: "pi pi-chart-line",
      t: "Você cuida do negócio",
      d: "Nós cuidamos da estrutura digital para que você possa dedicar mais tempo à sua empresa."
    },
  ];
}
