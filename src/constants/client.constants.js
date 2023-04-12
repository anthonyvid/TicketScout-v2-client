import * as yup from "yup";

/* Register Constants */
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

/* Status Codes Constants */
export const statusCodes = {
	OK: 200, // Success
	CREATED: 201, // Success, new resource created
	ACCEPTED: 202, // Success, usually for actions that take long to process
	NO_CONTENT: 204, // Success, but no content sent back (PUT, POST, DELETE)
	BAD_REQUEST: 400, // Generic client-side error status
	UNAUTHORIZED: 401, // Trying to access private stuff without auth
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_ERROR: 500, // server issue
};
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

export const ticketStatus = Object.freeze({
	NEW: 0,
	REPLY: 1,
	PRIORITY: 2,
	//todo: add more
});
