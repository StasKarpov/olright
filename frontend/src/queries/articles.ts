import gql from "graphql-tag";

export const ARTICLES_NORMAL = gql`
  query ArticlesNormal($offset: Int, $limit: Int) {
    articles(
      pagination: { start: $offset, limit: $limit }
      filters: {
        and: [
          { or: [{ Prior: { eq: false } }, { Prior: { eq: null } }] }
          { or: [{ Hidden: { eq: false } }, { Hidden: { eq: null } }] }
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
          MinimizeHeader
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
        }
      }
    }
  }
`;

export const SPECIAL_ARTICLE = gql`
  query SpecialArticle {
    specialArticle {
      data {
        attributes {
          article {
            data {
              attributes {
                Title
                Subtitle
                Content
                Dark
                Prior
                MinimizeHeader
                ArticleCssConfig
                Date
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
              }
            }
          }
        }
      }
    }
  }
`;
