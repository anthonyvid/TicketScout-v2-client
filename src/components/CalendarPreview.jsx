import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { getCurrentDate } from "utils/helper.js";
import useClasses from "hooks/useClasses.js";
import calendarPreviewStyles from "styles/components/CalendarPreview.style.js";
const CalendarPreview = () => {
	const classes = useClasses(calendarPreviewStyles);
	return (
		<div className={classes.calendarPreview}>
			<CalendarMonthOutlinedIcon className={classes.calendarIcon} />
			<p className={classes.date}>{getCurrentDate()}</p>
		</div>
	);
};

export default CalendarPreview;
