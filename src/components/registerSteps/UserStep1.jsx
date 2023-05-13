// Hooks
import useClasses from "hooks/useClasses.js";

// Components
import FlexContainer from "components/FlexContainer.jsx";
import PhoneInput from "components/PhoneInput.jsx";
import TextInput from "components/TextInput.jsx";

// Styles
import userStep1Styles from "styles/components/registerSteps/UserStep1.style.js";

const UserStep1 = ({
	control,
	errors,
	debouncedOnChange,
	emailRebounce,
	uniqueEmail,
}) => {
	const classes = useClasses(userStep1Styles);

	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Personal Information</h1>
				<p className={classes.subtitle}>
					Start your registration by providing your personal
					information
				</p>
			</div>
			<div className={classes.contentWrap}>
				<FlexContainer gap="25px">
					<TextInput
						staticLabel
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
						onChangeHandler={debouncedOnChange[0]}
						uniqueDataValidation
						isDataUnique={uniqueEmail}
						uniqueData={emailRebounce}
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
				<FlexContainer gap="25px">
					<TextInput
						staticLabel
						peekPassword
						fullWidth
						label="Password"
						name="password"
						type="password"
						control={control}
						errors={errors}
					/>
					<TextInput
						staticLabel
						peekPassword
						fullWidth
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						control={control}
						errors={errors}
					/>
				</FlexContainer>
			</div>
		</>
	);
};

export default UserStep1;
