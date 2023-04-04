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
