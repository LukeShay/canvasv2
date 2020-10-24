import { v4 } from 'uuid';
import { User, UserModel } from '../../../../../lib/server';
import { UserRole } from '../../../../../lib/types';
import { chance } from '../../../../../setup-tests';
import { setupTransactionalDatabase } from '../../../../utils';

describe('user class', () => {
  setupTransactionalDatabase();

  it('should save a new user when calling save', async () => {
    expect.hasAssertions();

    const user = new User({
      email: chance.email(),
      firstName: chance.first(),
      id: v4(),
      lastName: chance.last(),
      password: chance.string(),
      role: UserRole.BASIC,
    });

    await user.save();

    const savedUser = await UserModel.query().findById(user.id);

    expect(savedUser).toBeDefined();
  });
});
