import * as _ from 'lodash'

const transformToStateReport = (data, groupBy) => {
  const transformedData = _
    .chain(data)
    .groupBy(groupBy)
    .map((objs, key) => ({
      x: isNaN(key) ? key : +key,
      y: _.reduce(objs, (count, v) => count + 1, 0)
    }))
    .value()

  return transformedData
}

const transformPriortyWiseDomainStackReport = data => {
  const report = _(data)
    .sortBy(['priority'])
    .groupBy(f => f.priority)
    .map(item =>
      _(item)
        .groupBy(f => f.domain)
        .map((objs, key) => ({
          x: isNaN(key) ? key : +key,
          y: _.reduce(objs, (count, v) => count + 1, 0)
        }))
        .value()
    )
    .value()
  const domainList = [
    'Web UI',
    'Microservices',
    'Analytics',
    'DevOps',
    'Security',
    'Cloud',
    'Mobility',
    'Other'
  ]

  domainList.forEach(domain => {
    report.forEach(items => {
      if (items.filter(data => data.x === domain).length === 0) {
        items.push({
          x: domain,
          y: 0
        })
      }
    })
  })

  return report
}

const transformStatusWisePriorityStackReport = data => {
  const report = _(data)
    .sortBy(['status'])
    .groupBy(f => f.status)
    .map(item =>
      _(item)
        .groupBy(f => f.priority)
        .map((objs, key) => ({
          x: isNaN(key) ? key : +key,
          y: _.reduce(objs, (count, v) => count + 1, 0)
        }))
        .value()
    )
    .value()

  const statusList = ['High', 'Low', 'Medium', 'None']

  statusList.forEach(status => {
    report.forEach(items => {
      if (items.filter(data => data.x === status).length === 0) {
        items.push({
          x: status,
          y: 0
        })
      }
    })
  })
  return report
}

export default {
  transformToStateReport,
  transformStatusWisePriorityStackReport,
  transformPriortyWiseDomainStackReport
}
