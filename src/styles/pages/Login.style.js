const loginStyles = (theme) => ({
    loginFormWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '100%',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '325px'
        },
        marginBottom: '100px'
    },
    submitBtn: {
        height: '50px'
    },
    heading: { fontSize: '40px' },
    subheading: {
        fontSize: '18px',
        color: theme.palette.neutral.main,
        marginBottom: '15px'
    },
    signUp: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        fontSize: '15px',
        color: theme.palette.neutral.main,
        fontWeight: 600
    },
    textWrap: {
        marginBottom: '20px'
    },
    logoWrap: {
        marginBottom: '30px',
        width: '100%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alighItems: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 55
        }
    }
});

export default loginStyles;
