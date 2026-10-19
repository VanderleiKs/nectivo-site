import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

// Cabeçalho padrão das páginas internas: breadcrumb, rótulo, título e texto de apoio.
@Component({
  selector: 'app-page-intro',
  imports: [RouterLink],
  template: `
    <nav aria-label="Você está em" class="flex items-center gap-2 text-xs" [class]="dark() ? 'text-white/60' : 'text-slate-500'">
      <a routerLink="/" [class]="dark() ? 'hover:text-white' : 'hover:text-brand'">Início</a>
      <i class="pi pi-chevron-right text-[0.6rem]"></i>
      <span aria-current="page">{{ crumb() }}</span>
    </nav>
    @if (eyebrow()) {
      <p class="mt-6 text-xs font-extrabold uppercase tracking-wider" [class]="dark() ? 'text-sky-300' : 'text-brand'">{{ eyebrow() }}</p>
    }
    <h1 class="mt-2 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{{ title() }}</h1>
    @if (text()) {
      <p class="mt-4 max-w-xl" [class]="dark() ? 'text-white/80' : 'text-slate-500'">{{ text() }}</p>
    }
  `,
})
export class PageIntro {
  readonly crumb = input.required<string>();
  readonly title = input.required<string>();
  readonly eyebrow = input('');
  readonly text = input('');
  /** Versão para fundo escuro (azul-marinho). */
  readonly dark = input(false, { transform: booleanAttribute });
}
