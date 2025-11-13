import { env } from '@/env'
import { GraphQLClient } from 'graphql-request'

export const shopifyApi = new GraphQLClient(
  `${env.SHOPIFY_BASE_URL}/admin/api/${env.SHOPIFY_VERSION_API}/graphql.json`,
  {
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
    },
  },
)
