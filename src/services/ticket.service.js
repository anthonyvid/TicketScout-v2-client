import { getRequest } from "config/axiosConfig.js";

export const getTickets = async () => {
	try {
		const response = await getRequest("tickets");
		return response;
	} catch (error) {
		return error.response;
	}
};
