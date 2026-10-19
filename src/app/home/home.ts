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
    { i: "pi pi-palette", t: "Design profissional" },
    { i: "pi pi-globe", t: "Domínio em seu nome" },
    { i: "pi pi-whatsapp", t: "Atendimento pelo WhatsApp" },
    { i: "pi pi-verified", t: "Hospedagem sem fidelidade" },
  ];

  protected readonly trust = [
    { i: "pi pi-check-circle", t: "Processo simples", d: "e sem complicação" },
    { i: "pi pi-comments", t: "Atendimento próximo", d: "pelo WhatsApp" },
    { i: "pi pi-shield", t: "Seu domínio", d: "registrado em seu nome" },
    { i: "pi pi-chart-bar", t: "Soluções para", d: "pequenos negócios" },
  ];
}
