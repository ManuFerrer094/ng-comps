# ng-comps

Angular UI library built on top of Angular Material with a public accessibility contract.

## Installation

```bash
npm i ng-comps
```

Import only what you use:

```ts
import { MfButtonComponent } from 'ng-comps';
```

Load the shared tokens and base styles in your global stylesheet:

```css
@import 'ng-comps/theme/tokens.css';
@import 'ng-comps/styles.css';
```

## Accessibility Contract

`ng-comps` v1 is designed to support:

- WCAG 2.2 AA implementation targets in the component layer
- EN 301 549 evidence mapping when the library is used as documented
- Contractual reporting against EN 301 549 v3.2.1 / WCAG 2.1 AA until the next EN update is formally published

The library is accessible by default only when consumers keep the semantic contract intact:

- interactive components must have an accessible name
- visible labels are preferred over placeholders
- overlays must be opened through the provided accessible APIs
- row actions in tables must be explicit and focusable
- custom theming must preserve contrast and visible focus states

Read the full contract, QA matrix, limitations, and VPAT-oriented notes in [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Development

```bash
npm run build:lib
npm run test:ci
npm run build-storybook
npm run ci
```

`npm run ci` executes the local gate used by CI:

- library build
- unit and accessibility tests
- Storybook static build

## Storybook

Storybook is the primary documentation surface for component usage and accessibility contracts.

- component API stories live in `src/stories`
- accessibility contract stories cover keyboard, focus, overlays, and explicit actions
- anti-patterns are documented as examples of what not to ship

## Publishing

This repository publishes from `dist/ng-comps`, not from the workspace root.

```bash
npm run build:lib
npm run prepare:package
npm run release:dry-run
npm run publish:npm
```

## Important Limitation

Using `ng-comps` does not make an application automatically conformant with WCAG or EN 301 549.
Final conformance still depends on product copy, content, workflows, application state management, custom wrappers, and consumer integration decisions.
