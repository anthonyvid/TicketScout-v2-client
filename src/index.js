import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing, Integrations } from "@sentry/tracing";

import "./index.css";
import App from "./App";
import authReducer from "./reducers/auth/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	integrations: [
		new Integrations.BrowserTracing(),
		new Sentry.Integrations.Breadcrumbs({
			console: false,
		}),
	],
	tracesSampleRate: 1.0, //lower the value in production
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
