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
  const buildTimeSuffix =
    ' as on ' + moment(props.buildTime).format('Do MMM YYYY HH:MM A z')
  const cardList = [
    {
      id: 'all',
      list: all,
      title: 'Top 10 (All Languages)' + buildTimeSuffix,
      showLang: true
    },
    {
      id: 'javascript',
      list: javascript,
      title: 'Top 10 (JavaScript Projects)' + buildTimeSuffix,
      showLang: true
    },
    {
      id: 'css',
      list: css,
      title: 'Top 10 (CSS Projects)' + buildTimeSuffix,
      showLang: true
    },
    {
      id: 'html',
      list: html,
      title: 'Top 10 (HTML Projects)' + buildTimeSuffix,
      showLang: true
    },
    {
      id: 'typescript',
      list: typescript,
      title: 'Top 10 (TypeScript Projects)' + buildTimeSuffix,
      showLang: true
    }
  ]
  return (
    <div>
      {cardList.map(card => (
        <GitCards
          list={card.list}
          title={card.title}
          showLang={card.showLang}
          key={card.id}
        />
      ))}
    </div>
  )
}

export default GithubStats
