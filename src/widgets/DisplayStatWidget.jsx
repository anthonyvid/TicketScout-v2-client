import { Chip } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React from "react";
import PropTypes from "prop-types";
import displayStatWidgetStyles from "styles/widgets/DisplayStatWidget.style.js";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { cx } from "@emotion/css";

import Graph from "components/Graph.jsx";
const DisplayStatWidget = ({
	title,
	sparklineData,
	newData,
	oldData,
	width,
	height,
	totalData,
}) => {
	const classes = useClasses(displayStatWidgetStyles);
	const difference = newData - oldData;

	const getPercentageChange = () => {
		const percentageChange = ((newData - oldData) / (oldData || 1)) * 100;

		if (percentageChange > 0) {
			return `${percentageChange.toFixed(2)}%`;
		} else if (percentageChange < 0) {
			return `${Math.abs(percentageChange).toFixed(2)}%`;
		} else {
			return "0.00%";
		}
	};

	const getTrendIcon = () => {
		if (difference > 0) {
			return <ArrowOutwardIcon color="success" />;
		} else if (difference < 0) {
			return <SouthEastIcon color="error" />;
		} else {
			return <TrendingFlatOutlinedIcon color="warning" />;
		}
	};

	const getSparklineColor = () => {
		if (difference > 0) {
			return "green";
		} else if (difference < 0) {
			return "red";
		} else {
			return "orange";
		}
	};

	const getXAxisLabels = () => {
		const daysOfWeek = ["m", "t", "w", "th", "f", "sa", "su"];
		const currentDay = new Date().getDay();
		const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;
		const modifiedDaysOfWeek = [
			...daysOfWeek.slice(currentDayIndex + 1),
			...daysOfWeek.slice(0, currentDayIndex + 1),
		];
		return modifiedDaysOfWeek;
	};

	return (
		<div
			style={{ width: width, height: height }}
			className={classes.container}
		>
			<div className={classes.titleWrap}>
				<h4>{title}</h4>
				<Chip
					className={cx(classes.chip, {
						[classes.increase]: difference > 0,
						[classes.decrease]: difference < 0,
						[classes.neutral]: difference === 0,
					})}
					label={`${
						difference > 0 ? "+" : ""
					}${difference} (${getPercentageChange()}) today`}
					size="small"
					icon={getTrendIcon()}
				/>
			</div>
			<h2>{totalData}</h2>
			<div>
				<Graph
					data={sparklineData}
					color={getSparklineColor()}
					type="curve"
					xAxisLabels={getXAxisLabels()}
				/>
			</div>
		</div>
	);
};

DisplayStatWidget.defaultProps = {
	height: "auto",
	width: "100%",
};

DisplayStatWidget.propTypes = {
	title: PropTypes.string.isRequired,
	totalData: PropTypes.number.isRequired,
	sparklineData: PropTypes.array.isRequired,
	newData: PropTypes.number.isRequired,
	oldData: PropTypes.number.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
};

export default DisplayStatWidget;
