import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useAuth } from 'src/hooks/useAuth'

const Home: NextPage = () => {
  const { signIn } = useAuth()
  const handleClick = () => {
    window.alert('Hello, World!')
  }

  return (
    <Layout>
      <button className='p-2' onClick={handleClick}>
        Click me!
      </button>

      <button onClick={signIn}>ログイン</button>
    </Layout>
  )
}

export default Home
