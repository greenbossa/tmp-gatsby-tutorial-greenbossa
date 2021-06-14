import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const getData = graphql`
query FirstQuery {
  site {
    info: siteMetadata {
      author
      description
      simpleData
      title
      complexData {
        age
      }
      person {
        age
        name
      }
    }
  }
}
`


const FetchData = () => {
  const { site: { info: { title } } } = useStaticQuery(getData)
  const data = useStaticQuery(getData)
  console.log(data);
  return (
    <div>
      {/* <h2>Name: {data.site.info.person.name}</h2> */}
      <h2>site title is : {title}</h2>
    </div>
  )
}

export default FetchData
