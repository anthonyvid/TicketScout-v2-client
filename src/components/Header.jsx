import PropTypes from "prop-types";

// Utils/Hooks/Reducers
import useClasses from "hooks/useClasses.js";

// Components
import FlexContainer from "./FlexContainer.jsx";
import LinkButton from "./LinkButton.jsx";

// Mui Components
import { Grid } from "@mui/material";

// Icons
// import Logo from "assets/svg/logo.js";

// Styles
import headerStyles from "styles/components/Header.style.js";

const Header = ({}) => {
	const classes = useClasses(headerStyles);
	return <FlexContainer styles={classes.headerContainer}></FlexContainer>;
};

Header.defaultProps = {
	showLogo: true,
	showMenu: false,
	showRegister: false,
	showLogin: false,
};

Header.propTypes = {
	showLogo: PropTypes.bool,
	showMenu: PropTypes.bool,
	showRegister: PropTypes.bool,
	showLogin: PropTypes.bool,
};

export default Header;
