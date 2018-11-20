const simpleCardStyle = theme => ({
    card2: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 1 auto',
        maxWidth: '300px'
    },
    chip: {
        margin: theme.spacing.unit,
        padding: 5,
        fontSize: '10px'
    },
    cover: {
        width: '100%',
        height: 150,
        alignItem: 'center'
    }
})

export default simpleCardStyle;