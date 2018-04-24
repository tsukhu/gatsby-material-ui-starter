import React, { Component } from "react";

export default class extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.location = 'https://ers-hcl.github.io/online-ppts/#/';
  }
  render(){
    return (<section>Redirecting...</section>);
  }
}
