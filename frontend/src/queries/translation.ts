import gql from "graphql-tag";

export const TRANSLATION = gql`
  query Translation {
    translations {
      data {
        id
        attributes {
          Key
          EN
          RU
          UA
        }
      }
    }
  }
`;
