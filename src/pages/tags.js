import React from 'react'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import setupTags from '../utils/setupTags'
import slugify from 'slugify'
import Seo from '../components/Seo'

const Tags = ({ data: { allContentfulRecipe: { nodes: recipes } } }) => {
  const newTags = setupTags(recipes)
  return (
    <Layout>
      <Seo title="Tags" />
      <main className="page">
        <section className="tags-page">
          {newTags.map((tag, index) => {
            const [text, value] = tag
            const tagSlug = slugify(text, { lower: true })
            return (
              <Link
                to={`/tags/${tagSlug}`}
                key={index}
                className="tag"
              >
                <h5>{text}</h5>
                <p>{value} recipes</p>
              </Link>
            )
          })}
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulRecipe {
      nodes {
        content {
          tags
        }
      }
    }
  }
`

export default Tags

