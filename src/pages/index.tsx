import Head from 'next/head'
import { DefaultLayout } from 'src/layouts'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Home</title>
      </Head>

      <main>Hello from home</main>
    </DefaultLayout>
  )
}
