//setup to manage and remember user info
import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/user";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import user from "../slices/user";

const reducers = combineReducers({
    user: userReducers
});

//like a memory box
const persistConfig = {
    key: "user",
    storage,
};

// manage user info and remembers even after you restart the app
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

