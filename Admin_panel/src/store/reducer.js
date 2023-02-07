import { combineReducers } from 'redux';
import { userAuthApi } from 'services/userAuthApi';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

// const reducer = combineReducers({
//     customization: customizationReducer,
//     [userAuthApi.reducerPath]: userAuthApi.reducer,

// })

// export default reducer;
export const store = configureStore({
    reducer: {
        customization: customizationReducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer
    },
    // middleware is also created for us, which will allow us to take advantage of caching, invalidation, polling, and the other features of RTK Query.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthApi.middleware)
});
// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch);
