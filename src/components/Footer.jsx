import useClasses from "hooks/useClasses.js";
import React from "react";
import footerStyles from "styles/components/Footer.style.js";
import FlexContainer from "./FlexContainer.jsx";

const Footer = () => {
	const classes = useClasses(footerStyles);
	return (
		<FlexContainer
			alignItemsCenter
			justifyContentBetween
			style={classes.footerContainer}
		>
			<p>&copy; 2023 Company Name</p>
		</FlexContainer>
	);
};

export default Footer;