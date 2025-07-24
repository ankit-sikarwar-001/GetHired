import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice"
const Store = configureStore({
    reducer: {
        auth : authSlice,
        jobs: jobSlice,
    }
});
export default Store;