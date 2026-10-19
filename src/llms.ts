import {
  BRAND, CANCELLATION, fmt, MAINTENANCE_INCLUDES, MONTHLY_LABEL, NOT_INCLUDED, PLANS, REVISIONS, WHATSAPP_NUMBER,
} from './shared/plans';

// Conteúdo de /llms.txt (https://llmstxt.org), gerado a partir da configuração comercial
// para que preços e regras nunca fiquem desatualizados. `origin` vem da requisição.
export const llmsTxt = (origin: string) => `# ${BRAND.name}

> ${BRAND.slogan} ${BRAND.pitch}

A Nectivo oferece duas soluções: landing page e site institucional. A construção do site é paga uma única vez, separadamente do plano mensal (hospedagem e suporte), que é opcional e sem fidelidade. Há duas formas de contratar: só a construção (o cliente recebe os arquivos do site) ou construção + hospedagem (construção + plano mensal). O atendimento comercial é feito pelo WhatsApp (https://wa.me/${WHATSAPP_NUMBER}); não há contratação online pelo site.

## Soluções

${PLANS.map((p) => `- [${p.name}](${origin}/${p.slug}): ${p.description} Construção a partir de ${fmt(p.setupCents)} (pagamento único). ${MONTHLY_LABEL} a partir de ${fmt(p.maintenanceCents)}/mês, sem fidelidade.`).join('\n')}

## Regras comerciais

- Pagamento da construção: 50% na contratação e 50% após a aprovação final, antes da publicação.
- A construção inclui até ${REVISIONS} revisões durante o desenvolvimento.
- O plano mensal inclui: ${MAINTENANCE_INCLUDES.join(', ')}, dentro do escopo contratado.
- Orçados à parte: ${NOT_INCLUDED.join(', ').toLowerCase()}.
- O domínio é registrado em nome do cliente; a Nectivo cuida da configuração.
${CANCELLATION.map((c) => `- ${c}`).join('\n')}

## Páginas

- [Como funciona](${origin}/como-funciona): etapas do primeiro contato à publicação.
- [Dúvidas frequentes](${origin}/duvidas): perguntas sobre pagamento, plano mensal, domínio e cancelamento.
- [Exemplos](${origin}/exemplos): ideias de uso por segmento (ilustrações de modelo).
- [Contato](${origin}/contato): atendimento pelo WhatsApp.
`;
