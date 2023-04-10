import { Chip } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import displayStatWidgetStyles from "styles/widgets/DisplayStatWidget.style.js";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
const DisplayStatWidget = ({
	title,
	sparklineData,
	todaysCount,
	yesterdaysCount,
	width,
	height,
	icon,
}) => {
	const classes = useClasses(displayStatWidgetStyles);
	const [increase, setIncrease] = useState(false);

	const calculatePercentage = () => {
		let diff = 0;

		console.log(todaysCount, yesterdaysCount);
		if (todaysCount > yesterdaysCount) {
			setIncrease(true);
			diff = todaysCount - yesterdaysCount;
			console.log((diff / todaysCount) * 100);
			return (diff / todaysCount) * 100;
		} else if (todaysCount < yesterdaysCount) {
			console.log("ya");
			diff = yesterdaysCount - todaysCount;
			console.log((diff / yesterdaysCount) * 100);
			return (diff / yesterdaysCount) * 100;
		} else {
		}
	};

	return (
		<div
			style={{ width: width, height: height }}
			className={classes.container}
		>
			<div className={classes.iconWrap}>{icon}</div>
			<div className={classes.numberWrap}>
				<h2>{todaysCount}</h2>
				<Chip
					className={classes.chip}
					label={`${calculatePercentage()}%`}
					size="small"
					icon={<TrendingUpOutlinedIcon color="success" />}
				/>
			</div>
			<h4>{title}</h4>
		</div>
	);
};

export default DisplayStatWidget;
