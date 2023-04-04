import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Routes from "./routes.js";
import { ToastContainer } from "react-toastify";

function App() {
	const mode = useSelector((state) => state.authReducer.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ToastContainer />
				<CssBaseline />
				<Routes />
			</ThemeProvider>
		</div>
	);
}

export default App;
