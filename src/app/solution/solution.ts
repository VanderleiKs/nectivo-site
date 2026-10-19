import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CANCELLATION, fmt, MAINTENANCE_INCLUDES, MONTHLY_LABEL, OPTIONS, NOT_INCLUDED, PAYMENT_SPLIT, PLANS, planBySlug, planWaLink,
} from '../../shared/plans';
import { MockupImage } from '../ui/mockup-image';
import { PageIntro } from '../ui/page-intro';

// Página de detalhes de uma solução. O slug vem do `data` da rota.
@Component({
  selector: 'app-solution',
  imports: [RouterLink, MockupImage, PageIntro],
  template: `
    @let p = plan();
    <section class="overflow-hidden bg-navy bg-[radial-gradient(700px_420px_at_85%_30%,#173f86,transparent_70%)] text-white">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <app-page-intro dark [crumb]="p.name" [eyebrow]="p.name" [title]="p.tagline" [text]="p.description" />
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a [href]="wa()" target="_blank" rel="noopener" class="btn hover:bg-brand-dark">
              <i class="pi pi-whatsapp"></i> Quero {{ p.article }}
            </a>
            @if (p.exampleUrl) {
              <a [href]="p.exampleUrl" target="_blank" rel="noopener"
                class="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold hover:bg-white/10">
                Ver exemplo online <i class="pi pi-external-link"></i>
              </a>
            }
          </div>
        </div>
        <app-mockup-image priority class="mx-auto w-full max-w-md lg:max-w-none"
          sizes="(min-width: 1152px) 510px, (min-width: 1024px) 45vw, (min-width: 488px) 448px, calc(100vw - 40px)" />
      </div>
      <ul class="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 pb-12 sm:flex sm:justify-between">
        @for (h of p.highlights; track h.label) {
          <li class="flex flex-col items-center gap-2 text-center text-sm font-medium text-white/85">
            <span class="grid size-12 place-items-center rounded-2xl bg-brand/30 text-xl text-sky-300"><i [class]="h.icon"></i></span>
            {{ h.label }}
          </li>
        }
      </ul>
    </section>

    <div class="mx-auto grid max-w-6xl gap-6 px-5 py-12">
      <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section class="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 class="text-2xl font-extrabold">O que está incluído na construção?</h2>
          <ul class="mt-5 grid gap-2.5 text-slate-600">
            @for (f of p.construction; track f) {
              <li class="flex gap-2.5"><i class="pi pi-check mt-1 text-xs font-bold text-brand"></i>{{ f }}</li>
            }
          </ul>
        </section>

        <aside class="rounded-3xl border-2 border-brand/20 bg-brand/5 p-6 md:p-8" aria-labelledby="investimento">
          <h2 id="investimento" class="flex items-center gap-2 font-extrabold text-brand"><i class="pi pi-wallet"></i> Investimento</h2>
          <div class="mt-5">
            <p class="text-sm font-bold">Construção</p>
            <p class="text-xs text-slate-500">a partir de</p>
            <p class="text-4xl font-extrabold tracking-tight">{{ money(p.setupCents) }}</p>
            <p class="text-sm text-slate-500">pagamento único</p>
          </div>
          <div class="mt-5 border-t border-brand/15 pt-5">
            <p class="text-sm font-bold">{{ monthlyLabel }}</p>
            <p class="text-xs text-slate-500">a partir de</p>
            <p class="text-3xl font-extrabold tracking-tight">{{ money(p.maintenanceCents) }}<span class="text-base">/mês</span></p>
            <p class="text-sm text-slate-500">Sem fidelidade. Cancele quando quiser.</p>
          </div>
          <div class="mt-5 grid gap-2 rounded-xl bg-white p-3 text-xs text-slate-500">
            <p><b class="text-ink">{{ options.build }}:</b> {{ money(p.setupCents) }}, pagamento único. Você recebe os arquivos do site.</p>
            <p><b class="text-ink">{{ options.hosted }}:</b> {{ money(p.setupCents) }} + {{ money(p.maintenanceCents) }}/mês. Publicamos e mantemos o site em nossa hospedagem.</p>
          </div>
        </aside>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <section class="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
          <h2 class="flex items-center gap-2 font-extrabold"><i class="pi pi-check-circle text-emerald-600"></i> O que o plano mensal inclui?</h2>
          <ul class="mt-4 grid gap-2 text-sm text-slate-600">
            @for (m of maintenance; track m) {
              <li class="flex gap-2.5"><i class="pi pi-check mt-0.5 text-xs text-emerald-600"></i>{{ m }}</li>
            }
          </ul>
          <p class="mt-4 text-xs text-slate-500">Sempre dentro do escopo contratado.</p>
        </section>
        <section class="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 md:p-8">
          <h2 class="flex items-center gap-2 font-extrabold"><i class="pi pi-times-circle text-rose-500"></i> O que é orçado à parte?</h2>
          <ul class="mt-4 grid gap-2 text-sm text-slate-600">
            @for (n of notIncluded; track n) {
              <li class="flex gap-2.5"><i class="pi pi-times mt-0.5 text-xs text-rose-500"></i>{{ n }}</li>
            }
          </ul>
          <p class="mt-4 text-xs text-slate-500">Esses itens não fazem parte do plano mensal e recebem orçamento próprio.</p>
        </section>
      </div>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 class="text-xl font-extrabold">Como funciona o pagamento da construção?</h2>
        <ol class="mt-5 grid gap-5 md:grid-cols-3">
          @for (s of payment; track s.title; let i = $index) {
            <li class="flex gap-3">
              <span class="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">{{ i + 1 }}</span>
              <div>
                <b class="block">{{ s.title }}</b>
                @if (s.percent) {
                  <span class="text-sm font-bold text-brand">{{ money(p.setupCents * s.percent / 100) }}</span>
                  <span class="text-xs text-slate-500"> (sobre {{ money(p.setupCents) }})</span>
                }
                <p class="text-sm text-slate-500">{{ s.text }}</p>
                @if (s.note) {
                  <p class="mt-1 text-xs font-medium text-brand">{{ s.note }}</p>
                }
              </div>
            </li>
          }
        </ol>
      </section>

      <section class="flex gap-3 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <i class="pi pi-info-circle mt-1 text-brand"></i>
        <div>
          <h2 class="font-extrabold">E se eu cancelar o plano mensal?</h2>
          @for (c of cancellation; track c) {
            <p class="mt-1 text-sm text-slate-600">{{ c }}</p>
          }
        </div>
      </section>

      <a [href]="wa()" target="_blank" rel="noopener" class="btn w-full py-4 text-lg hover:bg-brand-dark">
        <i class="pi pi-whatsapp"></i> Quero {{ p.article }} — falar no WhatsApp
      </a>
      <p class="-mt-3 text-center text-sm text-slate-500">
        Pelo WhatsApp alinhamos as informações e enviamos a sua proposta.
        @if (other(); as o) {
          Prefere comparar? <a [routerLink]="['/', o.slug]" class="font-bold text-brand">Veja {{ o.article }}</a>.
        }
      </p>
    </div>
  `,
})
export class Solution {
  readonly slug = input.required<string>();

  protected readonly plan = computed(() => planBySlug(this.slug()) ?? PLANS[0]);
  protected readonly other = computed(() => PLANS.find((p) => p.id !== this.plan().id));
  protected readonly wa = computed(() => planWaLink(this.plan()));

  protected readonly money = fmt;
  protected readonly monthlyLabel = MONTHLY_LABEL;
  protected readonly options = OPTIONS;
  protected readonly maintenance = MAINTENANCE_INCLUDES;
  protected readonly notIncluded = NOT_INCLUDED;
  protected readonly payment = PAYMENT_SPLIT;
  protected readonly cancellation = CANCELLATION;
}
