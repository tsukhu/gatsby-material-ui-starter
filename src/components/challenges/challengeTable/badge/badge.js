import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { badgeStyle } from '../../../../style/components/badge/badgeStyle'

const domainColor = {
  webui: 'primary',
  microservices: 'warning',
  analytics: 'danger',
  devops: 'success',
  cloud: 'info',
  mobility: 'rose',
  other: 'gray'
}

const Badge = props => {
  const { classes, text } = props
  const formatText = text.replace(/\s+/g, '').toLowerCase()
  const badgeColor = domainColor[formatText]?domainColor[formatText]:'success';
  return <span className={classes.badge + ' ' + classes[badgeColor]}>{text}</span>
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(badgeStyle)(Badge)
