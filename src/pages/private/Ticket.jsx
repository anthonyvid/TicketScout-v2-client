import { IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import PageLayout from '~/components/PageLayout';
import { statusCodes } from '~/constants/client.constants';
import useClasses from '~/hooks/useClasses.js';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTicketById, sendMessage } from '~/services/ticket.service.js';
import ticketStyles from '~/styles/pages/Ticket.style.js';
import { createNotification } from '~/utils/notification.js';
import ActionBarWidget from '~/widgets/ActionBarWidget.jsx';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '~/reducers/modal.js';
import moment from 'moment';
import { formatName } from '~/utils/helper';
import { cx } from '@emotion/css';

const MESSAGE_TYPE = Object.freeze({
    OUTGOING: 0,
    IMCOMING: 1
});

const Ticket = () => {
    const classes = useClasses(ticketStyles);
    const location = useLocation();
    const dispatch = useDispatch();
    const { mode, user } = useSelector((state) => state.authReducer);
    const { files } = useSelector((state) => state.modalReducer);
    const ticketId = location?.pathname.match(/\d+$/)[0];
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [ticket, setTicket] = useState(location?.state?.ticket);
    console.log(ticket);
    const fetchTicket = async () => {
        try {
            const response = await getTicketById(ticketId);
            setTicket(response.data.ticket);
            setChatHistory(response.data.ticket.chatHistory);
            if (response.status !== statusCodes.OK)
                throw new Error(response.data.message || response.statusText);
        } catch (error) {
            createNotification('error', error.message);
            console.error(error.message);
        }
    };

    const handleSendMessage = async () => {
        const newMsg = {
            message,
            timestamp: moment(),
            user,
            type: MESSAGE_TYPE.IMCOMING
        };
        try {
            const response = await sendMessage(ticketId, newMsg);

            if (response.status !== statusCodes.CREATED)
                throw new Error(response.data.message || response.statusText);

            setChatHistory((prev) => [...prev, newMsg]);
        } catch (error) {
            createNotification('error', error.message);
            console.error(error.message);
        }
    };
    const toggleEmoji = (e) => setEmojiPicker((prev) => !prev);
    const handleAddAttachment = (e) => dispatch(openModal('UPLOAD_FILE'));

    const handleAddPhoto = (e) => {};

    if (!ticket) {
        fetchTicket();
        //todo: return skeleton here
        return <div>loading ticket</div>;
    }

    return (
        <PageLayout>
            <ActionBarWidget />
            <div className={classes.ticketPageWrap}>
                <div className={classes.chatWrap}>
                    <div className={classes.titleWrap}>
                        <h2>{`Chat with ${ticket.customer.fullname}`}</h2>
                        <h5>3 messages</h5>
                    </div>
                    <div className={classes.chatBody}>
                        {chatHistory.map(
                            ({ message, timestamp, user, type }, i) => {
                                return (
                                    <div
                                        className={cx(
                                            classes.messageWrap,
                                            {
                                                [classes.outgoingMessageWrap]:
                                                    type ===
                                                    MESSAGE_TYPE.OUTGOING
                                            },
                                            {
                                                [classes.incomingMessageWrap]:
                                                    type ===
                                                    MESSAGE_TYPE.IMCOMING
                                            }
                                        )}
                                        key={`${timestamp}-${i}`}
                                    >
                                        <div className={classes.msgInfoWrap}>
                                            <p className={classes.msgDate}>
                                                {moment(timestamp).format(
                                                    'MMMM Do YYYY, h:mm a'
                                                )}
                                            </p>
                                            <p className={classes.msgName}>
                                                {formatName(
                                                    user.firstname,
                                                    user.lastname
                                                )}
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                classes.message,
                                                {
                                                    [classes.outgoingMessage]:
                                                        type ===
                                                        MESSAGE_TYPE.OUTGOING
                                                },
                                                {
                                                    [classes.incomingMessage]:
                                                        type ===
                                                        MESSAGE_TYPE.IMCOMING
                                                }
                                            )}
                                        >
                                            <p>{message}</p>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <div className={classes.chatMessageActions}>
                        {emojiPicker && (
                            <div className={classes.emojiPicker}>
                                <Picker
                                    data={data}
                                    autoFocus
                                    onEmojiSelect={(e) =>
                                        setMessage((prev) => (prev += e.native))
                                    }
                                    theme={mode}
                                />
                            </div>
                        )}
                        <TextareaAutosize
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            minRows={5}
                            maxRows={5}
                            placeholder="Write a response..."
                            className={classes.textArea}
                        />
                        <div className={classes.actions}>
                            <div className={classes.msgAttachments}>
                                <Tooltip
                                    title="Add emoji"
                                    placement="top"
                                    arrow
                                >
                                    <IconButton onClick={toggleEmoji}>
                                        <EmojiEmotionsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="Add attachment"
                                    placement="top"
                                    arrow
                                >
                                    <IconButton onClick={handleAddAttachment}>
                                        <AttachFileOutlinedIcon
                                            sx={{ transform: 'rotate(45deg)' }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Tooltip title="Send" placement="top" arrow>
                                <>
                                    <IconButton
                                        disabled={message.length <= 0}
                                        onClick={handleSendMessage}
                                        color="primary"
                                    >
                                        <SendRoundedIcon />
                                    </IconButton>
                                </>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={classes.ticketInfo}>
                    <div className={classes.titleWrap}>
                        <h2>{`Ticket #${ticket.ticketId}`}</h2>
                        <h5>3 messages</h5>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Ticket;
