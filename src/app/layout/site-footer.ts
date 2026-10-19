import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, PLANS, WA_GENERAL } from '../../shared/plans';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-navy text-sm text-white/70">
      <div class="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <img src="logos/light/nectivo-logo-branco-128h.png" alt="Nectivo" width="132" height="44" class="h-10 w-auto" />
          <p class="mt-3 max-w-sm">{{ brand.slogan }}</p>
        </div>
        <div>
          <b class="mb-3 block text-white">Soluções</b>
          @for (p of plans; track p.id) {
            <a [routerLink]="['/', p.slug]" class="block py-1 hover:text-white">{{ p.name }}</a>
          }
        </div>
        <div>
          <b class="mb-3 block text-white">Nectivo</b>
          <a routerLink="/como-funciona" class="block py-1 hover:text-white">Como funciona</a>
          <a routerLink="/exemplos" class="block py-1 hover:text-white">Exemplos</a>
          <a routerLink="/duvidas" class="block py-1 hover:text-white">Dúvidas frequentes</a>
          <a routerLink="/contato" class="block py-1 hover:text-white">Contato</a>
          <a [href]="wa" target="_blank" rel="noopener" class="block py-1 hover:text-white">
            <i class="pi pi-whatsapp mr-1"></i> WhatsApp</a>
        </div>
      </div>
      <div class="border-t border-white/10 py-5 text-center text-xs">© {{ year }} Nectivo. Todos os direitos reservados.</div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly brand = BRAND;
  protected readonly plans = PLANS;
  protected readonly wa = WA_GENERAL;
  protected readonly year = new Date().getFullYear();
}
