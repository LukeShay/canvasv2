import { StateModel } from '@lib/server/domain';

export function states() {
  return StateModel.query();
}
