import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='es'>
        <Head>
          {/* Google tag (gtag.js) */}
          <script dangerouslySetInnerHTML={{
            __html: `
            <!-- Google Tag Manager -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-HY7Q1YBZJ5"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-HY7Q1YBZJ5');
            </script>

            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PVBQ4PSB');</script>
            <!-- End Google Tag Manager -->
            `
          }} />
          {/* <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" /> */}
        </Head>
        <body style={{ margin: 0 }}>
          <script dangerouslySetInnerHTML={{
            __html: `
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVBQ4PSB"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
            `
          }} />
          <Main />
          <NextScript />

          {/* <script src="https://www.desmos.com/api/v1.7/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
