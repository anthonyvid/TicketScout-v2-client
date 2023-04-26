import { deleteRequest } from "config/axiosConfig.js";
import { getRequest, postRequest } from "config/axiosConfig.js";
import { addSortAndFilters } from "utils/helper.js";

export const getTickets = async (options) => {
	const { page, limit, sort, filter } = options;

	let url = `tickets?page=${page}&limit=${limit}`;
	url += addSortAndFilters(sort, filter);
	const response = await getRequest(url);
	return response;
};

export const getTicketById = async (id) => {
	try {
		const response = await getRequest(`tickets/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getWeeklyTicketCount = async (options) => {
	const { page, limit, sort, filter } = options;
	let url = `tickets/week-count?page=${page}&limit=${limit}`;
	url += addSortAndFilters(sort, filter);

	try {
		const response = await getRequest(url);
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

export const deleteTicket = async (id) => {
	let url = `tickets/${id}`;

	try {
		const response = await deleteRequest(url);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const deleteTickets = async (ids) => {
	let url = `tickets?ids=${JSON.stringify(ids)}`;

	try {
		const response = await deleteRequest(url);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const updateTicket = async (id, data) => {
	let url = `tickets/${id}`;

	try {
		const response = await postRequest(url, data);
		return response;
	} catch (error) {
		return error.response;
	}
};
