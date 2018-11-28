import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import responsiveImageStyle from '../../style/components/responsiveImage/responsiveImageStyle'

const ResponsiveImage = ({ classes, src, width, height }) => {
  return (
    <div style={{ width }} className={classes.container}>
      <div style={{ paddingBottom: (height / width) * 100 + '%' }} />
      <img src={src} className={classes.image} />
    </div>
  )
}

ResponsiveImage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(responsiveImageStyle, { withTheme: true })(
  ResponsiveImage
)
