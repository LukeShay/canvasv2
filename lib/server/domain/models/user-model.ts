/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, JSONSchema, RelationMappings } from 'objection';
import { IUser, UserRole } from '../../../types';
import Constants from '../constants';

export class UserModel extends Model implements IUser {
  address1?: string | undefined;

  address2?: string | undefined;

  city?: string | undefined;

  createdAt!: string;

  email!: string;

  firstName!: string;

  id!: string;

  lastName!: string;

  password!: string;

  role!: UserRole;

  stateId?: string | undefined;

  updatedAt!: string;

  zip?: string | undefined;

  picture?: string | undefined;

  static tableName = Constants.USERS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        addresss1: { type: ['string', 'null'] },
        addresss2: { type: ['string', 'null'] },
        city: { type: ['string', 'null'] },
        createdAt: { type: 'timestamp' },
        email: { type: 'string' },
        firstName: { maxLength: 255, minLength: 1, type: 'string' },
        id: { type: 'uuid' },
        lastName: { maxLength: 255, minLength: 1, type: 'string' },
        picture: { type: ['string', 'null'] },
        state: { type: ['string', 'null'] },
        stateId: { type: ['string', 'null'] },
        updatedAt: { type: 'timestamp' },
        zip: { type: ['string', 'null'] },
      },
      required: ['email', 'firstName', 'lastName', 'password'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    const { ClassModel } = require('./class-model');
    const { AssistantModel } = require('./assistant-model');
    const { OrganizationModel } = require('./organization-model');
    const { StateModel } = require('./state-model');
    const { OrganizationMemberModel } = require('./organization-member-model');
    const { StudentModel } = require('./student-model');

    return {
      assistantClasses: {
        join: {
          from: `${UserModel.tableName}.${UserModel.idColumn}`,
          through: {
            from: `${AssistantModel.tableName}.assistantId`,
            to: `${AssistantModel.tableName}.classId`,
          },
          to: `${ClassModel.tableName}.${ClassModel.idColumn}`,
        },
        modelClass: ClassModel,
        relation: Model.ManyToManyRelation,
      },
      organizations: {
        join: {
          from: `${UserModel.tableName}.${UserModel.idColumn}`,
          through: {
            from: `${OrganizationMemberModel.tableName}.userId`,
            to: `${OrganizationMemberModel.tableName}.organizationId`,
          },
          to: `${OrganizationModel.tableName}.${OrganizationModel.idColumn}`,
        },
        modelClass: OrganizationModel,
        relation: Model.ManyToManyRelation,
      },
      state: {
        join: {
          from: `${UserModel.tableName}.stateId`,
          to: `${StateModel.tableName}.${StateModel.idColumn}`,
        },
        modelClass: StateModel,
        relation: Model.BelongsToOneRelation,
      },
      studentClasses: {
        join: {
          from: `${UserModel.tableName}.${UserModel.idColumn}`,
          through: {
            from: `${StudentModel.tableName}.studentId`,
            to: `${StudentModel.tableName}.classId`,
          },
          to: `${ClassModel.tableName}.${ClassModel.idColumn}`,
        },
        modelClass: ClassModel,
        relation: Model.ManyToManyRelation,
      },
      adminClasses: {
        join: {
          from: `${UserModel.tableName}.${UserModel.idColumn}`,
          to: `${ClassModel.tableName}.adminId`,
        },
        modelClass: ClassModel,
        relation: Model.HasManyRelation,
      },
    };
  }

  mapToIUser() {
    return {
      email: this.email,
      firstName: this.firstName,
      id: this.id,
      lastName: this.lastName,
      password: this.password,
      role: this.role,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      createdAt: this.createdAt,
      picture: this.picture,
      stateId: this.stateId,
      updatedAt: this.updatedAt,
      zip: this.zip,
    } as IUser;
  }
}
