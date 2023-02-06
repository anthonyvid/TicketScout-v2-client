import { postRequest } from "config/axiosConfig.js";

import { isEmpty } from "lodash";

export const createStore = async (data) => {
	if (isEmpty(data)) return new Error("Invalid Entry.");
	console.log(data);
	// try {
	// 	const response = await postRequest(`${data}/createStore`, data);
	// 	return response;
	// } catch (error) {
	// 	return error.response;
	// }
};
