import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { pageHeaderStyles } from '../../style/components/pageHeader/pageHeader'

const PageHeader = props => {
  const { classes } = props
  return (
    <div className={classes.pageheader}>
      <Typography variant="caption" className={classes.subheader}>
        {props.text.toUpperCase()}
      </Typography>
    </div>
  )
}

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(pageHeaderStyles, { withTheme: true })(PageHeader)
