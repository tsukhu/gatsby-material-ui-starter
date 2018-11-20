const postPagination = theme => ({
    card: {
      alignSelf: 'auto',
      flex: '1 1 auto',
      flexDirection: 'column',
      theme: 'inherit',
      margin: 5,
      alignContent: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      shadowRadius: 5,
      border: '1px grey',
      boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
    },
    flex: {
      flex: 1
    },
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    }
  })

  export default postPagination;