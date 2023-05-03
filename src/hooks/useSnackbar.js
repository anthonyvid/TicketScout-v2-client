import { SnackbarContext } from "context/SnackbarContext.js";
import { useContext } from "react";

const useSnackbar = () => {
	const { handleSnackbar } = useContext(SnackbarContext);
	return handleSnackbar;
};

export default useSnackbar;
