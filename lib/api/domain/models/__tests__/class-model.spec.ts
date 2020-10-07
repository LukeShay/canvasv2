import { ClassModel } from '../class-model';

describe('ClassModel', () => {
  it("should have idColum 'id'", () => {
    expect(ClassModel.idColumn).toEqual('id');
  });

  it('should should have jsonSchema that matches snapshot', () => {
    expect(ClassModel.jsonSchema).toMatchSnapshot();
  });

  it('should should have relationMappings that matches snapshot', () => {
    expect(ClassModel.relationMappings).toMatchSnapshot();
  });
});
