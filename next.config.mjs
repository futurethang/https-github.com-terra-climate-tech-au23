/** @type {import('next').NextConfig} */
const config = {
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: true, // Set to false if you don't want the redirect to be cached by browsers
      },
    ]
  },
}

export default config
