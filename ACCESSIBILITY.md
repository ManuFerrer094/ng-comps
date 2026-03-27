# Accessibility Contract for ng-comps v1

## Positioning

`ng-comps` v1 is built to make accessible implementation the default path for Angular teams using Angular Material under a branded component layer.

Repository goals:

- implement against WCAG 2.2 AA at component level
- keep contractual evidence aligned to EN 301 549 v3.2.1 / WCAG 2.1 AA until the next EN revision is formally published
- document known limits so procurement claims stay technically defensible

The library can support accessibility conformance. It cannot guarantee application-level conformance on its own.

## Public Contract

Consumers must follow these rules:

1. Every interactive component must expose an accessible name through visible text, `label`, `ariaLabel`, or `ariaLabelledby`.
2. Placeholders are supplementary hints, never the only label.
3. Icon-only actions must provide an explicit accessible label.
4. Focus must remain visible. Consumers must not remove outlines without an equivalent replacement.
5. Dialogs, menus, selects, datepickers, and sidenavs must use the provided accessible APIs and patterns.
6. Table row interactions must be explicit buttons or links inside cells. Whole-row click targets are not part of the default contract.
7. Theme overrides must preserve contrast and focus ring visibility.

## What the Library Now Enforces

- shared accessible-name contract on interactive form controls
- `ControlValueAccessor` support for core form inputs
- `aria-describedby` wiring for hints, counters, and errors
- `aria-invalid` reflection for explicit and form-driven errors
- visible global `:focus-visible` styling
- safer dialog opening through `MfDialogService`
- explicit row actions in `MfTableComponent`
- snackbar politeness and announcement support
- tooltip directive support on the real host element via `mfTooltip`

## Component Notes

### Buttons and triggers

- `MfButtonComponent` supports icon-only mode, but icon-only usage requires `ariaLabel` or `ariaLabelledby`.
- `MfMenuComponent` exposes a labelled trigger and relies on Angular Material keyboard navigation for menu items.

### Form controls

- `MfInputComponent`
- `MfTextareaComponent`
- `MfSelectComponent`
- `MfAutocompleteComponent`
- `MfDatepickerComponent`
- `MfCheckboxComponent`
- `MfRadioButtonComponent`
- `MfSlideToggleComponent`

These components support Angular forms integration, descriptive relationships, and explicit error announcements.

### Overlays

- `MfDialogService` applies safe defaults for role, autofocus, restore focus, and panel class.
- `MfDialogComponent` requires a visible title or explicit accessible name.
- `MfDatepickerComponent`, `MfSelectComponent`, and `MfAutocompleteComponent` inherit keyboard interaction from Angular Material and are documented with keyboard contract stories in Storybook.

### Data and status

- `MfTableComponent` uses explicit action controls instead of clickable rows.
- `MfProgressBarComponent` and `MfProgressSpinnerComponent` require accessible labels for informative usage.
- `MfBadgeComponent` distinguishes decorative usage from informative usage through `description`.
- `MfAvatarComponent` distinguishes decorative usage from informative usage through `decorative`.

## Automated Validation in This Repo

Local commands:

```bash
npm run build:lib
npm run test:ci
npm run build-storybook
npm run ci
```

Automated coverage currently includes:

- unit tests
- DOM-level accessibility checks with `axe-core`
- regression checks for accessibility-oriented API defaults
- Storybook static build for documentation and contract stories

## Manual Validation Matrix

This repository still requires manual validation before any formal claim:

- keyboard-only navigation
- 200% zoom
- reflow equivalent to 320 CSS px width
- NVDA on Windows
- VoiceOver on macOS
- visible focus review
- contrast review after any token override

## Known Limitations

- Application conformance still depends on consumer content, routing, state changes, and custom wrappers.
- If consumers override tokens or Angular Material theme values, they must re-run contrast checks.
- `MfTooltipComponent` is retained for compatibility, but the preferred API in v1 is the `mfTooltip` directive on the host element.
- Repeated row actions in tables should provide contextual `rowActionAriaLabel` values for best screen reader output.
- Screen reader verification remains mandatory for procurement-grade evidence.

## VPAT-Oriented Evidence Base

This repository now includes:

- component-level accessibility defaults
- automated checks that run in CI
- Storybook contract stories for critical interaction patterns
- explicit documentation of correct usage, anti-patterns, and limitations

That is a usable base for a VPAT process, but not a completed VPAT by itself.

## Normative References

- W3C WCAG overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- EN 301 549 working repository: https://labs.etsi.org/rep/HF/en301549
- ETSI download/status entry referenced in procurement notes: https://portal.etsi.org/webapp/ewp/copy_file.asp?wki_id=64282

As verified on 2026-03-27, W3C states that EN 301 549 currently uses WCAG 2.1 and encourages use of WCAG 2.2, while the EN 301 549 working repository describes the v4.1.0 draft as being in formal approval flow rather than a published replacement.
