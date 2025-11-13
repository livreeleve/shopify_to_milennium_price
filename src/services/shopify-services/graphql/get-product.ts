import { gql } from 'graphql-request'

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
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
