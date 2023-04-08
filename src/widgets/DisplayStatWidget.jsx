import { Chip } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React from "react";
import displayStatWidgetStyles from "styles/widgets/DisplayStatWidget.style.js";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
const DisplayStatWidget = ({
	title,
	sparklineData,
	todaysData,
	width,
	height,
	icon,
}) => {
	const classes = useClasses(displayStatWidgetStyles);

	return (
		<div
			style={{ width: width, height: height }}
			className={classes.container}
		>
			<div className={classes.iconWrap}>{icon}</div>
			<div className={classes.numberWrap}>
				<h2>14</h2>
				<Chip
					className={classes.chip}
					label="1"
					size="small"
					icon={<TrendingUpOutlinedIcon color="success" />}
				/>
			</div>
			<h4>{title}</h4>
		</div>
	);
};

export default DisplayStatWidget;
