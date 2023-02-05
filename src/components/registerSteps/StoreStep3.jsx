import useClasses from "hooks/useClasses.js";
import React from "react";

import StoreStep3Styles from "styles/components/registerSteps/StoreStep3.style.js";

const StoreStep3 = ({ subscriptionType, plan }) => {
	const classes = useClasses(StoreStep3Styles);
	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Complete your Subscription</h1>
				<p className={classes.subtitle}>
					Choose the type of plan for your store
				</p>
			</div>
			<div className={classes.contentWrap}></div>
		</>
	);
};

export default StoreStep3;
