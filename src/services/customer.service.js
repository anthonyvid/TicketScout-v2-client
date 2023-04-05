import { getRequest } from "config/axiosConfig.js";

export const getCustomers = async () => {
	try {
		const response = await getRequest("customers");
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
