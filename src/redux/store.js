import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/user/userSlice';
import { api } from './Api/api';
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    requestCallback:requestCallbackReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
