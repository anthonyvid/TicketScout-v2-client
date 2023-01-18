import { Container } from "@mui/material";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { cx } from "@emotion/css";
import flexContainerStyles from "styles/components/FlexContainer.style.js";

const FlexContainer = ({
	maxWidth,
	disableGutters,
	children,
	style,
	row,
	col,
	justifyContentStart,
	justifyContentCenter,
	justifyContentEnd,
	justifyContentBetween,
	justifyContentAround,
	alignItemsStart,
	alignItemsCenter,
	alignItemsEnd,
	alignItemsBaseline,
	alignItemsStretch,
	page,
	autoHeight,
}) => {
	const classes = useClasses(flexContainerStyles);

	let direction = "row";

	if (row) {
		direction = "row";
	} else if (col) {
		direction = "column";
	}

	let justifyContent = "flex-start";

	if (justifyContentStart) {
		justifyContent = "flex-start";
	} else if (justifyContentCenter) {
		justifyContent = "center";
	} else if (justifyContentEnd) {
		justifyContent = "flex-end";
	} else if (justifyContentBetween) {
		justifyContent = "space-between";
	} else if (justifyContentAround) {
		justifyContent = "space-around";
	}

	let alignItems = "start";

	if (alignItemsStart) {
		alignItems = "start";
	} else if (alignItemsCenter) {
		alignItems = "center";
	} else if (alignItemsEnd) {
		alignItems = "end";
	} else if (alignItemsBaseline) {
		alignItems = "baseline";
	} else if (alignItemsStretch) {
		alignItems = "stretch";
	}

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: direction,
				justifyContent: justifyContent,
				alignItems: alignItems,
			}}
			maxWidth={maxWidth}
			disableGutters={disableGutters}
			fluid="true"
			className={cx(
				{ [classes.background]: true },
				{ [classes.container]: page && !autoHeight },
				{ [classes.autoHeight]: autoHeight },
				{ [style]: style !== null }
			)}
		>
			{children}
		</Container>
	);
};

FlexContainer.defaultProps = {
	maxWidth: "false",
	autoHeight: false,
	disableGutters: true,
	style: null,
	justifyContentStart: false,
	justifyContentCenter: false,
	justifyContentEnd: false,
	justifyContentBetween: false,
	justifyContentAround: false,
	alignItemsStart: false,
	alignItemsCenter: false,
	alignItemsEnd: false,
	alignItemsBaseline: false,
	alignItemsStretch: false,
	row: false,
	col: false,
	page: false,
};

FlexContainer.propTypes = {
	maxWidth: PropTypes.string,
	disableGutters: PropTypes.bool,
	autoHeight: PropTypes.bool,
	style: PropTypes.string,
	row: PropTypes.bool,
	col: PropTypes.bool,
	justifyContentStart: PropTypes.bool,
	justifyContentCenter: PropTypes.bool,
	justifyContentEnd: PropTypes.bool,
	justifyContentBetween: PropTypes.bool,
	justifyContentAround: PropTypes.bool,
	alignItemsStart: PropTypes.bool,
	alignItemsCenter: PropTypes.bool,
	alignItemsEnd: PropTypes.bool,
	alignItemsBaseline: PropTypes.bool,
	alignItemsStretch: PropTypes.bool,
	page: PropTypes.bool,
};

export default FlexContainer;