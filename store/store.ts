// store.ts
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import dataReducer from './table/tableSlice'
import thunk from 'redux-thunk'
import {useDispatch} from "react-redux";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store
