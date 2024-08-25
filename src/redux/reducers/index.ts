import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";


// Definisikan tipe untuk authConfig
type RootState = ReturnType<typeof reducer>;

const authConfig: PersistConfig<RootState> = {
    key: 'auth',
    storage,
};

// Gabungkan semua reducer
const reducer = combineReducers({
    auth: persistReducer(authConfig, auth),
   
});

export default reducer;
