import { OrganizationModel } from '../organization-model';

describe('OrganizationModel', () => {
  it("should have idColum 'id'", () => {
    expect(OrganizationModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(OrganizationModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(OrganizationModel.relationMappings).toMatchSnapshot();
  });
});
