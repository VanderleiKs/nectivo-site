import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLANS, planWaLink } from '../../shared/plans';
import { MockupImage } from '../ui/mockup-image';
import { PageIntro } from '../ui/page-intro';

// Para incluir novos exemplos, adicione as imagens em public/ e um item (com a URL publicada) nesta lista.
// Com mais de um exemplo, transforme o `app-mockup-image` em um componente que receba o prefixo do arquivo.
@Component({
  selector: 'app-examples',
  imports: [RouterLink, MockupImage, PageIntro],
  template: `
    <div class="mx-auto max-w-6xl px-5 pb-20 pt-8">
      <app-page-intro crumb="Exemplos" title="Exemplos de sites e landing pages"
        text="Veja como um projeto da Nectivo fica no computador, no tablet e no celular." />

      @for (e of items; track e.title) {
        <article class="mt-10 grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 lg:grid-cols-[1.4fr_1fr]">
          <a [href]="e.url" target="_blank" rel="noopener" class="transition hover:scale-[1.01]">
            <app-mockup-image [alt]="e.alt" sizes="(min-width: 1152px) 585px, (min-width: 1024px) 50vw, calc(100vw - 88px)" />
          </a>
          <div>
            <span class="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{{ e.plan.name }}</span>
            <h2 class="mt-3 text-2xl font-extrabold">{{ e.title }}</h2>
            <p class="mt-2 text-slate-500">{{ e.text }}</p>
            <ul class="mt-5 grid gap-2 text-sm text-slate-600">
              @for (f of e.features; track f) {
                <li class="flex gap-2.5"><i class="pi pi-check mt-0.5 text-xs font-bold text-brand"></i>{{ f }}</li>
              }
            </ul>
            <div class="mt-7 flex flex-wrap gap-3">
              <a [href]="e.url" target="_blank" rel="noopener" class="btn">
                Ver exemplo online <i class="pi pi-external-link"></i>
              </a>
              <a [routerLink]="['/', e.plan.slug]" class="btn-out">Conhecer {{ e.plan.article }}</a>
              <a [href]="wa(e.plan)" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-1 py-3 font-bold text-brand">
                <i class="pi pi-whatsapp"></i> Quero um assim</a>
            </div>
          </div>
        </article>
      }
    </div>
  `,
})
export class Examples {
  protected readonly wa = planWaLink;
  protected readonly items = [
    {
      title: 'Oficina mecânica',
      url: PLANS.find((p) => p.id === 'landing')!.exampleUrl!,
      alt: 'Landing page de uma oficina mecânica exibida em notebook, tablet e celular',
      plan: PLANS.find((p) => p.id === 'landing')!,
      text: 'Landing page com apresentação do negócio, diferenciais, serviços e contato direto pelo WhatsApp.',
      features: [
        'Botão de orçamento pelo WhatsApp',
        'Botão "Como chegar" com localização',
        'Diferenciais e serviços em destaque',
        'Layout responsivo para celular e computador',
      ],
    },
  ];
}
