import { Chip } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import displayStatWidgetStyles from "styles/widgets/DisplayStatWidget.style.js";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import { themeSettings } from "theme.js";
import { cx } from "@emotion/css";
import { Sparklines, SparklinesLine } from "react-sparklines";
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

	const getPercentageChange = () => {
		const percentageChange =
			((todaysCount - yesterdaysCount) / yesterdaysCount) * 100;

		if (percentageChange >= 0) {
			return `${percentageChange.toFixed(2)}%`;
		} else {
			return `${Math.abs(percentageChange).toFixed(2)}%`;
		}
	};

	const getTrendIcon = () => {
		if (todaysCount - yesterdaysCount > 0) {
			return <TrendingUpOutlinedIcon color="success" />;
		} else if (todaysCount - yesterdaysCount < 0) {
			return <TrendingDownIcon color="error" />;
		} else {
			return <TrendingFlatOutlinedIcon color="warning" />;
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
					className={cx({
						[classes.increase]: todaysCount - yesterdaysCount > 0,
						[classes.decrease]: todaysCount - yesterdaysCount < 0,
						[classes.neutral]: todaysCount - yesterdaysCount === 0,
					})}
					label={`${
						todaysCount - yesterdaysCount
					} (${getPercentageChange()}) today`}
					size="small"
					icon={getTrendIcon()}
				/>
			</div>
			<h4>{title}</h4>
			<div className={classes.sparklineWrap}>
				<Sparklines data={[yesterdaysCount, todaysCount]}>
					<SparklinesLine color="red" />
				</Sparklines>
			</div>
		</div>
	);
};

export default DisplayStatWidget;
