import { StudentModel } from '~/lib/api/domain';

describe('student model', () => {
  it("should have idColum 'id'", () => {
    expect.hasAssertions();
    expect(StudentModel.idColumn).toStrictEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect.hasAssertions();
    expect(StudentModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect.hasAssertions();
    expect(StudentModel.relationMappings).toMatchSnapshot();
  });
});
