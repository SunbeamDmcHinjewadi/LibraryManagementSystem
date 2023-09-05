import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // Import combineReducers if not already imported
import authReducer from './features/authSlice'; // Import your authSlice reducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if any
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


export default store;
