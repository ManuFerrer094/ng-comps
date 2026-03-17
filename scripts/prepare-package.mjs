import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const rootPkgPath = resolve(root, 'package.json');
const distDir = resolve(root, 'dist', 'ng-comps');
const distPkgPath = resolve(distDir, 'package.json');

if (!existsSync(distDir)) {
  throw new Error('No existe dist/ng-comps. Ejecuta primero npm run build:lib');
}

const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
const angularVersion = rootPkg.dependencies['@angular/core'];
const cdkVersion = rootPkg.dependencies['@angular/cdk'];
const materialVersion = rootPkg.dependencies['@angular/material'];
const rxjsVersion = rootPkg.dependencies.rxjs;
const tslibVersion = rootPkg.dependencies.tslib;

const packageJson = {
  name: rootPkg.name,
  version: rootPkg.version,
  description: 'Angular UI components for mf-design-system',
  keywords: ['angular', 'components', 'ui', 'design-system', 'material'],
  license: rootPkg.license || 'MIT',
  type: 'module',
  sideEffects: false,
  main: './fesm2022/ng-comps.mjs',
  module: './fesm2022/ng-comps.mjs',
  typings: './types/ng-comps.d.ts',
  exports: {
    '.': {
      types: './types/ng-comps.d.ts',
      default: './fesm2022/ng-comps.mjs'
    },
    './styles.css': './src/styles.css',
    './theme/tokens.css': './src/theme/tokens.css',
    './theme/material-theme.scss': './src/theme/material-theme.scss',
    './package.json': './package.json'
  },
  peerDependencies: {
    '@angular/animations': angularVersion,
    '@angular/cdk': cdkVersion,
    '@angular/common': angularVersion,
    '@angular/core': angularVersion,
    '@angular/forms': angularVersion,
    '@angular/material': materialVersion,
    '@angular/platform-browser': angularVersion,
    '@angular/router': angularVersion,
    rxjs: rxjsVersion
  },
  dependencies: {
    tslib: tslibVersion
  },
  publishConfig: {
    access: 'public'
  }
};

writeFileSync(distPkgPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
console.log(`package.json optimizado generado en ${distPkgPath}`);
