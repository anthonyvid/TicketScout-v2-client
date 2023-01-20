import { Button } from "@mui/material";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const LinkButton = ({ to, onClick, elevate, submit, ...rest }) => {
	return (
		<Button
			component={Link}
			to={to}
			onClick={onClick}
			type={"submit"}
			{...rest}
			disableElevation={elevate ? false : true}
		/>
	);
};

LinkButton.defaultProps = {
	elevate: false,
	submit: false,
};

LinkButton.propTypes = {
	to: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	elevate: PropTypes.bool,
	submit: PropTypes.bool,
};

export default LinkButton;
