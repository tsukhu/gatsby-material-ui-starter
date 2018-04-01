import 'typeface-roboto'
import 'babel-polyfill'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Navigation from '../components/navigation/navigation'
import withMui from '../components/withMUI/withMUI'
import Spinner from '../components/Spinner/Snipper'
// import styles from './index.module.css';
class Index extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      loaded: true
    })
  }

  render() {
    const { location, children } = this.props
    return this.state.loaded ? (
      <div>
        <Helmet
          defaultTitle={`ERS-HCL Github Site`}
          titleTemplate={`%s | ERS-HCL`}
        >
          <meta name="twitter:site" content="@TarunKumarSukhu" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="ERS-HCL" />
          <meta
            name="Description"
            content="ERS-HCL Open Source initiative static website"
          />
          <meta property="og:url" content="https://ers-hcl.github.io/" />
          <meta
            property="og:description"
            content="ERS-HCL Open Source initiative static website"
          />
          <html lang="en" />
        </Helmet>
        <section>
          <Navigation title={this.props.data.site.siteMetadata.title} />
          {this.props.children()}
        </section>
      </div>
    ) : (
      <div>
        <Spinner />
      </div>
    )
  }
}

export default withMui(Index)
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
