import { getRequest } from "config/axiosConfig.js";

export const getPayments = async () => {
	try {
		const response = await getRequest("payments");
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getPaymentById = async (id) => {
	try {
		const response = await getRequest(`payments/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};
