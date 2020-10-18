import { gql } from '@apollo/client';

export default gql`
  type SignUpPayload {
    user: UserSchema!
  }

  type SignInPayload {
    user: UserSchema!
  }
`;
