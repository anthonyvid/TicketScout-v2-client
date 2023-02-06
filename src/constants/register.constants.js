import * as yup from "yup";

export const planTypes = Object.freeze({
	BASIC: 0,
	STANDARD: 1,
	PRO: 2,
});

export const planInfo = Object.freeze({
	0: {
		price: "Free",
		name: "Basic",
		perks: [
			"50 Tickets / Month",
			"50 Invoices / Month",
			"5 Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
	1: {
		price: "$9.99",
		name: "Standard",
		perks: [
			"Unlimited Tickets / Month",
			"Unlimited Invoices / Month",
			"20 Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
	2: {
		price: "$19.99",
		name: "Pro",
		perks: [
			"Unlimited Tickets / Month",
			"Unlimited Invoices / Month",
			"Unlimited Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
});

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const storeSchema = yup.object().shape({
	firstname: yup.string().required("First name is required"),
	lastname: yup.string().required("Last name is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email address is required"),
	phoneNumber: yup
		.string()
		.max(12, "Phone number cannot exceed 12 characters")
		.required("Phone number is required")
		.matches(phoneRegExp, "Invalid phone number"),
	storeName: yup.string().required("Store name is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.max(64, "Password cannot exceed 64 characters")
		.required("Password is required")
		.matches(/^(?=.*[a-z])/, "Password must include lowercase letter")
		.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter")
		.matches(/^(?=.*[0-9])/, "Password must include digit")
		.matches(
			/^(?=.*[!@#\$%\^&\*])/,
			"Password must include special character"
		),
	confirmPassword: yup
		.string()
		.required("Please retype your password.")
		.oneOf([yup.ref("password")], "Your passwords do not match."),
});

yup.addMethod(yup.string, "uniqueStoreName", (isUnique, errorMessage) => {
	return this.test("unique-store-name", errorMessage, (value) => {
        return isUnique;
    });
});

export const employeeSchema = yup.object().shape({
	firstname: yup.string().required("First name is required"),
	lastname: yup.string().required("Last name is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email address is required"),
	phoneNumber: yup
		.string()
		.max(12, "Phone number cannot exceed 12 characters")
		.required("Phone number is required")
		.matches(phoneRegExp, "Invalid phone number"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.max(64, "Password cannot exceed 64 characters")
		.required("Password is required")
		.matches(/^(?=.*[a-z])/, "Password must include lowercase letter")
		.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter")
		.matches(/^(?=.*[0-9])/, "Password must include digit")
		.matches(
			/^(?=.*[!@#\$%\^&\*])/,
			"Password must include special character"
		),
	confirmPassword: yup
		.string()
		.required("Please retype your password.")
		.oneOf([yup.ref("password")], "Your passwords do not match."),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email address is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.max(64, "Password cannot exceed 64 characters")
		.required("Password is required")
		.matches(/^(?=.*[a-z])/, "Password must include lowercase letter")
		.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter")
		.matches(/^(?=.*[0-9])/, "Password must include digit")
		.matches(
			/^(?=.*[!@#\$%\^&\*])/,
			"Password must include special character"
		),
});
