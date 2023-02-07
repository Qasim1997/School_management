import { configureStore } from '@reduxjs/toolkit';
import { userAuthApi } from '../services/userAuthApi';
import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer
    },
    // middleware is also created for us, which will allow us to take advantage of caching, invalidation, polling, and the other features of RTK Query.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthApi.middleware)
});
// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch);
