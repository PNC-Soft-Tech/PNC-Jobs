import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/user/userSlice';
import { api } from './Api/api';
import { createWrapper } from 'next-redux-wrapper';
// ...

const makeStore = () => configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export const wrapper = createWrapper(makeStore)