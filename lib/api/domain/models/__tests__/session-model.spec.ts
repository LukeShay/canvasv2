import { SessionModel } from '../session-model';

describe('SessionModel', () => {
  it("should have idColum 'id'", () => {
    expect(SessionModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(SessionModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(SessionModel.relationMappings).toMatchSnapshot();
  });
});
