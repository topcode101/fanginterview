const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    console.log('created a node:', JSON.stringify(node.fileAbsolutePath))
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title,
              description
            }
          }
        }
      }
    }
  `)
  // console.log(JSON.stringify(result, null, 4))

  const allnodes = result.data.allMarkdownRemark.edges.map(x=>x.node)
  console.log('allnodes:', JSON.stringify(allnodes, null, 4))
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        allnodes: allnodes
      },
    })
  })

  createPage({
    path: '/all-articles',
    component: path.resolve(`./src/templates/blog-list-page.js`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      allnodes: allnodes
    },
  })
}