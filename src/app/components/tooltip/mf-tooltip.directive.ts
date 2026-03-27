import { Directive } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

export type MfTooltipPosition = 'above' | 'below' | 'left' | 'right';

@Directive({
  selector: '[mfTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: [
        'matTooltip: mfTooltip',
        'matTooltipPosition: mfTooltipPosition',
        'matTooltipDisabled: mfTooltipDisabled',
        'matTooltipShowDelay: mfTooltipShowDelay',
        'matTooltipHideDelay: mfTooltipHideDelay',
      ],
    },
  ],
})
export class MfTooltipDirective {}
