import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WA_GENERAL } from '../../shared/plans';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-30 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <nav class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5" aria-label="Principal">
        <a routerLink="/" class="shrink-0" (click)="open.set(false)">
          <img src="logos/light/nectivo-logo-branco-256h.png" alt="Nectivo" width="132" height="44" class="h-10 w-auto" />
        </a>
        <div class="ml-auto hidden items-center gap-7 text-sm font-medium md:flex">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" [fragment]="l.fragment" routerLinkActive="text-sky-300"
              [routerLinkActiveOptions]="{ exact: true }" class="hover:text-sky-300">{{ l.label }}</a>
          }
        </div>
        <!-- <a [href]="wa" target="_blank" rel="noopener"
          class="ml-auto hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark sm:inline-flex md:ml-0">
          <i class="pi pi-whatsapp"></i> Falar no WhatsApp
        </a> -->
        <button type="button" class="ml-auto grid size-10 place-items-center rounded-xl bg-white/10 md:hidden"
          [attr.aria-expanded]="open()" aria-controls="menu-mobile" aria-label="Abrir menu" (click)="open.set(!open())">
          <i [class]="open() ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>
      </nav>
      @if (open()) {
        <div id="menu-mobile" class="border-t border-white/10 px-5 pb-5 pt-2 md:hidden">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" [fragment]="l.fragment" class="block py-3 font-medium" (click)="open.set(false)">{{ l.label }}</a>
          }
          <a [href]="wa" target="_blank" rel="noopener" class="btn mt-3 w-full">
            <i class="pi pi-whatsapp"></i> Falar no WhatsApp
          </a>
        </div>
      }
    </header>
  `,
})
export class SiteHeader {
  protected readonly wa = WA_GENERAL;
  protected readonly open = signal(false);
  protected readonly links = [
    { label: 'Soluções', path: '/', fragment: 'solucoes' },
    { label: 'Como funciona', path: '/como-funciona' },
    { label: 'Exemplos', path: '/exemplos' },
    { label: 'Dúvidas', path: '/duvidas' },
    { label: 'Contato', path: '/contato' },
  ];
}
