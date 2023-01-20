import { postRequest } from "config/axiosConfig.js";
import { statusCodes } from "constants/statusCodes.constants.js";
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
