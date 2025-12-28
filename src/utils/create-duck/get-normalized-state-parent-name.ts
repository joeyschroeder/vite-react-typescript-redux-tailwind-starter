import { camelCase } from 'lodash';

export function getNormalizedStateParamName(key = ''): string {
  if (!key) throw new Error('key is required');

  const normalizedKeyName = camelCase(key);
  return `${normalizedKeyName[0].toUpperCase()}${normalizedKeyName.slice(1)}`;
}
