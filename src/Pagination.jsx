import React,{useState} from 'react'
import { useSignal } from "@preact/signals-react"
import {usePagination} from './customHooks/usePagination'
const Pagination = () => {
  const [pages, setPages] = useState(1);
  const [counts, setCounts] = useState(2)
  const count = useSignal(0);
  const { users, isLoading, isError } = usePagination(pages, counts);

  return (
    <div className='w-full bg-gray-300 h-screen'>
      <h1  className='text-black pt-10 text-center font-bold text-xl'>WELCOME TO MY APP</h1>
      <div className='w-full flex justify-center items-center'>
        <div className='w-5/6 md:w-2/5 flex justify-center items-center rounded-xl bg-white p-1 mt-10'>
        <input type="text" onChange={(e) => count.value = e.target.value}  className='w-full outline-none' placeholder='Search you want to search' />
        </div>
      </div>
        <div className='flex justify-center mt-10'>
          <ul>
            {isLoading ? (<p>loading</p>) : users?.data.map((item) => {
              return <li>{item.email}</li>
            })}
          </ul>
        </div>
        <div className='w-full flex items-center mt-10'>
          <button onClick={() => {
            setPages(prev => prev -= 1)
          }} className='bg-slate-600 w-10 h-10 p-9 flex justify-center items-center rounded-lg text-white mr-4'>Prev</button>
          <button onClick={() => {
            setPages(prev => prev += 1);
          }} className='bg-slate-600 w-10 h-10 p-9 flex justify-center items-center rounded-lg text-white '>Next</button>
        </div>
    </div>
  )
}

export default Pagination