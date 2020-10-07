import { OrganizationMemberModel } from '../organization-member-model';

describe('OrganizationMemberModel', () => {
  it("should have idColum 'id'", () => {
    expect(OrganizationMemberModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(OrganizationMemberModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(OrganizationMemberModel.relationMappings).toMatchSnapshot();
  });
});
