import Table from '@/components/Table'
import {URL_LARGE_DATA, URL_SMALl_DATA} from '@/constants'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useAppDispatch } from '@/store/store';
import {selectData} from '@/store/table/tableSelectors'
import {fetchData} from '@/store/table/tableThunks'
import Loading from "@/components/Loading";

export default function Home() {
  const [url, setUrl] = useState('')
  const data = useSelector(selectData)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (url) {
      dispatch(fetchData(url))
    }
  }, [url])
  const handleSmallDataClick = () => {
    setUrl( URL_SMALl_DATA )
  }
  const handleLargeDataClick = () => {
    setUrl( URL_LARGE_DATA )
  }
  return (
    <main
      className={'flex flex-col items-center justify-center p-2'}
    >
      <div className='flex items-center justify-center gap-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white
           font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSmallDataClick}>Small Data</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white
           font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLargeDataClick}>Large Data</button>
      </div>

      {data.status === 'idle' && <p>Выберите набор данных: маленький или большой</p>}
      {data.status === 'loading' && <Loading/>}
      {data.status === 'succeeded' && <Table/>}

    </main>
  )
}
