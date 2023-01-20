import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
	return axiosClient.get(`/api/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
	return axiosClient
		.post(`/api/${URL}`, payload)
		.then((response) => response);
}

export function patchRequest(URL, payload) {
	return axiosClient
		.patch(`/api/${URL}`, payload)
		.then((response) => response);
}

export function deleteRequest(URL) {
	return axiosClient.delete(`/api/${URL}`).then((response) => response);
}
