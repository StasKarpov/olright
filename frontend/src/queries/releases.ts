import gql from "graphql-tag";

export const MAIN_RELEASE = gql`
  query MainReleaase {
    mainRelease {
      data {
        id
        attributes {
          release {
            data {
              id
              attributes {
                Title
                Subtitle
                Link
                Date
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

export const RELEASES = gql`
  query Releases($offset: Int, $limit: Int) {
    releases(pagination: { start: $offset, limit: $limit }) {
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
          Link
          Date
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

export const MAIN_PLAYLIST = gql`
  query MainPlaylist {
    mainPlaylist {
      data {
        id
        attributes {
          playlist {
            data {
              id
              attributes {
                Title
                Subtitle
                Link
                LinkITunes
                LinkSpotify
                Date
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

export const PLAYLISTS = gql`
  query Playlists($offset: Int, $limit: Int) {
    playlists(pagination: { start: $offset, limit: $limit }) {
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
          Link
          LinkITunes
          LinkSpotify
          Date
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

export const RELEASES_GALLERY = gql`
  query ReleasesGallery {
    releasesGallery {
      data {
        attributes {
          releases {
            data {
              attributes {
                Title
                Subtitle
                Link
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
