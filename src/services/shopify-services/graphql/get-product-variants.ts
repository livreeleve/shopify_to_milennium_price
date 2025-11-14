import { gql } from 'graphql-request'

export const GET_PRODUCTS_VARIANTS = gql`
  query getProductVariants($first: Int!, $query: String) {
    productVariants(first: $first, query: $query) {
      edges {
        node {
          title
          legacyResourceId
          displayName
          price
          compareAtPrice
          barcode
          sku
          createdAt
          updatedAt
        }
      }
    }
  }
`
