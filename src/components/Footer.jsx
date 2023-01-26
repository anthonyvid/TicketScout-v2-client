import { InputLabel } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { Link } from "react-router-dom";
import footerStyles from "styles/components/Footer.style.js";
import FlexContainer from "./FlexContainer.jsx";

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
