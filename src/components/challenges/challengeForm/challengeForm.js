import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import PageHeader from '../../pageHeader/pageHeader'
import Select from '@material-ui/core/Select'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import { challengeFormStyles } from '../../../style/components/challenges/challenges'


class ChallengeForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    challengeForm: []
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange = (event, inputIdentifier) => {
    const updatedFormElement = this.state.challengeForm.map(field => {
      if (field.id === inputIdentifier) field.value = event.target.value
      return field
    })

    this.setState({
      challengeForm: updatedFormElement
    })
  }

  componentWillMount() {
    const { selectedRow } = this.props
    this.setState({
      challengeForm: selectedRow
    })
  }

  render() {
    const {
      classes,
      selectedRow,
      handleFormSubmit,
      handleFormCancel
    } = this.props
    const formFields = selectedRow.map(
      field =>
        field.type === 'select' ? (
          field.visible &&
          <FormControl
            className={classes.formControl}
            key={field.id}
            disabled={field.disabled ? field.disabled : false}
          >
            <InputLabel htmlFor={field.id}>{field.id.toUpperCase()}</InputLabel>
            <Select
              native
              value={field.value}
              onChange={event => this.handleChange(event, field.id)}
              inputProps={{
                id: field.id
              }}
            >
              {field.options.map(option => (
                <option value={option.value} key={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormControl>
        ) : (
          field.visible &&
          <TextField
            id={field.id}
            label={field.id.toUpperCase()}
            defaultValue={field.value}
            disabled={field.disabled ? field.disabled : false}
            type={field.type}
            autoComplete="name"
            multiline={field.multiline ? field.multiline : false}
            className={classes.textField}
            helperText={field.helperText}
            margin="normal"
            key={field.id}
            onChange={event => this.handleChange(event, field.id)}
          />
        )
    )
    return (
      <Fade in={true} timeout={100}>
        <Paper className={classes.paper} elevation={4}>
          <PageHeader text="Edit" />
          <form
            className={classes.container}
            noValidate
            autoComplete="on"
            onSubmit={this.handleSubmit}
          >
            {formFields}
            <div
              onClick={event =>
                handleFormSubmit(event, this.state.challengeForm)
              }
            >
              <Button color="primary" className={classes.button}>
                UPDATE
              </Button>
            </div>
            <div onClick={event => handleFormCancel(event)}>
              <Button color="primary" className={classes.button}>
                CANCEL
              </Button>
            </div>
          </form>
        </Paper>
      </Fade>
    )
  }
}

ChallengeForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(challengeFormStyles)(ChallengeForm)
