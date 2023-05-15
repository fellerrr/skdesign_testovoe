import { createSlice } from '@reduxjs/toolkit'
import { fetchData } from './tableThunks'
import {DataState} from '@/types/types'

const initialState: DataState = {
  data: [],
  status: 'idle',
}

const dataSlice = createSlice<DataState>({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
    builder.addCase(fetchData.rejected, (state) => {
      state.status = 'failed'
    })
  },
})
export default dataSlice.reducer
export const { addData } = dataSlice.actions;
