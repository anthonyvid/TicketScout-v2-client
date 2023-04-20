const { useSelector } = require("react-redux");

export const useHasRoles = (roleNames) => {
	const { user } = useSelector((state) => state.authReducer);
	const role = user.permission;

	const isArray = Array.isArray(roleNames);

	if (!isArray) {
		return role == roleNames;
	} else if (isArray) {
		return false;
	}
	return false;
};
