import { v4 } from 'uuid';
import { IClass } from '../../../../types';
import { admin } from '../../../authenticator';
import { ClassModel } from '../../../domain';
import { MutationArgs, Context } from '../../types';

export async function createClass(_, args: MutationArgs<IClass>, context: Context) {
  const user = admin(context);

  const newClass = await ClassModel.query().insertAndFetch({
    ...args.input,
    id: v4(),
    adminId: user.id,
  });

  return { class: newClass };
}
