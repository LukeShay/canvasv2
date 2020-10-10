import { AssistantModel } from '../../../../../lib/api/domain';

describe('assistant model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(AssistantModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(AssistantModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(AssistantModel.relationMappings).toMatchSnapshot();
  });
});
