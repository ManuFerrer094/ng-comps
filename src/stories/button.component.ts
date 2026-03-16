import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'storybook-button',
  imports: [MatButtonModule],
  template: `
    @if (primary()) {
      <button
        mat-flat-button
        type="button"
        class="mf-button mf-button--primary"
        [class.mf-button--small]="size() === 'small'"
        [class.mf-button--medium]="size() === 'medium'"
        [class.mf-button--large]="size() === 'large'"
        [style.--mf-button-bg]="backgroundColor() ?? null"
        (click)="onClick.emit($event)"
      >
        {{ label() }}
      </button>
    } @else {
      <button
        mat-stroked-button
        type="button"
        class="mf-button mf-button--secondary"
        [class.mf-button--small]="size() === 'small'"
        [class.mf-button--medium]="size() === 'medium'"
        [class.mf-button--large]="size() === 'large'"
        (click)="onClick.emit($event)"
      >
        {{ label() }}
      </button>
    }
  `,
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly primary = input(false);
  readonly backgroundColor = input<string | undefined>(undefined);
  readonly size = input<ButtonSize>('medium');
  readonly label = input('Button');
  readonly onClick = output<MouseEvent>();
}
