import { getRequest, postRequest } from "config/axiosConfig.js";

export const getPayments = async (options) => {
	const { page, limit } = options;
	try {
		const response = await getRequest(
			`payments?page=${page}&limit=${limit}`
		);
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

export const createPayment = async (options) => {
	try {
		const response = await postRequest(`payments`, options);
		return response;
	} catch (error) {
		return error.response;
	}
};
