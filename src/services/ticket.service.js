import { getRequest, postRequest } from "config/axiosConfig.js";

export const getTickets = async (options) => {
	const { page, limit } = options;
	try {
		const response = await getRequest(
			`tickets?page=${page}&limit=${limit}`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getTicketById = async (id) => {
	try {
		const response = await getRequest(`tickets/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const createTicket = async (options) => {
	try {
		const response = await postRequest(`tickets`, options);
		return response;
	} catch (error) {
		return error.response;
	}
};
