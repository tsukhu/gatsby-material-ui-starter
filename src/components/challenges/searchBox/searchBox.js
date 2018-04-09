import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import SearchIcon from '@material-ui/icons/Search'
import Typography from 'material-ui/Typography'
import PageHeader from '../../pageHeader/pageHeader'
import blueGrey from 'material-ui/colors/blueGrey'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'

import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import getColumnData from '../metadata'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit
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
    minWidth: 250
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
    text: '',
    domain: '',
    priority: '',
    status: ''
  }

  componentWillMount() {
    const { searchText } = this.props
    this.setState({
      text: searchText
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  //  console.log('A name was submitted: ' + this.state.searchText)
  }

  handleChange = name => event => {
    this.setState({
      text: event.target.value
    })
  }

  handleDomainChange = name => event => {
    this.setState({
      domain: event.target.value === 'None'?'':event.target.value
    })
  }

  handlePriorityChange = name => event => {
    this.setState({
      priority: event.target.value === 'None'?'':event.target.value
    })
  }

  handleStatusChange = name => event => {
    this.setState({
      status: event.target.value === 'None'?'':event.target.value
    })
  }

  render() {
    const { classes, handleSearch, searchText,searchDomain,searchPriority, searchStatus } = this.props
    const domainSearch = (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">DOMAIN</InputLabel>
        <Select
          native
          defaultValue={searchDomain?searchDomain:'None'}
          onChange={this.handleDomainChange()}
          input={<Input id="age-native-helper" />}
        >
          {getColumnData(true)
            .filter(data => data.id === 'domain')[0]
            .options.map(option => (
              <option value={option.value} key={option.name}>
                {option.name}
              </option>
            ))}
        </Select>
      </FormControl>
    )

    const prioritySearch = (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="priority-native-helper">PRIORITY</InputLabel>
        <Select
          native
          defaultValue={searchPriority?searchPriority:'None'}
          onChange={this.handlePriorityChange()}
          input={<Input id="priority-native-helper" />}
        >
          {getColumnData(true)
            .filter(data => data.id === 'priority')[0]
            .options.map(option => (
              <option value={option.value} key={option.name}>
                {option.name}
              </option>
            ))}
        </Select>
      </FormControl>
    )

    const statusSearch = (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="status-native-helper">STATUS</InputLabel>
        <Select
          native
          defaultValue={searchStatus?searchStatus:'None'}
          onChange={this.handleStatusChange()}
          input={<Input id="status-native-helper" />}
        >
          {getColumnData(true)
            .filter(data => data.id === 'status')[0]
            .options.map(option => (
              <option value={option.value} key={option.name}>
                {option.name}
              </option>
            ))}
        </Select>
      </FormControl>
    )
    return (
      <Paper className={classes.paper} elevation={4}>
        <PageHeader text="Filter" />
        <div className={classes.container}>
          <form
            noValidate
            autoComplete="on"
            onSubmit={event => {
              event.preventDefault()
              handleSearch(this.state)
            }}
          >
            <TextField
              id="search"
              label="Filter Text"
              type="search"
              defaultValue={searchText}
              className={classes.textField}
              helperText="Search"
              onChange={this.handleChange('search')}
              margin="normal"
            />
            {domainSearch}
            {prioritySearch}
            {statusSearch}
            <Button
              variant="fab"
              color="primary"
              aria-label="search"
              className={classes.button}
              onClick={event => handleSearch(this.state)}
            >
              <SearchIcon />
            </Button>
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
