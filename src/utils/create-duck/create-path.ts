import { camelCase } from 'lodash';

export function createPath(...names: (string | string[])[]): string {
  const pathValues = names
    .flat(2)
    .filter((value) => Boolean(value))
    .map((name) => {
      const camelCaseName = camelCase(name);
      if (name !== camelCaseName) {
        // eslint-disable-next-line no-console
        console.warn(
          `🦆 "${name}" is not camelCase. The name will be converted to "${camelCaseName}".`,
        );
      }
      return camelCaseName;
    });

  return pathValues.join('.');
}
