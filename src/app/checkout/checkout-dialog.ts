import { afterNextRender, Component, computed, ElementRef, inject, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { fmt, recurringCents, totalCents, type Pay, type Period, type Plan } from '../../shared/plans';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-checkout-dialog',
  template: `
    <dialog #dlg (close)="closed.emit()" aria-label="Finalizar pedido"
      class="m-auto w-[min(34rem,calc(100%-1.5rem))] rounded-3xl p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm">
      <div class="flex items-center justify-between px-6 pt-5">
        <b>{{ step() < 4 ? 'Passo ' + step() + ' de 3' : 'Pedido enviado' }}</b>
        <button type="button" class="grid size-9 place-items-center rounded-full bg-mist" aria-label="Fechar" (click)="dlg.close()">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <div class="flex gap-1.5 px-6 pt-3">
        @for (n of [1, 2, 3]; track n) {
          <i class="h-1.5 flex-1 rounded-full" [class]="n <= step() ? 'bg-brand' : 'bg-slate-200'"></i>
        }
      </div>

      <div class="p-6">
        @switch (step()) {
         <!--  @case (1) {
            <h3 class="text-xl font-extrabold">{{ plan().name }}</h3>
            <p class="mb-4 text-sm text-slate-500">Escolha o período de cobrança.</p>
            <div class="grid gap-2.5" role="radiogroup">
              <button type="button" role="radio" [attr.aria-checked]="period() === 'm'" (click)="setPeriod('m')" [class]="opt(period() === 'm')">
                <span>Mensal<small class="block text-xs text-slate-500">Sem fidelidade</small></span>
                <b>{{ fmt(plan().monthlyCents) }}/mês</b>
              </button>
              <button type="button" role="radio" [attr.aria-checked]="period() === 'a'" (click)="setPeriod('a')" [class]="opt(period() === 'a')">
                <span>Anual <em class="ml-1 rounded bg-emerald-100 px-1.5 text-xs font-bold not-italic text-emerald-700">2 meses grátis</em>
                  <small class="block text-xs text-slate-500">Equivale a {{ fmt(plan().yearlyCents / 12) }}/mês</small></span>
                <b>{{ fmt(plan().yearlyCents) }}/ano</b>
              </button>
            </div>
          }
          @case (2) {
            <h3 class="text-xl font-extrabold">Como prefere pagar?</h3>
            <p class="mb-4 text-sm text-slate-500">Você recebe o link seguro de pagamento logo após o pedido.</p>
            <div class="grid gap-2.5" role="radiogroup">
              @for (o of payOptions; track o.id) {
                <button type="button" role="radio" [attr.aria-checked]="pay() === o.id" [disabled]="o.id === 'boleto' && period() === 'm'"
                  (click)="pay.set(o.id)" [class]="opt(pay() === o.id)" class="disabled:cursor-not-allowed disabled:opacity-40">
                  <span>{{ o.label }}<small class="block text-xs text-slate-500">{{ o.hint }}</small></span>
                  <i [class]="o.icon"></i>
                </button>
              }
            </div>
          } -->
          @case (1) {
            <h3 class="text-xl font-extrabold">Quase lá! Seus dados</h3>
            <p class="mb-4 text-sm text-slate-500">Usamos apenas para enviar o pagamento e o briefing.</p>
            <div class="grid gap-3">
              <label class="grid gap-1 text-sm font-bold">Nome
                <input class="field" autocomplete="name" [value]="name()" (input)="name.set($any($event.target).value)" /></label>
              <label class="grid gap-1 text-sm font-bold">WhatsApp
                <input class="field" type="tel" autocomplete="tel" placeholder="(51) 99999-9999" [value]="phone()" (input)="phone.set($any($event.target).value)" /></label>
              <label class="grid gap-1 text-sm font-bold">E-mail
                <input class="field" type="email" autocomplete="email" [value]="email()" (input)="email.set($any($event.target).value)" /></label>
            </div>
            @if (error()) { <p class="mt-3 text-sm font-semibold text-red-600" role="alert">{{ error() }}</p> }
          }
          @default {
            <div class="py-2 text-center">
              <i class="pi pi-check-circle text-5xl text-emerald-500"></i>
              <h3 class="mt-3 text-xl font-extrabold">Pedido recebido, {{ firstName() }}!</h3>
              <p class="mt-1 text-sm text-slate-500">Enviaremos o link de pagamento e o briefing no seu WhatsApp.</p>
            </div>
            <a class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white" target="_blank" rel="noopener" [href]="waLink()">
              <i class="pi pi-whatsapp"></i> Enviar no WhatsApp</a>
          }
        }

        @if (step() < 4) {
          <div class="my-4 rounded-2xl bg-mist p-4 text-sm text-slate-600">
            <div class="flex justify-between py-0.5"><span>{{ plan().name }} (criação única)</span><span>{{ fmt(plan().setupCents) }}</span></div>
            <div class="flex justify-between py-0.5"><span>{{ period() === 'm' ? '1º mês' : 'Plano anual' }}</span><span>{{ fmt(recurring()) }}</span></div>
            <div class="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-ink"><span>Total hoje</span><span>{{ fmt(total()) }}</span></div>
          </div>
          <div class="flex gap-2.5">
            @if (step() > 1) {
              <button type="button" class="btn-out flex-1" (click)="step.set(step() - 1)">Voltar</button>
            }
            @if (step() < 2) {
              <button type="button" class="btn flex-1" (click)="step.set(step() + 1)">Continuar <i class="pi pi-arrow-right"></i></button>
            } <!-- @else {
              <button type="button" class="btn flex-1" [disabled]="!valid() || sending()" (click)="submit()">
                {{ sending() ? 'Enviando…' : 'Finalizar pedido' }}</button>
            } -->
          </div>
        }
      </div>
    </dialog>
  `,
})
export class CheckoutDialog {
  readonly plan = input.required<Plan>();
  readonly initialPeriod = input<Period>('m');
  readonly closed = output<void>();

  private readonly orders = inject(OrdersService);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  protected readonly fmt = fmt;
  protected readonly payOptions: { id: Pay; label: string; hint: string; icon: string }[] = [
    { id: 'pix', label: 'Pix', hint: 'Aprovação na hora', icon: 'pi pi-qrcode' },
    { id: 'card', label: 'Cartão de crédito', hint: 'Único ou recorrente', icon: 'pi pi-credit-card' },
    { id: 'boleto', label: 'Boleto', hint: 'Disponível só para planos anuais', icon: 'pi pi-barcode' },
  ];

  protected readonly step = signal(1);
  protected readonly period = linkedSignal<Period>(() => this.initialPeriod());
  protected readonly pay = signal<Pay>('pix');
  protected readonly name = signal('');
  protected readonly phone = signal('');
  protected readonly email = signal('');
  protected readonly sending = signal(false);
  protected readonly error = signal('');

  protected readonly recurring = computed(() => recurringCents(this.plan(), this.period()));
  protected readonly total = computed(() => totalCents(this.plan(), this.period()));
  protected readonly firstName = computed(() => this.name().trim().split(' ')[0]);
  protected readonly valid = computed(
    () => this.name().trim().length > 1 && this.phone().replace(/\D/g, '').length >= 10 && /^\S+@\S+\.\S+$/.test(this.email().trim()),
  );
  protected readonly waLink = computed(() => {
    const msg = `Olá! Fiz o pedido do plano ${this.plan().name} (${this.period() === 'm' ? 'mensal' : 'anual'}). Meu nome é ${this.name()}.`;
    return `https://wa.me/5551999999999?text=${encodeURIComponent(msg)}`;
  });

  constructor() {
    afterNextRender(() => this.dlg().nativeElement.showModal());
  }

  protected opt(active: boolean) {
    return 'flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left ' +
      (active ? 'border-brand bg-brand/10' : 'border-slate-200 bg-mist');
  }

  protected setPeriod(p: Period) {
    this.period.set(p);
    if (p === 'm' && this.pay() === 'boleto') this.pay.set('pix');
  }

  protected async submit() {
    this.sending.set(true);
    this.error.set('');
    try {
      await this.orders.create({
        plan: this.plan().id, period: this.period(), pay: this.pay(),
        name: this.name().trim(), phone: this.phone().trim(), email: this.email().trim(),
      });
      this.step.set(4);
    } catch {
      this.error.set('Não foi possível enviar o pedido. Tente novamente ou fale no WhatsApp.');
    } finally {
      this.sending.set(false);
    }
  }
}
