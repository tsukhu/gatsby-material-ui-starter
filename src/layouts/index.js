import 'babel-polyfill'
// import 'typeface-roboto'
import React, { Component } from 'react'
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
    return this.state.loaded ? (
      <div>
        <section>
          <Navigation title={this.props.data.site.siteMetadata.title} />
          {this.props.children()}
        </section>
      </div>
    ) : (
      <div><Spinner /></div>
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
