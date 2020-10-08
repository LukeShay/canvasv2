import { create } from 'react-test-renderer';
import React from 'react';
import Error from '../../pages/error';

describe('error', () => {
  it('should match snapshot', () => {
    expect.hasAssertions();
    const page = create(<Error />);
    expect(page.toJSON()).toMatchSnapshot();
  });
});
