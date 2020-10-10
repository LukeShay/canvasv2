import { ClassModel } from '../../../../../lib/api/domain';

describe('class model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(ClassModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(ClassModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(ClassModel.relationMappings).toMatchSnapshot();
  });
});
