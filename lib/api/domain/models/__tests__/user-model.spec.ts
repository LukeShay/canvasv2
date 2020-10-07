import { UserModel } from '../user-model';

describe('UserModel', () => {
  it("should have idColum 'id'", () => {
    expect(UserModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(UserModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(UserModel.relationMappings).toMatchSnapshot();
  });
});
