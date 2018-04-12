import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconButton from 'material-ui/IconButton'

const styles = theme => ({
  button: {
    margin: 0
  },
  votes: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    alignContent: 'middle',
    alignItems: 'middle'
  }
})

class UpVote extends React.Component {

  constructor(props) {
    super(props)
    this.handleUpVote = this.handleUpVote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
  }

  state = {
    count: 0,
    baseCount: 0,
    id: undefined
  }

  componentWillMount = () => {
     const { voteCount, id } = this.props
    // update original states
    this.setState({
      count: voteCount,
      baseCount: voteCount,
      id: id
    })
  }

  handleUpVote = () => {
    // Can only increment by one
    const increment = this.state.count + 1
    if (increment <= this.state.baseCount + 1) {
      this.setState(
        {
          count: increment
        },
        function() {
          this.props.onVote(this.state.id, 1)
        }
      )
    }
  }

  handleDownVote = () => {
    // Can only decrement by one
    const decrement = this.state.count - 1
    if (decrement >= this.state.baseCount - 1) {
      this.setState(
        {
          count: decrement
        },
        function() {
          this.props.onVote(this.state.id, -1)
        }
      )
    }
  }

  render() {
    const { classes } = this.props
    return (
      <span className={classes.votes}>
        <IconButton
          className={classes.button}
          aria-label="Up Vote"
          onClick={this.handleUpVote}
        >
          <ArrowDropUp />
        </IconButton>
        {this.state.count}
        <IconButton
          className={classes.button}
          aria-label="Down Vote"
          onClick={this.handleDownVote}
        >
          <ArrowDropDown />
        </IconButton>
      </span>
    )
  }
}

UpVote.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UpVote)
