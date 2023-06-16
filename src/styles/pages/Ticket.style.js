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
        height: '100%',
        padding: '15px 30px 0px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        justifyContent: 'space-between',
        overflowY: 'auto'
    },
    chatMessageActions: {
        display: 'flex',
        flexDirection: 'column',
        width: '97%',
        minHeight: '150px',
        margin: '13px 13px 13px 13px',
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
    },
    messageWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        height: 'auto',
        width: '100%'
    },
    outgoingMessageWrap: {
        alignItems: 'flex-end'
    },
    incomingMessageWrap: {},
    message: {
        padding: '9px 14px',
        borderRadius: '7px',
        maxWidth: '450px',
        width: 'auto',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
    },
    incomingMessage: {
        backgroundColor: theme.palette.neutral.medium,
        color: 'black',
        borderTopLeftRadius: '1px'
    },
    outgoingMessage: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderTopRightRadius: '1px'
    },
    msgInfoWrap: { display: 'flex', gap: '7px' },
    msgDate: {
        fontWeight: 400,
        color: theme.palette.neutral.mediumMain
    },
    msgName: {
        fontWeight: 700,
        color: theme.palette.neutral.dark
    }
});

export default ticketStyles;
