import useClasses from "hooks/useClasses.js";
import React from "react";
import contentSectionStyles from "styles/components/ContentSection.style.js";
import ActionBar from "widgets/ActionBar.jsx";

const ContentSection = () => {
	const classes = useClasses(contentSectionStyles);
	return (
		<div className={classes.container}>
			<ActionBar />
		</div>
	);
};

export default ContentSection;
