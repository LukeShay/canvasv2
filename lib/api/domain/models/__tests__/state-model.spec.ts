import { StateModel } from '../state-model';

describe('StateModel', () => {
  it("should have idColum 'id'", () => {
    expect(StateModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(StateModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(StateModel.relationMappings).toMatchSnapshot();
  });
});
