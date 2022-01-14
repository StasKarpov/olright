import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { STRAPI_BASE_URL } from "../config";

const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       articles: {
  //         read(existing, { args: { offset, limit } }) {
  //           // A read function should always return undefined if existing is
  //           // undefined. Returning undefined signals that the field is
  //           // missing from the cache, which instructs Apollo Client to
  //           // fetch its value from your GraphQL server.
  //           return existing && existing.slice(offset, offset + limit);
  //         },
  //         keyArgs: false,
  //         merge(existing = [], incoming) {
  //           console.log(existing);
  //           console.log(incoming);
  //           return [...existing, ...incoming.data];
  //         },
  //       },
  //     },
  //   },
  // },
});
const link = new HttpLink({
  uri: `${STRAPI_BASE_URL}/graphql`,
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
