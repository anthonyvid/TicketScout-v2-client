import { TextField } from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import TextInput from "components/TextInput.jsx";
import useClasses from "hooks/useClasses.js";
import React from "react";
import employeeStep2Styles from "styles/components/registerSteps/EmployeeStep2.styles.js";
const EmployeeStep2 = ({ control, errors }) => {
	const classes = useClasses(employeeStep2Styles);
	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Finish Account Setup</h1>
				<p className={classes.subtitle}>
					Complete your account setup by providing your personal
					information
				</p>
			</div>
			<div className={classes.contentWrap}>
				<FlexContainer gap="25px" styles={classes.nameWrap}>
					<TextInput
						staticLabel
						autoFocus
						fullWidth
						label="Firstname"
						placeholder="John"
						name="firstname"
						type="text"
						errorText="Please enter a valid firstname"
						control={control}
						errors={errors}
						rules={{ required: true }}
					/>
					<TextInput
						staticLabel
						fullWidth
						autoFocus
						placeholder="Smith"
						label="Lastname"
						name="lastname"
						type="text"
						errorText="Please enter a valid lastname"
						control={control}
						errors={errors}
						rules={{ required: true }}
					/>
				</FlexContainer>
				<FlexContainer gap="25px" styles={classes.nameWrap}>
					<TextInput
						staticLabel
						autoFocus
						fullWidth
						label="Email"
						name="email"
						type="email"
						errorText="Please enter a valid email"
						control={control}
						errors={errors}
						rules={{ required: true }}
					/>
					<TextInput
						staticLabel
						fullWidth
						autoFocus
						placeholder="123-456-7890"
						label="Phone"
						name="phone"
						type="text"
						errorText="Please enter a valid phone number"
						control={control}
						errors={errors}
						rules={{ required: true }}
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
