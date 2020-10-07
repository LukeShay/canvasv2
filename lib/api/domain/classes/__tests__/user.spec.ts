import { v4 } from 'uuid';
import { CanvasV2Error, IUser, UserRole } from '../../../../types';
import { UserModel } from '../../models/user-model';
import { setupTransactionalDatabase } from '../../__helpers__/db-utils';
import { chance } from '../../__helpers__/test-setup';
import { User } from '../user';

describe('User', () => {
  let userObj: IUser;
  let user: User;

  setupTransactionalDatabase();

  beforeEach(() => {
    userObj = {
      email: chance.email(),
      firstName: chance.first(),
      id: v4(),
      lastName: chance.last(),
      password: chance.string({
        alpha: true,
        length: 10,
        numeric: true,
        symbols: true,
      }),
      role: UserRole.BASIC,
      address1: chance.address(),
      address2: `#${chance.integer()}`,
      city: chance.city(),
      stateId: v4(),
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      zip: chance.zip(),
    };
    user = new User(userObj);
  });

  it('should construct a User properly', () => {
    expect(user.address1).toEqual(userObj.address1);
    expect(user.address2).toEqual(userObj.address2);
    expect(user.city).toEqual(userObj.city);
    expect(user.createdAt).toEqual(userObj.createdAt);
    expect(user.email).toEqual(userObj.email);
    expect(user.firstName).toEqual(userObj.firstName);
    expect(user.id).toEqual(userObj.id);
    expect(user.lastName).toEqual(userObj.lastName);
    expect(user.password).toEqual(userObj.password);
    expect(user.role).toEqual(userObj.role);
    expect(user.stateId).toEqual(userObj.stateId);
    expect(user.updatedAt).toEqual(userObj.updatedAt);
    expect(user.zip).toEqual(userObj.zip);
  });

  describe('save', () => {
    it('should add new user to the database', async () => {
      await user.save();

      expect(await UserModel.query().findById(user.id)).toEqual(user);
    });

    it('should update existing user', async () => {
      await user.save();

      user.email = chance.email();
      user.address1 = chance.address();

      await user.save();

      expect(await UserModel.query().findById(user.id)).toEqual(user);
      expect((await UserModel.query()).length).toEqual(1);
    });

    it('should throw an error if email is taken when saving a new user', async () => {
      let error: Error | undefined;

      await user.save();

      const secondUser = new User(userObj);
      secondUser.id = v4();

      try {
        await secondUser.save();
      } catch (err) {
        console.log(err);
        console.log(err.message);
        error = err;
      }

      expect(error).toBeInstanceOf(CanvasV2Error);
    });

    it('should throw an error if email is taken when updating an existing user', async () => {
      let error: Error | undefined;

      await user.save();

      const secondUser = new User(userObj);
      secondUser.id = v4();
      secondUser.email = chance.email();

      await secondUser.save();

      secondUser.email = user.email;

      try {
        await secondUser.save();
      } catch (err) {
        console.log(err);
        console.log(err.message);
        error = err;
      }

      expect(error).toBeInstanceOf(CanvasV2Error);
    });
  });
});
