import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BsClockHistory, BsClock, BsPeople } from 'react-icons/bs'
import Layout from '../components/Layout'
import slugify from 'slugify'
import Seo from '../components/Seo'

const RecipeTemplate = ({ data }) => {
  const {
    title,
    cookTime,
    content,
    description: { description },
    image,
    prepTime,
    serving
  } = data.contentfulRecipe
  const pathToImage = getImage(image)
  const {
    tags,
    tools,
    instructions,
    ingredients
  } = content
  return (
    <Layout>
      <Seo title={title} description={description} />
      <main className="page">
        <div className="recipe-page">
          {/* hero */}
          <section className="recipe-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="recipe-info">
              <h2>{title}</h2>
              <p>{description}</p>
              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>prep time</h5>
                  <p>{prepTime} min.</p>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>cook time</h5>
                  <p>{cookTime} min.</p>
                </article>
                <article>
                  <BsPeople />
                  <h5>serving</h5>
                  <p>{serving}</p>
                </article>
              </div>
              {/* tags */}
              <p className="recipe-tags">
                Tags: {tags.map((tag, index) => {
                  const tagSlug = slugify(tag, { ower: true })

                  return <Link to={`/tags/${tagSlug}`} key={index}>{tag}</Link>
                })}
              </p>
            </article>
          </section>
          {/* rest of the content */}
          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {
                instructions.map((item, index) => {
                  return (
                    <div className="single-instruction" key={index}>
                      <header>
                        <p>step {index + 1}</p>
                        <div></div>
                      </header>
                      <p>{item}</p>
                    </div>
                  )
                })
              }
            </article>
            <article className="seconf-column">
              <div>
                <h4>ingredients</h4>
                {
                  ingredients.map((item, index) => {
                    return (
                      <p className="single-ingredients" key={index}>
                        {item}
                      </p>
                    )

                  })
                }
              </div>
              <div>
                <h4>tools</h4>
                {
                  tools.map((item, index) => {
                    return (
                      <p className="single-tool" key={index}>
                        {item}
                      </p>
                    )

                  })
                }
              </div>
            </article>
          </section>
        </div>
      </main>
    </Layout>
  )
}
export const query = graphql`
query MyQuery($id: String) {
  contentfulRecipe(id: {eq: $id}) {
    title
    cookTime
    content {
      tags
      tools
      instructions
      ingredients
    }
    description {
      description
    }
    image {
      gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
    }
    prepTime
    serving
  }
}
`

export default RecipeTemplate
