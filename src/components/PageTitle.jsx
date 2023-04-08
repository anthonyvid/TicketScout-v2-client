import useClasses from "hooks/useClasses.js";
import React from "react";
import pageTitleStyles from "styles/components/PageTitle.style.js";

const PageTitle = ({ title, subtitle }) => {
	const classes = useClasses(pageTitleStyles);
	return (
		<div className={classes.titleWrap}>
			<h2>{title}</h2>
			<small>{subtitle}</small>
		</div>
	);
};

export default PageTitle;
