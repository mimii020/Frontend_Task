import React from 'react'

function InputField({filter, setFilter}) {
  return (
    <span className='w-full mb-5 flex flex-row justify-center'>
        Search:
        <input className="rounded-full outline-none ml-5  border border-gray-400 w-1/2 focus:border-purple-500 hover:border-purple-400 pl-6 py-2 placeholder:text-gray-400"
         value={filter || ''}
         onChange={e => setFilter(e.target.value)}
         placeholder='Enter Search Here'
         />
    </span>
  )
}

export default InputField