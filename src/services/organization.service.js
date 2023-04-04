import { getRequest, postRequest } from "config/axiosConfig.js";

import { isEmpty } from "lodash";

export const createOrganization = async (data) => {
	if (isEmpty(data)) return new Error("Invalid Entry.");

	try {
		const response = await postRequest("organizations", data);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getOrganizations = async () => {
	try {
		const response = await getRequest("organizations");
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
