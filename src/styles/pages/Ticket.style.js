const ticketStyles = (theme) => ({
    chatWrap: {
        width: '65%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow:
            'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
        backgroundColor: 'white',
        borderRadius: '15px',
        border: `1px solid ${theme.palette.neutral.light}`
    },
    ticketInfo: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow:
            'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
        backgroundColor: 'white',
        borderRadius: '15px',
        width: '35%',
        border: `1px solid ${theme.palette.neutral.light}`
    },
    ticketPageWrap: {
        display: 'flex',
        gap: '15px',
        width: '100%',
        height: '100%'
    },
    titleWrap: {
        width: '100%',
        height: '75px',
        borderBottom: `1px solid ${theme.palette.neutral.light}`,
        padding: '13px 15px',
        color: theme.palette.neutral.dark,
        h5: {
            color: theme.palette.neutral.main
        }
    },
    chatBody: {
        width: '100%',
        height: '100%'
    },
    chatMessageActions: {
        display: 'flex',
        flexDirection: 'column',
        width: '97%',
        minHeight: '150px',
        border: '1px solid blue',
        margin: '13px',
        padding: '10px 10px 5px 10px',
        borderRadius: '10px',
        backgroundColor: 'white',
        border: `1px solid ${theme.palette.neutral.light}`
    },
    textArea: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        border: 0,
        outline: 0,
        resize: 'none',
        fontFamily: 'Nunito'
    },
    actions: {
        color: theme.palette.neutral.main,
        width: '100%',
        height: '30px',
        display: 'flex',
        marginTop: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    msgAttachments: {
        display: 'flex',
        height: '100%',
        width: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    emojiPicker: {
        position: 'absolute',
        bottom: 100
    }
});

export default ticketStyles;
