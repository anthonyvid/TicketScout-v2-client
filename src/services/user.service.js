import { postRequest } from "config/axiosConfig.js";

export const resetPassword = async (data) => {
	try {
		const response = await postRequest(`users/reset-password`, { data });
		return response;
	} catch (error) {
		return error.response;
	}
};
