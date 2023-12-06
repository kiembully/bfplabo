module.exports = {
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cleversally-be.vercel.app/:path*'
      }
    ]
  }
  // async redirects () {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/comingsoon',
  //       permanent: false
  //     },
  //     {
  //       source: '/login',
  //       destination: '/comingsoon',
  //       permanent: false
  //     },
  //     {
  //       source: '/signup',
  //       destination: '/comingsoon',
  //       permanent: false
  //     },
  //     {
  //       source: '/order',
  //       destination: '/comingsoon',
  //       permanent: false
  //     }
  //   ]
  // }
}
