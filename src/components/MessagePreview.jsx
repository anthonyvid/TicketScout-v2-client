import React from "react";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
// import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import SmsIcon from "@mui/icons-material/Sms";
import useClasses from "hooks/useClasses.js";
import messagePreviewStyles from "styles/components/MessagePreview.style.js";

const MessagePreview = () => {
	const classes = useClasses(messagePreviewStyles);
	return (
		<div className={classes.recentMessages}>
			<SmsOutlinedIcon />
		</div>
	);
};

export default MessagePreview;
