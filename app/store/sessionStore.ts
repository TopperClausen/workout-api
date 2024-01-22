import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    jwt: ""
}

const slice = createSlice({
    name: 'sessionStore',
    initialState,
    reducers: {
        setJwt: (state, action) => {
            state.jwt = action.payload
        },
        clearSession: (state) => {
            state = initialState
        }
    }
});

export type SessionState = ReturnType<typeof slice.reducer>;
export const { setJwt, clearSession } = slice.actions;
export default slice.reducer;
