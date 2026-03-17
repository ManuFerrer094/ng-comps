import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Contenedor de campo de formulario de la librería ng-comps.
 * Proporciona estructura de layout consistente con label, contenido proyectado,
 * y mensajes opcionales de ayuda o error.
 */
@Component({
  selector: 'mf-form-field',
  imports: [],
  template: `
    @if (label()) {
      <label [class]="labelClasses()" [attr.for]="fieldId()">{{ label() }}
        @if (required()) {
          <span class="mf-form-field__required" aria-hidden="true"> *</span>
        }
      </label>
    }
    <div class="mf-form-field__control">
      <ng-content />
    </div>
    @if (error()) {
      <p class="mf-form-field__error" role="alert">{{ error() }}</p>
    } @else if (hint()) {
      <p class="mf-form-field__hint">{{ hint() }}</p>
    }
  `,
  styleUrl: './mf-form-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class MfFormFieldComponent {
  /** Etiqueta del campo */
  readonly label = input<string | undefined>(undefined);
  /** ID para asociar el label con el control */
  readonly fieldId = input<string | undefined>(undefined);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Campo requerido (muestra asterisco) */
  readonly required = input(false);

  readonly labelClasses = computed(() => {
    const classes = ['mf-form-field__label'];
    if (this.error()) classes.push('mf-form-field__label--error');
    return classes.join(' ');
  });

  readonly hostClasses = computed(() => {
    const classes = ['mf-form-field'];
    if (this.error()) classes.push('mf-form-field--error');
    return classes.join(' ');
  });
}
