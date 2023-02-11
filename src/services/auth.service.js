import { postRequest } from "config/axiosConfig.js";
import { isEmpty } from "lodash";
import { getCached } from "utils/helper.js";

export const login = async (credentials) => {
	if (isEmpty(credentials)) return new Error("Invalid Entry.");

	try {
		const response = await postRequest("auth/login", credentials);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const register = async (data) => {
	if (isEmpty(data)) return new Error("Invalid Entry.");

	try {
		const response = await postRequest("auth/register", data);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const verifySignUpCode = async (code) => {
	if (isEmpty(code)) throw Error("Invalid code, please try again.");

	try {
		const response = await postRequest(
			"auth/register/verify-sign-up-code",
			{
				code,
			}
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const isUniqueEmail = async (email) => {
	try {
		const response = await postRequest(
			`auth/register/check-unique-email?email=${email}`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const isUniqueStoreName = async (storeName) => {
	try {
		const response = await postRequest(
			`auth/register/check-unique-store-name?storeName=${storeName}`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const forgotPassword = async (email) => {
	try {
		const response = await postRequest(`auth/forgot-password`, { email });
		return response;
	} catch (error) {
		return error.response;
	}
};

export const isAuthenticated = async (data) => {
	try {
		const response = await postRequest(`auth/authenticate-user`, data);
		return response;
	} catch (error) {
		return error.response;
	}
};
