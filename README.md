# ng-comps

Libreria de componentes UI para Angular con enfoque en:

- paquete NPM liviano
- tree-shaking real
- peers de Angular (sin duplicar framework en cada instalacion)

## Instalacion (consumidor)

```bash
npm i ng-comps
```

Importa solo lo que usas:

```ts
import { MfButtonComponent } from 'ng-comps';
```

Si quieres usar los tokens/estilos base:

```css
@import 'ng-comps/theme/tokens.css';
@import 'ng-comps/styles.css';
```

## Publicacion optimizada a NPM

Este repo publica desde `dist/ng-comps`, no desde la raiz. De esta forma no se suben historias, tests ni archivos de desarrollo.

1. Construir la libreria APF:

```bash
npm run build:lib
```

2. Generar `package.json` optimizado para distribucion:

```bash
npm run prepare:package
```

3. Verificar contenido del paquete antes de publicar:

```bash
npm run release:dry-run
```

4. Publicar:

```bash
npm run publish:npm
```

## Estrategia de optimizacion aplicada

- `sideEffects: false` para maximizar tree-shaking
- `peerDependencies` para Angular y RxJS (evita bundles duplicados)
- `dependencies` minimas (`tslib`)
- `exports` explicitos para entrypoint y estilos
- publicacion desde carpeta de build (`dist/ng-comps`)
