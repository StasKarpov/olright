import gql from "graphql-tag";

export const ARTICLES_NORMAL = gql`
  query ArticlesNormal($offset: Int, $limit: Int) {
    articles(
      pagination: { start: $offset, limit: $limit }
      filters: { or: [{ Special: { eq: false } }, { Special: { eq: null } }] }
    ) {
      data {
        id
        attributes {
          Title
          Subtitle
          Special
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
`;

export const ARTICLES_SPECIAL = gql`
  query ArticlesSpecial($offset: Int, $limit: Int) {
    articles(
      pagination: { start: $offset, limit: $limit }
      filters: { Special: { eq: true } }
    ) {
      data {
        id
        attributes {
          Title
          Subtitle
          Special
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
`;

export const ARTICLE = gql`
  query Article($articleId: ID) {
    article(id: $articleId) {
      data {
        id
        attributes {
          Title
          Subtitle
          Content
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
`;
