import { OrganizationMemberModel } from '../../../../../lib/api/domain';

describe('organization member model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(OrganizationMemberModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(OrganizationMemberModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(OrganizationMemberModel.relationMappings).toMatchSnapshot();
  });
});
