import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { initializeApollo } from 'src/utils/apolloClient'

const App = (props: AppProps) => {
  const client = initializeApollo()
  return (
    <>
      <Head>
        <title>nexst</title>
      </Head>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <props.Component {...props.pageProps} />
        </ApolloProvider>
      </RecoilRoot>
    </>
  )
}

export default App
