import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    container: {
        position: 'relative',
        maxWidth: '100%'
    },
    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
})

const ResponsiveImage = ({ classes, src, width, height }) => {
    console.log(width)
    return (
        <div style={{ width }} className={classes.container}>
            <div style={{ paddingBottom: (height / width * 100) + '%' }} />
            <img src={src} className={classes.image} />
        </div>

    )
}

ResponsiveImage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ResponsiveImage)