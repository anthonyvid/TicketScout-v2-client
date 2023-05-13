// Icons
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
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
