import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const SnackBar = ({ open, severity, message, onClose }) => {
	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
			<Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackBar;
