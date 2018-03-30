import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import grey from 'material-ui/colors/grey'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: grey[50]
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
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.searchText);
 
  }

  handleChange = name => event => {
    this.setState({
      searchText: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
        <TextField
          id="search"
          label="Search"
          type="search"
          className={classes.textField}
          helperText="Search by domain"
          onChange={this.handleChange('search')}
          margin="normal"
        />
      </form>
    )
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchBox)
