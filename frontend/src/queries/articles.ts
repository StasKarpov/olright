import gql from "graphql-tag";

export const ARTICLES_NORMAL = gql`
  query ArticlesNormal($offset: Int, $limit: Int) {
    articles(
      pagination: { start: $offset, limit: $limit }
      filters: {
        and: [
          { or: [{ Prior: { eq: false } }, { Prior: { eq: null } }] }
          { or: [{ Hidden: { eq: false } }, { Hidden: { eq: null } }] }
          { or: [{ Special: { eq: false } }, { Special: { eq: null } }] }
        ]
      }
    ) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          Title
          Subtitle
          Prior
          Image {
            data {
              attributes {
                url
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export const ARTICLES_PRIOR = gql`
  query ArticlesPrior($offset: Int, $limit: Int) {
    articles(
      pagination: { start: $offset, limit: $limit }
      filters: {
        and: [
          { Prior: { eq: true } }
          { or: [{ Hidden: { eq: false } }, { Hidden: { eq: null } }] }
          { or: [{ Special: { eq: false } }, { Special: { eq: null } }] }
        ]
      }
    ) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          Title
          Subtitle
          Prior
          Image {
            data {
              attributes {
                url
              }
            }
          }
          updatedAt
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
      sort: "updatedAt:desc"
    ) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          Title
          Subtitle
          Content
          Dark
          Prior
          Special
          ArticleCssConfig
          BackgroundImage {
            data {
              attributes {
                url
              }
            }
          }
          Image {
            data {
              attributes {
                url
              }
            }
          }
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          updatedAt
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
          Dark
          Prior
          Special
          ArticleCssConfig
          CropHeaderImage
          PutHeadlineOnTop
          BackgroundImage {
            data {
              attributes {
                url
              }
            }
          }
          Image {
            data {
              attributes {
                url
              }
            }
          }
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;
