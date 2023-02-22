import PropTypes from "prop-types";

const Logo = (props) => {
	return (
		<svg
			style={{
				width: props.width,
				height: props.height,
			}}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 487.62 463.2"
		>
			<path
				style={{ fill: "#979797" }}
				d="M479.15 208.04H264.71v-65.17s55.19-7.08 103.6 43.97h104.14S427.22 53.05 263.39 54.43l-92.71 88.1V296.4h217.87s-24.02 74.23-109.81 79.06v87.65s125.94 8.09 193.54-129.95c0 0 29.35-72.11 6.88-125.12Z"
			/>
			<path
				style={{ fill: props.color }}
				d="M150.05 266.41V142.87l93.33-89.15h-93.33V0L0 142.85h57.25v127s6.19 171.35 199.21 193.34v-87.83s-98.57-11.65-106.41-108.96Z"
			/>
		</svg>
	);
};

Logo.defaultProps = {
	width: "80px",
	height: "80px",
	color: "#0c70df",
};

Logo.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color: PropTypes.string,
};

export default Logo;
