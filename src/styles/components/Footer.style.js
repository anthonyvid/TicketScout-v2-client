const footerStyles = (theme) => ({
    footerContainer: {
        height: '100px',
        borderTop: `1px solid ${theme.palette.neutral.medium}`,
        marginTop: 'auto',
        padding: '0 60px',
        color: theme.palette.neutral.main
    },
    linkWrap: {
        display: 'flex',
        gap: '20px'
    }
});

export default footerStyles;
