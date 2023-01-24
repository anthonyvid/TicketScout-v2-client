import React from "react";

const greyedOut = "#eaeaea";

const steps = [
	"1. Select campaign settings",
	"2. Create an ad group",
	"3. Create an ad",
];

const RegisterStepper = ({ activeStep }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				gap: "10px",
				fontWeight: "bold",
			}}
		>
			{steps.map((step) => {
				const width = 70 / steps.length;
				const currentStep = step.split(".")[0];

				const isGreyedOut = currentStep > activeStep;

				return (
					<div
						key={currentStep}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
							height: "100%",
							width: `${width}%`,
						}}
					>
						<div
							style={{
								width: "100%",
								height: "45%",
								color: isGreyedOut ? greyedOut : "blue",
							}}
						>
							{step}
						</div>
						<div
							style={{
								width: "100%",
								height: "55%",
								backgroundColor: isGreyedOut
									? greyedOut
									: "blue",
								borderRadius: "1px",
							}}
						></div>
					</div>
				);
			})}
		</div>
	);
};

export default RegisterStepper;
