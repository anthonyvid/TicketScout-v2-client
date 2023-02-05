import FlexContainer from "components/FlexContainer.jsx";
import PhoneInput from "components/PhoneInput.jsx";
import TextInput from "components/TextInput.jsx";
import useClasses from "hooks/useClasses.js";
import storeStep1Styles from "styles/components/registerSteps/StoreStep1.style.js";

const StoreStep1 = ({ control, errors, storeUrl }) => {
	const classes = useClasses(storeStep1Styles);

	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Store Information</h1>
				<p className={classes.subtitle}>
					Provide the following information about you and you're store
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
						fullWidth
						label="Store Name"
						name="storeName"
						placeholder="Ticket Scout"
						type="text"
						control={control}
						errors={errors}
					/>
					<TextInput
						staticLabel
						fullWidth
						label="Store URL"
						placeholder={`https://${storeUrl}`}
						type="text"
						disabled
						control={control}
						errors={errors}
					/>
				</FlexContainer>
			</div>
		</>
	);
};

export default StoreStep1;
