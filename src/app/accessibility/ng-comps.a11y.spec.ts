import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as axe from 'axe-core';
import { MfButtonComponent } from '../components/button';
import { MfDialogComponent } from '../components/dialog';
import { MfInputComponent } from '../components/input';
import { MfSelectComponent } from '../components/select';

async function expectNoAxeViolations(
  fixture: ComponentFixture<unknown>,
): Promise<void> {
  await fixture.whenStable();
  const results = await axe.run(fixture.nativeElement as HTMLElement, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
    },
    rules: {
      region: { enabled: false },
      'page-has-heading-one': { enabled: false },
      'landmark-one-main': { enabled: false },
    },
  });

  const summaries = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.map((node) => node.target.join(' ')),
  }));

  expect(summaries).toEqual([]);
}

describe('ng-comps accessibility contract', () => {
  it('renders a labeled text button without axe violations', async () => {
    await TestBed.configureTestingModule({
      imports: [MfButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MfButtonComponent);
    fixture.componentRef.setInput('label', 'Guardar cambios');
    fixture.detectChanges();

    await expectNoAxeViolations(fixture);
  });

  it('renders an icon-only button with an explicit accessible name', async () => {
    await TestBed.configureTestingModule({
      imports: [MfButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MfButtonComponent);
    fixture.componentRef.setInput('iconOnly', true);
    fixture.componentRef.setInput('leadingIcon', 'settings');
    fixture.componentRef.setInput('ariaLabel', 'Abrir configuración');
    fixture.detectChanges();

    await expectNoAxeViolations(fixture);
  });

  it('renders an input with visible label, hint and error wiring', async () => {
    await TestBed.configureTestingModule({
      imports: [MfInputComponent, NoopAnimationsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(MfInputComponent);
    fixture.componentRef.setInput('label', 'Correo electrónico');
    fixture.componentRef.setInput('hint', 'Usa tu correo corporativo');
    fixture.componentRef.setInput('error', 'El correo es obligatorio');
    fixture.detectChanges();

    await expectNoAxeViolations(fixture);
  });

  it('renders a select with visible label and helper text', async () => {
    await TestBed.configureTestingModule({
      imports: [MfSelectComponent, NoopAnimationsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(MfSelectComponent);
    fixture.componentRef.setInput('label', 'Framework');
    fixture.componentRef.setInput('hint', 'Selecciona una opción');
    fixture.componentRef.setInput('options', [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
    ]);
    fixture.detectChanges();

    await expectNoAxeViolations(fixture);
  });

  it('renders an inline dialog with title and description', async () => {
    await TestBed.configureTestingModule({
      imports: [MfDialogComponent, NoopAnimationsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(MfDialogComponent);
    fixture.componentRef.setInput('title', 'Confirmar acción');
    fixture.componentRef.setInput(
      'message',
      'Este cambio se aplicará de forma permanente.',
    );
    fixture.componentRef.setInput('showActions', false);
    fixture.detectChanges();

    await expectNoAxeViolations(fixture);
  });
});
