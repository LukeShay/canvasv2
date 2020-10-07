import { AssistantModel } from '../assistant-model';

describe('AssistantModel', () => {
  it("should have idColum 'id'", () => {
    expect(AssistantModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(AssistantModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(AssistantModel.relationMappings).toMatchSnapshot();
  });
});
