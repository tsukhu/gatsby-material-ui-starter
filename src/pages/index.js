import 'core-js/es6/promise'
import 'core-js/es6/symbol'
import 'core-js/es6/object'
import 'core-js/es6/function'
import 'core-js/es6/parse-int'
import 'core-js/es6/parse-float'
import 'core-js/es6/number'
import 'core-js/es6/math'
import 'core-js/es6/string'
import 'core-js/es6/date'
import 'core-js/es6/array'
import 'core-js/es6/regexp'
import 'core-js/es6/map'
import 'core-js/es6/weak-map'
import 'core-js/es6/set'
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Typography from '@material-ui/core/Typography'
export default ({ data }) => {
  return (
    <Layout>
      <Typography component="h5" variant="h5" >
        About {data.site.siteMetadata.title}</Typography>
      <Typography component="p">
        We're the only site running on your computer dedicated to showing the best
        photos and videos of pandas eating lots of food.
    </Typography>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
