import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  body: {
    lineHeight: 1.1,
    fontSize: '100%',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    fontWeight: 200
  },
  footer: {
    textAlign: 'center',
    color: '#bda877',
    fontSize: 12,
    padding: '75px 20px',
    clear: 'both',
    background: '#19263a',
    width: '100%',
    transition: 'opacity 0.5s 1s ease-in'
  },
  container: {
    padding: 0,
    maxWidth: 1000,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  ul,
  menu,
  dir: {
    display: 'block',
    listStyleType: 'disc',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: 40
  },
  li: {
    textAlign: 'left',
    listStyle: 'none'
  },
  gold: {
    color: '#bda877'
  },
  bottomRow: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  footerIcons: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around'
  },
  a: {
    fontFamily: 'Montserrat',
    color: '#bda877',
    fontSize: 13,
    marginBottom: 10,
    cursor: 'pointer',
    transition: 'all 0.4s',
    outline: 'none',
    textDecoration: 'none',
    lineHeight: 2,
    fontWeight: 200
  },
  bottomRow,
  Section,
  facebookLink: {
    display: 'flex',
    alignItems: 'center'
  },
  bottomRowA,
  bottomRowImg: {
    extend: 'bottomRow',
    margin: '0 10px'
  }
})

const Footer = props => {
  const { classes } = props
  return <div>This is the bubbly footer</div>
}

AboutCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(style, { withTheme: true })(Footer)
