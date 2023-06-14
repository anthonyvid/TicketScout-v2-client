const uploadFileDialogStyles = (theme) => ({
    formWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    filePreview: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.neutral.dark,
        textTransform: 'capitalize'
    },
    fileDetailWrap: {
        color: theme.palette.neutral.main,
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        fontSize: '15px'
    },
    subheading: {
        color: theme.palette.neutral.dark,
        marginTop: '20px',
        fontSize: '18px'
    }
});

export default uploadFileDialogStyles;
