import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import gridItemStyle from '../../style/components/GridItem/GridItemStyle'

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}

export default withStyles(gridItemStyle)(GridItem)
