import { getRequest, postRequest } from "config/axiosConfig.js";
import { addSortAndFilters } from "utils/helper.js";

export const getCustomers = async (options) => {
	const { page, limit, sort, filter } = options;

	let url = `customers?page=${page}&limit=${limit}`;
	url += addSortAndFilters(sort, filter);

	try {
		const response = await getRequest(url);
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
