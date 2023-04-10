import { setLogin } from "reducers/auth/index.js";

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

	if (!authReducer || !resourceReducer) return null;

	if (cache) return { ...authReducer, ...resourceReducer }[name];
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

export const addSortAndFilters = (sort, filter, order) => {
	let url = "";
	if (sort) {
		if (["createdAt", "updatedAt"].includes(sort)) {
			url += `&sort=${sort}:${order === 1 ? "asc" : "desc"}`;
		} else {
			throw new Error("Invalid field to sort by");
		}
	}

	if (filter) {
		if (
			typeof filter === "object" &&
			Object.keys(filter).length > 0 &&
			Object.keys(filter).every((key) => ["createdAt"].includes(key))
		) {
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
