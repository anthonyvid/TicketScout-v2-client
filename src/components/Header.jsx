import PropTypes from "prop-types";

// Utils/Hooks/Reducers
import useClasses from "hooks/useClasses.js";

// Components
import FlexContainer from "./FlexContainer.jsx";
import LinkButton from "./LinkButton.jsx";

// Mui Components
import { Grid } from "@mui/material";

// Icons
import Logo from "assets/svg/logo.js";

// Styles
import headerStyles from "styles/components/Header.style.js";

const Header = ({ showLogo, showMenu, showRegister, showLogin }) => {
	const classes = useClasses(headerStyles);
	return (
		<FlexContainer style={classes.headerContainer}>
			<Grid className={classes.header} item xs={12}>
				<div>{showLogo && <Logo width={50} height={50} />}</div>

				<div>{showMenu && ""}</div>

				<div className={classes.registerWrap}>
					{showRegister && (
						<>
							<p className={classes.registerText}>
								New to TicketScout?
							</p>
							<LinkButton
								className={classes.registerButton}
								variant="light"
								to="/account/register"
								size="small"
							>
								Create an account
							</LinkButton>
						</>
					)}
					{showLogin && (
						<>
							<p className={classes.registerText}>
								Have an account?
							</p>
							<LinkButton
								className={classes.registerButton}
								variant="light"
								to="/account/login"
								size="small"
							>
								Log in
							</LinkButton>
						</>
					)}
				</div>
			</Grid>
		</FlexContainer>
	);
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
