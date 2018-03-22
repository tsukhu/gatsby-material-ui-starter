import React from 'react'
import GitCards from './gitCards/gitCards'

const moment = require('moment-timezone')
moment.tz.setDefault('UTC')

const GithubStats = props => {
  const all = props.githubData.edges[0].node.data.all.edges
  const java = props.githubData.edges[0].node.data.java.edges
  const javascript = props.githubData.edges[0].node.data.javascript.edges
  const css = props.githubData.edges[0].node.data.css.edges
  const html = props.githubData.edges[0].node.data.html.edges
  const typescript = props.githubData.edges[0].node.data.typescript.edges
  const buildTimeSuffix = ' as on ' + moment(props.buildTime).format('Do MMM YYYY HH:MM A z');
  return (
    <div>
      <GitCards list={all} title={'Top 10 (All Languages)' + buildTimeSuffix} showLang={true} />
      <GitCards list={java} title={'Top 10 (Java Projects)' + buildTimeSuffix} showLang={false} />
      <GitCards
        list={javascript}
        title={'Top 10 (JavaScript Projects)' + buildTimeSuffix}
        showLang={false}
      />
      <GitCards list={css} title={'Top 10 (CSS Projects)' + buildTimeSuffix} showLang={false} />
      <GitCards list={html} title={'Top 10 (HTML Projects)' + buildTimeSuffix} showLang={false} />
      <GitCards
        list={typescript}
        title={'Top 10 (TypeScript Projects)'}
        showLang={false}
      />
    </div>
  )
}

export default GithubStats
