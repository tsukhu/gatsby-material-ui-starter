import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import socialIconStyle from '../../../style/common/socialIconStyle'


const FacebookSVG = (props) => {
    const { classes, width, height } = props;
    return (
        <svg version="1.1" role="presentation" width={width} height={height} viewBox="0 0 1536 1792" className={classes.root}><path d="M1248 128q119 0 203.5 84.5t84.5 203.5v960q0 119-84.5 203.5t-203.5 84.5h-188v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-532q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960z"></path>
        </svg>
    )
}

FacebookSVG.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(socialIconStyle, { withTheme: true })(FacebookSVG);