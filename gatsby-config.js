/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-source-google-spreadsheets`,
      options: {
        spreadsheetId: '1RLQO8L9qO-UrnMGuWNTl2A0a8yYgkVFNCveb7Kmvppk',
        // apiKey: 'AIzaSyCmGBALyn4XbjiqYZlLfTPHYUoHfGIkhRc',
        credentials: require(`./oleg-scherbinin-project-15aca17500ca.json`)
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-ZD9D1Q6PLT",
        head: true,
        pageTransitionDelay: 0,
        defer: false,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        enableWebVitalsTracking: true,
      },
    },
  ],
}
