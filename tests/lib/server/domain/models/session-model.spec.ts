import { SessionModel } from '../../../../../lib/server/domain';

describe('session model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(SessionModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(SessionModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(SessionModel.relationMappings).toMatchSnapshot();
  });
});
