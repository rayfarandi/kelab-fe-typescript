import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe untuk state
interface AuthState {
    token: string | null;
}

// Initial state dengan tipe yang sesuai
const initialState: AuthState = {
    token: null,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action untuk login, dengan payload berupa string (token)
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        // Action untuk logout, mengembalikan state ke initialState
        logout: () => {
            return initialState;
        },
    },
});

// Export actions
export const { login, logout } = auth.actions;

// Export reducer
export default auth.reducer;
