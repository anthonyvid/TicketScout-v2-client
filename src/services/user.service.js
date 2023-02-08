import { postRequest } from "config/axiosConfig.js";

import { isEmpty } from "lodash";

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
	if (isEmpty(code)) throw Error("Please try again.");

	try {
		const response = await postRequest("auth/register/verifySignUpCode", {
			code,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};

export const isUniqueEmail = async (email) => {
	try {
		const response = await postRequest(`users/checkUnique?email=${email}`);
		return response;
	} catch (error) {
		return error.response;
	}
};
