import axios from "axios";
import { getCached } from "utils/helper.js";
const axiosClient = axios.create();

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
	return axiosClient
		.get(`/api/${URL}`, {
			headers: {
				Authorization: `Bearer ${getCached("token") || ""}`,
				"Content-Type": "application/json",
				Accept: "application/json",
				organizationId: getCached("organization")._id,
			},
		})
		.then((response) => response);
}

export function postRequest(URL, payload) {
	return axiosClient
		.post(`/api/${URL}`, payload, {
			headers: {
				Authorization: `Bearer ${getCached("token") || ""}`,
				"Content-Type": "application/json",
				Accept: "application/json",
				organizationId: getCached("organization")._id,
			},
		})
		.then((response) => response);
}

export function patchRequest(URL, payload) {
	return axiosClient
		.patch(`/api/${URL}`, payload, {
			headers: {
				Authorization: `Bearer ${getCached("token") || ""}`,
				"Content-Type": "application/json",
				Accept: "application/json",
				organizationId: getCached("organization")._id,
			},
		})
		.then((response) => response);
}

export function deleteRequest(URL) {
	return axiosClient
		.delete(`/api/${URL}`, {
			headers: {
				Authorization: `Bearer ${getCached("token") || ""}`,
				"Content-Type": "application/json",
				Accept: "application/json",
				organizationId: getCached("organization")._id,
			},
		})
		.then((response) => response);
}
