import { getRequest, postRequest } from "config/axiosConfig.js";

import { isEmpty } from "lodash";
import { addSortAndFilters } from "utils/helper.js";

export const createOrganization = async (data) => {
	if (isEmpty(data)) return new Error("Invalid Entry.");

	try {
		const response = await postRequest("organizations", data);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getOrganizations = async (options) => {
	const { page, limit, sort, filter, order } = options;

	let url = `organizations?page=${page}&limit=${limit}`;
	url += addSortAndFilters(sort, filter, order);

	try {
		const response = await getRequest(url);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getOrganizationById = async (id) => {
	try {
		const response = await getRequest(`organizations/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};
