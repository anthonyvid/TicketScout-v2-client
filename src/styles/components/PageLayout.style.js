const pageLayoutStyles = (theme) => ({
    page: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'hidden',
        height: '100vh',
        padding: '15px 15px 15px 20px',
        gap: '15px',
        backgroundColor: theme.palette.background.default1
    },
    row: {
        flexDirection: 'row'
    }
});

export default pageLayoutStyles;
