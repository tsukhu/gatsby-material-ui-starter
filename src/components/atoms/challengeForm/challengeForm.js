import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import PageHeader from '../../pageHeader/pageHeader'
import blueGrey from 'material-ui/colors/blueGrey'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  paper: {
    margin: 5,
    padding: 10,
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  }
})

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

class ChallengeForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    searchText: '',
    formElementsArray: []
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('A name was submitted: ' + this.state.searchText)
  }

  handleChange = (event, inputIdentifier) => {
    // const updatedFormElement = updateObject(
    //   this.state.formElementsArray[inputIdentifier],
    //   {
    //     value: event.target.value
    //   }
    // )

    // const updatedOrderForm = updateObject(this.state.formElementsArray, {
    //   [inputIdentifier]: updatedFormElement
    // })

    // this.setState({
    //   formElementsArray: updatedOrderForm
    // })
  }
  

  render() {
    const { classes, selectedRow, columnData } = this.props
    const formElementsArray = []
    for (let key in selectedRow) {
      if (key !== 'id') {
        let colData = []

        colData = columnData.filter(data => {
          return data.id === key
        })
        console.log(colData[0])
        if (colData === undefined) {
          colData[0] = {
            type: 'text',
            helperText: 'Enter Value'
          }
        }
        formElementsArray.push({
          id: key,
          value: selectedRow[key],
          type: colData[0].type,
          helperText: colData[0].helperText
        })
      }
    }

    const formFields = formElementsArray.map(field => (
      <TextField
        id={field.id}
        label={field.id}
        value={field.value}
        type={field.type}
        className={classes.textField}
        helperText={field.helperText}
        margin="normal"
        key={field.id}
      />
    ))
    return (
      <Paper className={classes.paper} elevation={4}>
        <PageHeader text="Edit" />
        <form
          className={classes.container}
          noValidate
          autoComplete="on"
          onSubmit={this.handleSubmit}
        >
          {formFields}
        </form>
      </Paper>
    )
  }
}

ChallengeForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChallengeForm)
