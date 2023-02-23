export const reducer = (state, action) => {
	if (action) {
		const type = Object.keys(action)[0];
		const value = Object.values(action)[0];
		if (state[type]) {
			return { ...state, [type]: value };
		}
	}
	return state;
};
