import useClasses from "hooks/useClasses.js";
import React from "react";
import pageLayoutStyles from "styles/components/PageLayout.style.js";

const PageLayout = ({ children }) => {
	const classes = useClasses(pageLayoutStyles);
	return <div className={classes.page}>{children}</div>;
};

export default PageLayout;
