import { booleanAttribute, Component, input } from '@angular/core';

// Mockup da oficina (notebook, tablet e celular) em várias larguras.
// O navegador escolhe o arquivo pelo `srcset` conforme o `sizes` de cada página.
const SRCSET = [
  'mockup-oficina-352.webp 352w',
  'mockup-oficina-640.webp 640w',
  'mockup-oficina.webp 1000w',
].join(', ');

@Component({
  selector: 'app-mockup-image',
  host: { class: 'block' },
  template: `
    <!-- O src vem por último para o navegador já conhecer srcset/sizes/loading ao iniciar o download. -->
    <img width="1000" height="619" decoding="async" class="h-auto w-full" [alt]="alt()"
      [attr.srcset]="srcset" [attr.sizes]="sizes()"
      [attr.loading]="priority() ? 'eager' : 'lazy'" [attr.fetchpriority]="priority() ? 'high' : null"
      [src]="src" />
  `,
})
export class MockupImage {
  /** Largura exibida em cada breakpoint (atributo `sizes` do <img>). */
  readonly sizes = input.required<string>();
  readonly alt = input('Exemplo de site da Nectivo exibido em notebook, tablet e celular');
  /** true para a imagem principal da página (acima da dobra). */
  readonly priority = input(false, { transform: booleanAttribute });

  protected readonly srcset = SRCSET;
  protected readonly src = 'mockup-oficina.webp';
}
