import gql from "graphql-tag";

export const GALLERY = gql`
  query Gallery {
    gallery {
      data {
        attributes {
          articles {
            data {
              id
              attributes {
                Title
                Subtitle
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
