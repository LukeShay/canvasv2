import React from 'react';
import Page from '../components/Page';

function Error() {
  return (
    <Page>
      <div className="w-full flex justify-center">
        <h1>Uh oh, You went somewhere that doesn&apos;t exist!</h1>
      </div>
    </Page>
  );
}

export default Error;
