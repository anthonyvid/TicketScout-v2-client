import React from "react";

import registerStepperStyles from "styles/components/RegisterStepper.style.js";
import useClasses from "hooks/useClasses.js";
import { cx } from "@emotion/css";

const RegisterStepper = ({ activeStep, steps }) => {
	const classes = useClasses(registerStepperStyles);

	return (
		<div>
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
			{/* <p className={classes.stepText}>{`Step ${
				activeStep + 1
			}/${steps}`}</p> */}
		</div>
	);
};

export default RegisterStepper;
