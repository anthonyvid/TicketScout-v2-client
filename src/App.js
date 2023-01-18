import { Suspense } from "react";
import Routes from "./routes.js";

function App() {
	return (
		<Suspense fallback={""} className="App">
			<Routes />
		</Suspense>
	);
}

export default App;
