import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import {thunk} from "redux-thunk";
import reducer from "./reducers"; // Ganti `reducer` menjadi `rootReducer` untuk lebih konsisten

// Konfigurasi store dengan TypeScript
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Persistance Store
export const persistor = persistStore(store);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
