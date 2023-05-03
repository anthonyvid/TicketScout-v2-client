import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Routes from "./routes.js";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { handleError } from "utils/helper.js";
import SnackbarProvider from "context/SnackbarContext.js";
import Modal from "components/Modal.jsx";
import useShortcuts from "hooks/useShortcut.js";

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
	useShortcuts();

	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider>
						<ToastContainer />
						<CssBaseline />
						<Modal />
						<Routes />
					</SnackbarProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
