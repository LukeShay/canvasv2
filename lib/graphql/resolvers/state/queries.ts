import { StateModel } from '~/lib/api/domain';

export function states() {
  return StateModel.query();
}
