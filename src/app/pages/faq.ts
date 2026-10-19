import { Component } from '@angular/core';
import { fmt, MAINTENANCE_SUMMARY, PLANS, REVISIONS, WA_GENERAL } from '../../shared/plans';
import { PageIntro } from '../ui/page-intro';

const [landing, inst] = PLANS;

@Component({
  selector: 'app-faq',
  imports: [PageIntro],
  template: `
    <div class="mx-auto max-w-4xl px-5 pb-20 pt-8">
      <app-page-intro crumb="Dúvidas" title="Dúvidas frequentes"
        text="Tire suas dúvidas sobre nossos serviços, processo e plano mensal." />

      <div class="mt-8 grid gap-2.5">
        @for (q of faq; track q[0]) {
          <details class="group rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {{ q[0] }}
              <i class="pi pi-plus text-sm text-brand transition group-open:rotate-45"></i>
            </summary>
            <p class="mt-2 text-slate-600">{{ q[1] }}</p>
          </details>
        }
      </div>

      <div class="mt-10 rounded-3xl bg-white p-6 text-center">
        <p class="font-bold">Não encontrou sua resposta?</p>
        <a [href]="wa" target="_blank" rel="noopener" class="btn mt-3"><i class="pi pi-whatsapp"></i> Falar no WhatsApp</a>
      </div>
    </div>
  `,
})
export class Faq {
  protected readonly wa = WA_GENERAL;
  protected readonly faq = [
    ['Qual a diferença entre construção e plano mensal?',
      `A construção é a criação e publicação do site, paga uma única vez. O plano mensal é opcional, contratado à parte, e inclui ${MAINTENANCE_SUMMARY}, dentro do escopo contratado.`],
    ['Qual a diferença entre a landing page e o site institucional?',
      `A landing page é uma página única para apresentar seu negócio e facilitar o contato (construção a partir de ${fmt(landing.setupCents)}). O site institucional tem várias páginas — início, serviços, sobre e contato — para apresentar sua empresa com mais espaço (construção a partir de ${fmt(inst.setupCents)}).`],
    ['Como funciona o pagamento da construção?',
      'Você paga 50% na contratação e 50% após a aprovação final, antes da publicação do site.'],
    ['Quantas revisões estão incluídas?',
      `A construção inclui até ${REVISIONS} revisões durante o desenvolvimento, antes da aprovação final.`],
    ['Posso contratar só a construção do site?',
      `Sim. Você escolhe só a construção, e recebe os arquivos do site para hospedá-lo onde preferir, ou a construção + hospedagem, com o plano mensal sem fidelidade: a partir de ${fmt(landing.maintenanceCents)}/mês na landing page e ${fmt(inst.maintenanceCents)}/mês no site institucional.`],
    ['Posso cancelar o plano mensal?',
      'Sim, quando quiser, sem fidelidade. A hospedagem e o suporte são encerrados conforme as condições contratadas, você recebe os arquivos do site e o domínio continua em seu nome.'],
    ['O domínio fica no meu nome?',
      'Sim. O domínio é registrado em nome do cliente, e a Nectivo cuida da configuração. O registro do domínio não está incluído nos valores.'],
    ['Posso pedir alterações depois que o site estiver no ar?',
      'Novas páginas, reformulações de layout e novas funcionalidades são orçadas à parte. Ajustes pontuais fazem parte da manutenção técnica do plano mensal, quando contratado.'],
    ['Quanto tempo leva para ficar pronto?',
      'O prazo depende do escopo do projeto e é informado na proposta, depois da conversa inicial.'],
    ['Como faço para contratar?',
      'Escolha a solução, fale com a gente pelo WhatsApp e receba a sua proposta. Com a proposta aceita, fazemos a contratação e iniciamos o projeto.'],
  ];
}
