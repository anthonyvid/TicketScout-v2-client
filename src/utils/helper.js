export function isNumber(char) {
	return /^\d$/.test(char);
}

export const isEmail = (email) => {
	return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const getCached = (name) => {
	const cache = JSON.parse(localStorage.getItem("persist:root"));
	if (cache) return JSON.parse(cache[name]);
	return null;
};
