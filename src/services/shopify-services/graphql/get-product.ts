import { gql } from 'graphql-request'

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          legacyResourceId
          title
          tags
          status
        }
      }
    }
  }
`
