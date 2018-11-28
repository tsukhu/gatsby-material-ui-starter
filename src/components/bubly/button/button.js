import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import bublyButtonStyle from '../../../style/bubly/components/bublyButton'

const MyButton = (props) => {
    const { classes, children, className, ...other } = props;
    return (
        <Button className={classNames(classes.root, classes.label, className)} {...other}>
            {children || 'class names'}
        </Button>
    );
}

MyButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(bublyButtonStyle, { withTheme: true })(MyButton);