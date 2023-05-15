import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {DataType} from '@/types/types'
export const fetchData = createAsyncThunk<DataType[], string>(
  'data/fetchData',
  async (url) => {
    const response = await axios.get<DataType[]>(url)
    console.log(response.data)
    return response.data
  }
)