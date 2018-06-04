import NativeSelect from '@material-ui/core/NativeSelect'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { challengeTableStyles } from '../../../../style/components/challenges/challenges';

let SelectComponent = props => {
  const { option,onChange,classes,disabled,options } = props
  const optionList =  options.map(option => {
    return <option value={option.value} key={option.value}>{option.name}</option>
  })
  return (
    <NativeSelect
      value={option}
      onChange={onChange}
      className={classes.selectEmpty}
      disabled={!disabled}
    >
    {optionList}
    </NativeSelect>
  )
}

SelectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default withStyles(challengeTableStyles)(SelectComponent)
