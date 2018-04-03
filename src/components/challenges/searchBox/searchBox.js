import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import PageHeader from '../../pageHeader/pageHeader'
import blueGrey from 'material-ui/colors/blueGrey'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'

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

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    searchText: ''
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('A name was submitted: ' + this.state.searchText)
  }

  handleChange = name => event => {
    this.setState({
      searchText: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.paper} elevation={4}>
        <PageHeader text="Filter" />
        <div className={classes.container}>
          <form noValidate autoComplete="on" onSubmit={this.handleSubmit}>
            <TextField
              id="search"
              label="Filter Text"
              type="search"
              className={classes.textField}
              helperText="Search by domain"
              onChange={this.handleChange('search')}
              margin="normal"
            />
          </form>
        </div>
      </Paper>
    )
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchBox)
