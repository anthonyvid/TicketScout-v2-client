import { getRequest, postRequest } from "config/axiosConfig.js";

export const getCustomers = async (options) => {
	const { page, limit } = options;
	try {
		const response = await getRequest(
			`customers?page=${page}&limit=${limit}`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getCustomerById = async (id) => {
	try {
		const response = await getRequest(`customers/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};


export const createCustomer = async (options) => {
	try {
		const response = await postRequest(`customers`, options);
		return response;
	} catch (error) {
		return error.response;
	}
};