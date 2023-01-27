import React from "react";

import registerStepperStyles from "styles/components/RegisterStepper.style.js";
import useClasses from "hooks/useClasses.js";
import { cx } from "@emotion/css";

const RegisterStepper = ({ activeStep, steps }) => {
	const classes = useClasses(registerStepperStyles);

	return (
		<div className={cx(classes.parent)}>
			{[...Array(steps).keys()].map((step, i) => {
				const currentStep = i;

				const active = currentStep === activeStep;

				return (
					<div
						key={i}
						className={cx(classes.step, {
							[classes.activeStep]: active,
							[classes.greyedOutStep]: !active,
						})}
					></div>
				);
			})}
		</div>
	);
};

export default RegisterStepper;
