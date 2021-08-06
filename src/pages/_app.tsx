import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { initializeApollo } from 'src/utils/apolloClient'

const App = (props: AppProps) => {
  const client = initializeApollo()
  return (
    <>
      <Head>
        <title>nexst</title>
      </Head>
      <ApolloProvider client={client}>
        <props.Component {...props.pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
