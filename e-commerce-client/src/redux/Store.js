import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import allPopupMessages from "./allPopupMessages";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'store',
    version: 2,
    storage,
  }
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  popupMessage: allPopupMessages
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
  

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    
});

export let persistor = persistStore(store)
