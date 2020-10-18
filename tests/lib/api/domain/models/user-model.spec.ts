import { UserModel } from '../../../../../lib/server/domain';

describe('user model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(UserModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(UserModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(UserModel.relationMappings).toMatchSnapshot();
  });
});
