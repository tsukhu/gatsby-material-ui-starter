// ##############################
// // // Badge component styles
// #############################

const primaryColor = '#9c27b0'
const warningColor = '#ff9800'
const dangerColor = '#f44336'
const successColor = '#4caf50'
const infoColor = '#00acc1'
const roseColor = '#e91e63'
const grayColor = '#6c757d'
const violetColor = '	#8a2be2'

const badgeStyle = theme => ({
  badge: {
    marginRight: '3px',
    borderRadius: '12px',
    padding: '5px 12px',
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: '500',
    lineHeight: '1',
    color: '#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    display: 'inline-block'
  },
  primary: {
    backgroundColor: primaryColor
  },
  warning: {
    backgroundColor: warningColor
  },
  danger: {
    backgroundColor: dangerColor
  },
  success: {
    backgroundColor: successColor
  },
  info: {
    backgroundColor: infoColor
  },
  rose: {
    backgroundColor: roseColor
  },
  gray: {
    backgroundColor: grayColor
  },
  blue: {
    backgroundColor: violetColor
  }
})

export { badgeStyle }
