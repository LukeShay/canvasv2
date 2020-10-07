import { StudentModel } from '../student-model';

describe('StudentModel', () => {
  it("should have idColum 'id'", () => {
    expect(StudentModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(StudentModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(StudentModel.relationMappings).toMatchSnapshot();
  });
});
