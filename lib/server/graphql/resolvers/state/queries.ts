import { StateModel } from '../../../domain';

export function states() {
  return StateModel.query();
}
