import React, { Component } from 'react'
import Layout from '../components/layout'

export default class extends Component {
  constructor(props) {
    super()
    this.state = { ...props }
  }
  componentDidMount() {
    window.location = 'https://ers-hcl.github.io/online-ppts/#/'
  }
  render() {
    return (
      <Layout>
        <section>Redirecting...</section>
      </Layout>
    )
  }
}
