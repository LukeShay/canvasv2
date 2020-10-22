import { gql } from 'apollo-server-micro';

export default gql`
  type SignUpPayload {
    user: UserSchema!
  }

  type SignInPayload {
    user: UserSchema!
  }
`;
