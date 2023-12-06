import React from 'react'
import Layout from '../components/layout'
import { wrapper, store } from '../redux/store'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  return (
    <PayPalScriptProvider options={{
      'client-id': 'AX8H66L0qIXwzpdOd-hdIUwzw0uq-Yv4JnknIUm1-MEXByVJbpjPmSDu53BKHNveFOIKSvrLPB-TSpat'
    }}>
      <Provider store={ store }>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </PayPalScriptProvider>
  )
}

export default wrapper.withRedux(App)
