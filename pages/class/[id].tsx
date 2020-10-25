import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Page from '../../components/Page';

const ClassQuery = gql`
  query ClassQuery($id: ID!) {
    clas(input: { id: $id }) {
      id
      code
      name
      building
      description
      room
      adminId
    }
  }
`;

function Class() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ClassQuery, {
    variables: { id: router.query.id },
  });

  return (
    <Page>
      <div>ID: {data?.clas?.id}</div>
    </Page>
  );
}

export default Class;
