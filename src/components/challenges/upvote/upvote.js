import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  button: {
    margin: 0
  },
  votes: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'small',
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
    // update original states
    this.state = {
      id: undefined,
      upvoted: false,
      downvoted: false
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      upvoted: this.props.hasUpVoted,
      downvoted: this.props.hasDownVoted
    })
  }

  upvote = () => {
/*     this.setState({
      ...this.state,
      upvoted: !this.state.upvoted,
      downvoted: (this.props.hasUpVoted)? true : false,
    }) */
    this.props.onUpVote(this.props.id)
  }

  downvote = () => {
    const newCount = this.state.count - 1
/*     this.setState({
      ...this.state,
      upvoted: (this.props.hasUpVoted)? true :false,
      downvoted: !this.state.downvoted,
    }) */
    this.props.onDownVote(this.props.id)
  }

  render() {
    let { classes } = this.props
    let { upvoted, downvoted } = this.state

    return (
      <span className={classes.votes}>
      <Typography variant="caption">
      Votes
      </Typography>
        <IconButton
          className={classes.button}
          aria-label="Up Vote"
          onClick={this.upvote}
          disabled={upvoted}
        >
          <ArrowDropUp />
        </IconButton>
        {this.props.votes}
        <IconButton
          className={classes.button}
          aria-label="Down Vote"
          onClick={this.downvote}
          disabled={downvoted}
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
