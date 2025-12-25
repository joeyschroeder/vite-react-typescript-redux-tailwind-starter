import { get } from 'lodash';

export function createSelectState(
  path = '',
  initialState: any = undefined,
): (state: object) => any {
  return (state: object = {}) => get(state, path, initialState);
}
