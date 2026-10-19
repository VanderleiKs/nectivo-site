import { Component } from '@angular/core';
import { WA_GENERAL } from '../../shared/plans';
import { PageIntro } from '../ui/page-intro';

@Component({
  selector: 'app-contact',
  imports: [PageIntro],
  template: `
    <div class="mx-auto max-w-3xl px-5 pb-20 pt-8">
      <app-page-intro crumb="Contato" title="Fale com a gente"
        text="Tire suas dúvidas, solicite uma proposta ou conte mais sobre o seu projeto." />

      <div class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <div class="flex gap-4">
          <span class="grid size-14 shrink-0 place-items-center rounded-full bg-emerald-500 text-2xl text-white"><i class="pi pi-whatsapp"></i></span>
          <div>
            <h2 class="text-lg font-extrabold">Atendimento pelo WhatsApp</h2>
            <p class="text-slate-500">É a forma mais rápida e prática de conversar com a nossa equipe.</p>
          </div>
        </div>
        <a [href]="wa" target="_blank" rel="noopener"
          class="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-white hover:bg-emerald-600">
          <i class="pi pi-whatsapp"></i> Falar no WhatsApp
        </a>
      </div>

      <ul class="mt-6 grid gap-4 text-sm sm:grid-cols-3">
        <li class="flex items-center gap-3"><i class="pi pi-user text-xl text-brand"></i>Atendimento humano e personalizado</li>
        <li class="flex items-center gap-3"><i class="pi pi-file-edit text-xl text-brand"></i>Proposta antes de qualquer pagamento</li>
        <li class="flex items-center gap-3"><i class="pi pi-verified text-xl text-brand"></i>Sem compromisso</li>
      </ul>
    </div>
  `,
})
export class Contact {
  protected readonly wa = WA_GENERAL;
}
