import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Routes from "./routes.js";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { handleError } from "utils/helper.js";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 600000,
			onError: (err) => handleError(err),
		},
	},
});

function App() {
	const mode = useSelector((state) => state.authReducer.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<ToastContainer />
					<CssBaseline />
					<Routes />
				</ThemeProvider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
