import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REVISIONS_NOTE, WA_GENERAL } from '../../shared/plans';
import { PageIntro } from '../ui/page-intro';

@Component({
  selector: 'app-how',
  imports: [RouterLink, PageIntro],
  template: `
    <div class="mx-auto max-w-6xl px-5 pb-20 pt-8">
      <app-page-intro crumb="Como funciona" title="Como funciona o processo"
        text="Um processo simples e transparente, do primeiro contato à publicação do seu site." />

      <ol class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (s of steps; track s.t; let i = $index) {
          <li class="rounded-3xl border border-slate-200 bg-white p-6">
            <span class="grid size-14 place-items-center rounded-full bg-brand/10 text-2xl text-brand"><i [class]="s.i"></i></span>
            <b class="mt-4 block text-lg"><span class="text-brand">{{ i + 1 }}.</span> {{ s.t }}</b>
            <p class="mt-1 text-sm text-slate-500">{{ s.d }}</p>
            @if (s.note) {
              <p class="mt-2 text-xs font-medium text-brand">{{ s.note }}</p>
            }
          </li>
        }
      </ol>

      <div class="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center sm:flex-row sm:text-left">
        <p class="flex-1 text-slate-600">
          <b class="block text-lg text-ink">Pronto para começar?</b>
          Escolha a solução e fale com a gente para receber a sua proposta.
        </p>
        <a routerLink="/" fragment="solucoes" class="btn-out">Ver soluções</a>
        <a [href]="wa" target="_blank" rel="noopener" class="btn"><i class="pi pi-whatsapp"></i> Falar no WhatsApp</a>
      </div>
    </div>
  `,
})
export class How {
  protected readonly wa = WA_GENERAL;
  protected readonly steps: { i: string; t: string; d: string; note?: string }[] = [
    { i: 'pi pi-comments', t: 'Conversa inicial', d: 'Você entra em contato pelo WhatsApp e nos conta sobre o seu negócio.' },
    { i: 'pi pi-file-edit', t: 'Proposta', d: 'Enviamos a proposta com os detalhes do projeto e alinhamos o que será feito.' },
    { i: 'pi pi-wallet', t: 'Contratação', d: 'Com a proposta aceita, você paga 50% da construção e iniciamos o projeto.' },
    { i: 'pi pi-pen-to-square', t: 'Desenvolvimento', d: 'Criamos o site e você acompanha a evolução, com revisões.*', note: REVISIONS_NOTE },
    { i: 'pi pi-check-circle', t: 'Aprovação', d: 'Com o site finalizado e aprovado, você faz o pagamento dos 50% restantes.' },
    { i: 'pi pi-send', t: 'Publicação', d: 'Na opção construção + hospedagem, publicamos o site em nossa hospedagem e o conectamos ao seu domínio. Na opção só a construção, você recebe os arquivos do site.' },
  ];
}
