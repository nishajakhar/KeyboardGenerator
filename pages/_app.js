import '../styles/globals.css'
import MetaMaskAccountProvider from '../context/MetaMaskProvider'

function MyApp({ Component, pageProps }) {
  return (
  <MetaMaskAccountProvider>
    <Component {...pageProps} />
  </MetaMaskAccountProvider>
  )
}

export default MyApp
