// import 'cross-fetch/polyfill'

import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_HASURA_URL
          : process.env.NEXT_PUBLIC_LOCAL_HASURA_URL,
      // headers: {
      //   'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      // },
    }),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
