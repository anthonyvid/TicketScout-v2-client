import { Divider, IconButton, TextareaAutosize, Tooltip } from "@mui/material";
import PageLayout from "components/PageLayout.jsx";
import PageTitle from "components/PageTitle.jsx";
import { statusCodes } from "constants/client.constants.js";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getTicketById } from "services/ticket.service.js";
import ticketStyles from "styles/pages/Ticket.style.js";
import { createNotification } from "utils/notification.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";

const Ticket = () => {
	const classes = useClasses(ticketStyles);
	const location = useLocation();
	const { mode } = useSelector((state) => state.authReducer);
	const ticketId = location?.pathname.match(/\d+$/)[0];
	const [message, setMessage] = useState("");
	const [emojiPicker, setEmojiPicker] = useState(false);
	const [ticket, setTicket] = useState(location?.state?.ticket);
	console.log(ticket);
	const fetchTicket = async () => {
		try {
			const response = await getTicketById(ticketId);
			setTicket(response.data.ticket);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	if (!ticket) {
		fetchTicket();
		//todo: return skeleton here
		return <div>loading ticket</div>;
	}

	const handleSendMessage = (e) => {};
	const toggleEmoji = (e) => setEmojiPicker((prev) => !prev);
	const handleAddAttachment = (e) => {};
	const handleAddPhoto = (e) => {};

	return (
		<PageLayout>
			<ActionBarWidget />
			<div className={classes.ticketPageWrap}>
				<div className={classes.chatWrap}>
					<div className={classes.titleWrap}>
						<h2>{`Chat with ${ticket.customer.fullname}`}</h2>
						<h5>3 messages</h5>
					</div>
					<div className={classes.chatBody}></div>
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
									title="Add photo"
									placement="top"
									arrow
								>
									<IconButton>
										<InsertPhotoOutlinedIcon />
									</IconButton>
								</Tooltip>
								<Tooltip
									title="Add attachment"
									placement="top"
									arrow
								>
									<IconButton>
										<AttachFileOutlinedIcon
											sx={{ transform: "rotate(45deg)" }}
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
