import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CANCELLATION, fmt, MAINTENANCE_INCLUDES, MONTHLY_LABEL, OPTIONS, NOT_INCLUDED, PAYMENT_SPLIT, PLANS, planBySlug, planWaLink,
} from '../../shared/plans';
import { MockupImage } from '../ui/mockup-image';
import { PageIntro } from '../ui/page-intro';

// Página de detalhes de uma solução. O slug vem do `data` da rota.
@Component({
  selector: 'app-solution',
  imports: [RouterLink, MockupImage, PageIntro],
  templateUrl: 'solution.html'
})
export class Solution {
  readonly slug = input.required<string>();

  protected readonly plan = computed(() => planBySlug(this.slug()) ?? PLANS[0]);
  protected readonly other = computed(() => PLANS.find((p) => p.id !== this.plan().id));
  protected readonly wa = computed(() => planWaLink(this.plan()));

  protected readonly money = fmt;
  protected readonly monthlyLabel = MONTHLY_LABEL;
  protected readonly options = OPTIONS;
  protected readonly maintenance = MAINTENANCE_INCLUDES;
  protected readonly notIncluded = NOT_INCLUDED;
  protected readonly payment = PAYMENT_SPLIT;
  protected readonly cancellation = CANCELLATION;
}
