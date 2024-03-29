const sidebarMenuStyles = (theme) => ({
    sidebar: {
        width: '280px',
        height: '100vh',
        paddingTop: '20px',
        paddingRight: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        transition: '0.4s ease-in-out',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        border: `1px solid ${theme.palette.neutral.light}`,

        boxShadow:
            'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'
    },
    sidebarClosed: {
        width: '80px'
    },
    sidebarToggleBG: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default1,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        right: -20,
        bottom: 70,
        position: 'absolute'
    },
    arrowIcon: {
        transition: '0.2s ease-in-out',
        transform: 'scale(1)',
        '&:hover': {
            transition: '0.2s ease-in-out',
            transform: 'scale(1.1)'
        }
    },
    sidebarToggleWrap: {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        right: -12,
        top: 10,
        backgroundColor: `${theme.palette.primary.mainLight}`,
        color: `${theme.palette.primary.main}`,
        transition: '0.2s ease-in-out',
        transform: 'scale(1)',
        '&:hover': {
            transition: '0.2s ease-in-out',
            transform: 'scale(1.1)'
        }
    },
    logoWrap: {
        height: '70px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '50px',
        fontSize: '20px',
        fontWeight: '900',
        letterSpacing: '1.5px',
        transition: '0.4s ease-in-out'
    },
    logoWrapSmall: {
        paddingLeft: '15px',
        transition: '0.4s ease-in-out'
    },
    generalWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    },
    menuItem: {
        width: '100%',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        gap: '15px',
        width: '85%',
        paddingLeft: '25px',
        marginLeft: '13px',
        fontSize: '16px',
        fontWeight: '700',
        color: theme.palette.neutral.main,
        cursor: 'pointer',
        transition: '0.4s ease-in-out',
        '&:hover': {
            transition: '0.2s ease-in-out',
            backgroundColor: `${theme.palette.primary.mainLight}`,
            color: theme.palette.neutral.main
        }
    },
    menuItemSmall: {
        paddingLeft: '0px',
        justifyContent: 'center',
        transition: '0.4s ease-in-out'
    },
    activeItem: {
        color: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.mainLight}90`
    },
    activeIndicator: {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        left: 0,
        width: '6px',
        height: '45px',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px'
    },
    mobileMenuWrap: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    menuBtn: {
        width: '25px',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        left: 10,
        top: 10,
        position: 'absolute',
        zIndex: 100
    },
    mobileMenu: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: '5px solid red'
    }
});

export default sidebarMenuStyles;
