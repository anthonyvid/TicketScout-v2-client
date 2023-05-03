import { setLogin } from "reducers/auth/index.js";
import { createNotification } from "./notification.js";
import { isEqual, pickBy } from "lodash";

export function isNumber(char) {
	return /^\d$/.test(char);
}

export const isEmail = (email) => {
	return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const getCached = (name) => {
	const cache = JSON.parse(localStorage.getItem("persist:root"));
	if (!cache) return null;

	const authReducer = JSON.parse(cache.authReducer);
	const resourceReducer = JSON.parse(cache.resourceReducer);
	const modalReducer = JSON.parse(cache.modalReducer);

	if (!authReducer || !resourceReducer) return null;

	if (cache)
		return { ...authReducer, ...resourceReducer, ...modalReducer }[name];
	return null;
};

export const getCurrentDate = () => {
	let newDate = new Date();
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	// let year = newDate.getFullYear();

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return `${date} ${months[month - 1]}`;
};

export const formatName = (firstname = " ", lastname = " ") => {
	return `${firstname[0].toUpperCase()}${firstname.substring(
		1
	)} ${lastname[0].toUpperCase()}${lastname.substring(1)}`;
};

export const stringToColor = (string) => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

export const stringAvatar = (name) => {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0].toUpperCase()}${name
			.split(" ")[1][0]
			.toUpperCase()}`,
	};
};

export const addSortAndFilters = (sort, filter) => {
	let url = "";

	if (sort) {
		if (
			typeof sort === "object" &&
			Object.keys(sort).length > 0 &&
			Object.values(sort).every((key) => key === "asc" || key === "desc")
		) {
			url += `&sort=${encodeURIComponent(JSON.stringify(sort))}`;
		} else {
			throw new Error("Invalid sort fields");
		}
	}

	if (filter) {
		if (typeof filter === "object" && Object.keys(filter).length > 0) {
			url += `&filter=${encodeURIComponent(JSON.stringify(filter))}`;
		} else {
			throw new Error("Invalid filter object");
		}
	}
	return url;
};

export const logout = (dispatch, navigate) => {
	dispatch(
		setLogin({
			user: null,
			token: null,
		})
	);
	navigate("account/login");
};

export const formatPhone = (phone) => {
	const cleaned = ("" + phone).replace(/\D/g, "");
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) return "(" + match[1] + ") " + match[2] + "-" + match[3];
	return null;
};

export const handleError = (error) => {
	const errMsg = error.response.data.message || error.response.statusText;
	console.error(errMsg);
	createNotification("error", errMsg);
};

export const deepDiff = (oldObject, newObject) => {
	return {
		old: pickBy(oldObject, (value, key) => {
			return !isEqual(value, newObject[key]);
		}),
		new: pickBy(newObject, (value, key) => {
			return !isEqual(oldObject[key], value);
		}),
	};
};
