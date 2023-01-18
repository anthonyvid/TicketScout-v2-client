import Footer from "components/Footer.jsx";
import FlexContainer from "components/FlexContainer.jsx";
import useClasses from "hooks/useClasses.js";
import loginStyles from "styles/pages/Login.style.js";

const Login = () => {
	const classes = useClasses(loginStyles);
	return (
		<FlexContainer page col style={classes.loginContainer}>
			<h1>login page</h1>
			<Footer />
		</FlexContainer>
	);
};

export default Login;
