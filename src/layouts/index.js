import 'typeface-roboto'
import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withStyles } from '@material-ui/core/styles'
import Navigation from '../components/navigation/navigation'
import withMui from '../components/withMUI/withMUI'
import CircularProgress from '@material-ui/core/CircularProgress'
import Spinner from '../components/Spinner/Snipper'
// import styles from './index.module.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

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
    const { classes, children } = this.props
    return this.state.loaded ? (
      <div>
        <Helmet
          defaultTitle={`ERS-HCL Github Site`}
          titleTemplate={`%s | ERS-HCL`}
        >
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />

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
        <header>
          <Navigation title={this.props.data.site.siteMetadata.title} />
        </header>
        {children()}
      </div>
    ) : (
      <div>
      <CircularProgress size={65} className={classes.progress} thickness={7} />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMui(withStyles(styles)(Index))
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
