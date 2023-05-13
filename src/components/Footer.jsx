import { Link } from "react-router-dom";

// Hooks
import useClasses from "hooks/useClasses.js";

// Components
import { InputLabel } from "@mui/material";
import FlexContainer from "./FlexContainer.jsx";

// Styles
import footerStyles from "styles/components/Footer.style.js";

const Footer = () => {
	const classes = useClasses(footerStyles);
	return (
		<FlexContainer
			alignItemsCenter
			justifyContentBetween
			styles={classes.footerContainer}
		>
			<p>&copy; 2023 Company Name</p>
			<div className={classes.linkWrap}>
				<Link to="/terms">
					<InputLabel>Terms</InputLabel>
				</Link>
				<Link to="/privacy">
					<InputLabel>Privacy</InputLabel>
				</Link>
				<Link to="/security">
					<InputLabel>Security</InputLabel>
				</Link>
				<Link to="/contact">
					<InputLabel>Contact</InputLabel>
				</Link>
			</div>
		</FlexContainer>
	);
};

export default Footer;
