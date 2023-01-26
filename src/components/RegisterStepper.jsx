import React from "react";

import registerStepperStyles from "styles/components/RegisterStepper.style.js";
import useClasses from "hooks/useClasses.js";
import { cx } from "@emotion/css";

const RegisterStepper = ({ activeStep, steps }) => {
	const classes = useClasses(registerStepperStyles);
	console.log(steps);
	return (
		<div className={classes.parent}>
			{steps.map((step, i) => {
				const width = 80 / steps.length;
				const currentStep = i + 1;

				const isGreyedOut = currentStep > activeStep;

				return (
					<div
						key={currentStep}
						style={{
							width: `${width}%`,
						}}
						className={classes.step}
					>
						<div
							className={cx(
								{ [classes.stepBox]: true },
								{ [classes.greyedOutText]: isGreyedOut },
								{ [classes.greyedOutBox]: isGreyedOut },
								{ [classes.activeText]: !isGreyedOut },
								{
									[classes.activeBox]: !isGreyedOut,
								}
							)}
						>
							<p>{currentStep}</p>
						</div>
						<p
							className={cx(
								{ [classes.greyedOutText]: isGreyedOut },
								{ [classes.activeText]: !isGreyedOut }
							)}
						>
							{step}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default RegisterStepper;
