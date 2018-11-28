// We can inject some CSS into the DOM.
const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        margin: '10px',
        textAlign: 'center',
        border: '2px solid black',
        borderRadius: '20px',
        display: 'inline-block',
        fontSize: '18px',
        padding: '7px',
        cursor: 'pointer',
    },
    label: {
        textTransform: 'none',
        color: 'black',
        transition: 'color .2s ease-in',
        textDecoration: 'none',
    }
});

export default styles;