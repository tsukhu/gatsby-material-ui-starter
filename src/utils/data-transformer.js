const transformToStateReport = (data,groupBy) => {
  const transformedData = _.chain(data)
    .groupBy(groupBy)
    .map((objs, key) => ({
      x: isNaN(key) ? key : +key,
      y: _.reduce(objs, (count, v) => count + 1, 0)
    }))
    .value()

  return transformedData
}

const transformStackReport = (data,groupBy,stackBy) => {
  let transformedData = _.chain(data)
    .groupBy(groupBy)
   /*  .map((objs, key) => ({
      x: isNaN(key) ? key : +key,
      y: _.reduce(objs, (count, v) => count + 1, 0)
    })) */
    .value()
/*     .map((objs, key) => ({
      x:  _.map(objs, (obj) => obj.priority),
      y: _.reduce(objs, (count, v) => count + 1, 0)
    })) */

    if (transformedData.undefined) {
      transformedData = transformedData.undefined
      .map((objs, key) => ({
        x:  isNaN(key) ? key : +key,
        y: _.reduce(objs, (count, v) => count + 1, 0)
      }))
    } 

  return transformedData
}

export default {transformToStateReport ,transformStackReport}