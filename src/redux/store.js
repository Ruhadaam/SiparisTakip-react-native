import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import orderSlice from './orderSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    data: dataSlice,
    orders:orderSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
});

export default store;
