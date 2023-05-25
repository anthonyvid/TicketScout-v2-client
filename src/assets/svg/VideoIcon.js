import React from "react";
import PropTypes from "prop-types";

const VideoIcon = (props) => {
	return (
		<svg
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			fill="#000000"
			style={{
				width: props.width,
				height: props.height,
				...props.styles,
			}}
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<polygon
					fill="none"
					stroke="#000000"
					strokeWidth="2"
					strokeLinejoin="round"
					points="7,28 7,4 19,4 25,10 25,28"
				></polygon>
				<polyline
					fill="none"
					stroke="#000000"
					strokeWidth="2"
					strokeLinejoin="round"
					points="19,4 19,10 25,10"
				></polyline>
				<polygon
					fill="none"
					stroke="#000000"
					strokeWidth="2"
					strokeLinejoin="round"
					points="19,18 14,21 14,15"
				></polygon>
			</g>
		</svg>
	);
};

VideoIcon.defaultProps = {
	width: "45px",
	height: "45px",
};

VideoIcon.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default VideoIcon;
