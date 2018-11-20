const blogPostStyle = theme => ({
    container: {
      position: 'relative',
      textAlign: 'center',
      color: 'black'
    },
    responsive: {
      width: '100%',
      maxHeight: 400,
      height: 'auto'
    },
    topTeft: {
      position: 'absolute',
      top: '8px',
      left: '16px'
    },
    topTeftTwo: {
      position: 'absolute',
      top: '50px',
      left: '25px'
    },
    card: {
      alignSelf: 'auto',
      flex: '1 1 auto',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      theme: 'inherit',
      alignContent: 'center'
    },
    root: {
      padding: theme.spacing.unit * 2,
    },
    control: {
      padding: theme.spacing.unit * 2,
    }
  })

  export default blogPostStyle;