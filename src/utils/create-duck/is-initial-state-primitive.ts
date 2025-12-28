export function isInitialStatePrimitive<Type>(initialState: Type): boolean {
  if (typeof initialState === 'function') {
    throw new Error('typeof `initialState` cannot be `"initialState"`');
  }

  if (initialState === null || initialState === undefined) return true;

  return Array.isArray(initialState) || typeof initialState !== 'object';
}
