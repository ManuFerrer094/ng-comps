import { isDevMode } from '@angular/core';

let nextUniqueId = 0;
const emittedWarnings = new Set<string>();

export function createUniqueId(prefix: string): string {
  nextUniqueId += 1;
  return `${prefix}-${nextUniqueId}`;
}

export function mergeAriaIds(
  ...values: Array<string | null | undefined>
): string | null {
  const ids = values
    .flatMap((value) => (value ? value.split(/\s+/) : []))
    .map((value) => value.trim())
    .filter(Boolean);

  return ids.length > 0 ? Array.from(new Set(ids)).join(' ') : null;
}

export function hasAccessibleName(
  ...values: Array<string | null | undefined>
): boolean {
  return values.some((value) => Boolean(value?.trim()));
}

export function warnInDev(message: string): void {
  if (!isDevMode() || emittedWarnings.has(message)) {
    return;
  }

  emittedWarnings.add(message);
  console.warn(`[ng-comps:a11y] ${message}`);
}
