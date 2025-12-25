export function isInitialStatePrimitive<Type>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  initialState: Type extends Function ? never : Type,
): boolean {
  if (initialState === null || initialState === undefined) return true;
  return Array.isArray(initialState) || typeof initialState !== 'object';
}
