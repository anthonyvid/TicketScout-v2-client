const headerStyles = (theme) => ({
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        height: '100%',
        alignItems: 'center'
    },
    registerWrap: {
        display: 'flex',
        gap: '15px',

        display: 'flex',
        alignItems: 'center'
    },
    registerButton: {
        height: '40px',
        color: theme.palette.neutral.dark
    },
    registerText: {
        color: theme.palette.neutral.dark
    },
    headerContainer: {
        display: 'flex',
        padding: '20px 60px',
        color: theme.palette.neutral.main,
        height: '100px',
        width: '100%'
    }
});

export default headerStyles;
