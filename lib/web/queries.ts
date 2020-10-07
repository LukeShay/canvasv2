import { gql } from "@apollo/client";

export const ViewerQueryString = `
  query Viewer {
    viewer {
      id,
      email,
      firstName,
      lastName,
      city,
      zip,
      role,
      stateId,
      address1,
      address2
    }
  }
`

export const ViewerQuery = gql(ViewerQueryString)