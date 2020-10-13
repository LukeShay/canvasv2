import { StateModel } from '@lib/server/domain';

describe('state model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(StateModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(StateModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(StateModel.relationMappings).toMatchSnapshot();
  });
});
