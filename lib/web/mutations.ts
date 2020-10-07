import { gql } from '@apollo/client';

export const SignUpMutation = gql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $city: String
    $state: String
    $zip: String
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        city: $city
        state: $state
        zip: $zip
      }
    ) {
      id
      email
    }
  }
`;
