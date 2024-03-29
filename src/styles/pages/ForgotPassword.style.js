const forgotPasswordStyles = (theme) => ({
    heading: { fontSize: '40px' },
    subheading: {
        fontSize: '18px',
        color: theme.palette.neutral.main,
        marginTop: '-20px',
        marginBottom: '15px'
    },
    emailInput: {
        width: '100%'
    },
    resetButton: {
        width: '100%',
        height: '50px',
        margin: '20px 0 0 0'
    },
    wrap: {
        display: 'flex',
        height: 'auto',
        flexDirection: 'column',
        gap: '25px',
        width: '400px',
        textAlign: 'center',
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            width: '85%'
        }
    },
    lottieWrap: {
        width: '100%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alighItems: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 55
        }
    },
    emailIcon: {
        color: theme.palette.neutral.main,
        marginRight: '7px'
    }
});

export default forgotPasswordStyles;
