import * as yup from "yup";

export const planTypes = Object.freeze({
	BASIC: 0,
	STANDARD: 1,
	PRO: 2,
});

export const registerTypes = Object.freeze({
	USER: 0,
	ORGANIZATION: 1,
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

export const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
