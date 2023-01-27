import FlexContainer from "components/FlexContainer.jsx";
import PhoneInput from "components/PhoneInput.jsx";
import TextInput from "components/TextInput.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect } from "react";
import employeeStep2Styles from "styles/components/registerSteps/EmployeeStep2.styles.js";
const EmployeeStep2 = ({ control, errors }) => {
	const classes = useClasses(employeeStep2Styles);

	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Finish Account Setup</h1>
				<p className={classes.subtitle}>
					Complete your registration by providing your personal
					information
				</p>
			</div>
			<div className={classes.contentWrap}>
				<FlexContainer gap="25px">
					<TextInput
						staticLabel
						autoFocus
						fullWidth
						label="Firstname"
						placeholder="John"
						name="firstname"
						type="text"
						control={control}
						errors={errors}
					/>
					<TextInput
						staticLabel
						fullWidth
						placeholder="Smith"
						label="Lastname"
						name="lastname"
						type="text"
						control={control}
						errors={errors}
					/>
				</FlexContainer>
				<FlexContainer gap="25px">
					<TextInput
						staticLabel
						fullWidth
						label="Email"
						name="email"
						type="email"
						control={control}
						errors={errors}
					/>
					<PhoneInput
						fullWidth
						staticLabel
						label="Phone Number"
						name="phoneNumber"
						placeholder="123-456-7890"
						control={control}
						errors={errors}
					/>
				</FlexContainer>
				<FlexContainer
					gap="25px"
					styles={classes.nameWrap}
				></FlexContainer>
			</div>
		</>
	);
};

export default EmployeeStep2;
