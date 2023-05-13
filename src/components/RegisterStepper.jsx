// Styles
import { cx } from "@emotion/css";
import registerStepperStyles from "styles/components/RegisterStepper.style.js";

// Hooks
import useClasses from "hooks/useClasses.js";

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
		</div>
	);
};

export default RegisterStepper;
