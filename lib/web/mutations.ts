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
    signUp(
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
      user {
        id
        email
      }
    }
  }
`;

export const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;
