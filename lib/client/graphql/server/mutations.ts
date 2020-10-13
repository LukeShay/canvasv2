import { gql } from '@apollo/client';

export const SignUpMutation = gql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $city: String
    $stateId: String
    $zip: String
  ) {
    signUp(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        city: $city
        stateId: $stateId
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

export const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

export const UpdateUserMutation = gql`
  mutation UpdateUserMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String
    $address1: String
    $address2: String
    $city: String
    $stateId: String
    $zip: String
  ) {
    updateUser(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        address1: $address1
        address2: $address2
        city: $city
        stateId: $stateId
        zip: $zip
      }
    ) {
      user {
        id
        email
        firstName
        lastName
        city
        zip
        role
        stateId
        address1
        address2
        state {
          id
          code
          abbreviation
          name
        }
      }
    }
  }
`;