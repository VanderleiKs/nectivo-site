import {
  BRAND,
  CANCELLATION,
  fmt,
  MAINTENANCE_INCLUDES,
  MONTHLY_LABEL,
  NOT_INCLUDED,
  PLANS,
  REVISIONS,
  WHATSAPP_NUMBER,
} from "./shared/plans";

// Conteúdo de /llms.txt (https://llmstxt.org).
// Gerado a partir da configuração comercial para manter preços e regras atualizados.
// `origin` vem da requisição.

export const llmsTxt = (origin: string) => `# ${BRAND.name}

> ${BRAND.slogan} ${BRAND.pitch}

## Sobre a Nectivo

A Nectivo é uma empresa de soluções digitais focada em presença digital para pequenos negócios. Desenvolve sites profissionais para empresas que desejam apresentar seus serviços, fortalecer sua imagem na internet, transmitir confiança e facilitar o contato com potenciais clientes.

Sua atuação atual concentra-se em duas soluções: landing pages e sites institucionais. O objetivo é oferecer uma presença digital profissional, funcional e adequada às necessidades de cada negócio.

A Nectivo atende comercialmente pelo WhatsApp. Não há contratação online diretamente pelo site.

## Soluções

${PLANS.map((p) => `- [${p.name}](${origin}/${p.slug}): ${p.description} Construção a partir de ${fmt(p.setupCents)} (pagamento único). ${MONTHLY_LABEL} a partir de ${fmt(p.maintenanceCents)}/mês, sem fidelidade.`).join("\n")}

### Landing page

Solução indicada para empresas que desejam apresentar um negócio, serviço ou oferta em uma página profissional, com informações organizadas e caminhos claros para contato.

### Site institucional

Solução indicada para empresas que precisam de uma presença digital mais completa, com páginas organizadas para apresentar a empresa, seus serviços e informações relevantes ao público.

## Como contratar

O atendimento e a definição das necessidades do projeto são realizados pelo WhatsApp: https://wa.me/${WHATSAPP_NUMBER}

## Regras comerciais

- Pagamento da construção: 50% na contratação e 50% após a aprovação final, antes da publicação.
- A construção inclui até ${REVISIONS} revisões durante o desenvolvimento.
- A mensalidade inclui: ${MAINTENANCE_INCLUDES.join(", ")}, dentro do escopo contratado.
- Orçados à parte: ${NOT_INCLUDED.join(", ").toLowerCase()}.
- O domínio é registrado em nome do cliente; a Nectivo cuida da configuração.
${CANCELLATION.map((c) => `- ${c}`).join("\n")}

## Escopo de atuação

A oferta comercial atual da Nectivo contempla landing pages e sites institucionais.

Outras soluções digitais podem ser avaliadas conforme as necessidades dos negócios, mas não devem ser consideradas serviços atualmente disponíveis sem confirmação comercial.

A Nectivo não oferece contratação automática pelo site. Cada projeto é conversado e definido diretamente com o cliente.

## Páginas oficiais

- [Início](${origin}/): apresentação institucional da Nectivo e de sua proposta de presença digital.
- [Landing page](${origin}/landing-page): informações sobre o serviço de criação de landing pages.
- [Site institucional](${origin}/site-institucional): informações sobre o serviço de criação de sites institucionais.
- [Como funciona](${origin}/como-funciona): etapas do primeiro contato à publicação.
- [Exemplos](${origin}/exemplos): demonstrações e possibilidades de aplicação por segmento. Os exemplos ilustram modelos de projetos.
- [Dúvidas frequentes](${origin}/duvidas): informações sobre pagamento, plano mensal, domínio e cancelamento.
- [Contato](${origin}/contato): canal de atendimento comercial pelo WhatsApp.

## Contato

- Canal de atendimento: WhatsApp.
- Link: https://wa.me/${WHATSAPP_NUMBER}
- Site oficial: ${origin}
`;
