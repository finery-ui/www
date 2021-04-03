import { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useSnapshot } from 'valtio'
import { Provider, lightTheme, darkTheme } from '@finery/core'

import { globalState } from 'src/state'

import '@finery/core/dist/styles.css'
import 'src/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useSnapshot(globalState)

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark-theme')
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
      document.body.classList.add('dark-theme')
    }
  }, [theme])

  return (
    <Provider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600;700&family=Poppins:wght@500&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
