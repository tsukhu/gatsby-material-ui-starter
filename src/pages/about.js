import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import AboutCard from '../components/aboutCard/aboutCard'

export default ({ data }) => {
  const orgData = {
    description: 'org.description',
    websiteUrl: 'org.websiteUrl',
    avatarUrl: 'org.avatarUrl',
    name: 'org.name',
    maintainedBy: data.site.siteMetadata.maintainedBy,
    poweredBy: data.site.siteMetadata.poweredBy,
    contributors: data.site.siteMetadata.contributors,
    githubProject: data.site.siteMetadata.githubProject
  }
  return (
    <Layout>
      <AboutCard data={orgData} />
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        maintainedBy
        poweredBy
        githubProject
        contributors
      }
    }
  }
`
