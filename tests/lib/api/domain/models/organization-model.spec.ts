import { OrganizationModel } from '../../../../../lib/server/domain';

describe('organization model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(OrganizationModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(OrganizationModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(OrganizationModel.relationMappings).toMatchSnapshot();
  });
});
