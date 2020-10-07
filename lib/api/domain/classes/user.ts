import { CanvasV2Error, IUser, UserRole } from '../../../types';

import { UserModel } from '../models/user-model';

export class User implements IUser {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  role: UserRole;

  address1?: string;

  address2?: string;

  city?: string;

  stateId?: string;

  zip?: string;

  createdAt?: string;

  updatedAt?: string;

  constructor(user: IUser) {
    this.update(user);
  }

  update({
    address1,
    address2,
    city,
    createdAt,
    email,
    firstName,
    id,
    lastName,
    password,
    role,
    stateId,
    updatedAt,
    zip,
  }: IUser) {
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.createdAt = createdAt;
    this.email = email;
    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName;
    this.password = password;
    this.role = role;
    this.stateId = stateId;
    this.updatedAt = updatedAt;
    this.zip = zip;
  }

  private async checkEmail() {
    const user = await UserModel.query().findOne('email', this.email);

    if (user) {
      throw new CanvasV2Error({
        errors: { email: 'Email is in use.' },
        message: 'Email is in use.',
        status: 400,
      });
    }
  }

  async save() {
    const userModel = await UserModel.query().findOne('id', this.id);

    let user: IUser;

    if (this.id !== '' && userModel) {
      if (userModel.email !== this.email) {
        await this.checkEmail();
      }

      user = await userModel.$query().updateAndFetch(this);
    } else {
      await this.checkEmail();

      user = await UserModel.query().insertAndFetch(this);
    }

    this.update(user);
  }
}
