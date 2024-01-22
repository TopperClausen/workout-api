import { configureStore } from "@reduxjs/toolkit";
import sessionStore from "./sessionStore";

const store = configureStore({
    reducer: {
        session: sessionStore
    }
});

export default store;
