"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table'
import  COLUMNS  from "./columns"
import InputField from "./InputField"
import './Table.css'


function Table({ comments, loading }) {
    

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => comments, [comments])
    
    const {
         getTableProps, 
         getTableBodyProps, 
         headerGroups, 
         page, 
         nextPage, 
         previousPage,
         canNextPage,
         canPreviousPage,
         prepareRow,
         state,
         setGlobalFilter
        } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 }
        
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter } = state
  return (
    
    <div className='p-10 flex flex-col items-center w-4/5 rounded-3xl bg-white'>
        <InputField filter={globalFilter} setFilter={setGlobalFilter} ></InputField>
        {
            loading? 
            (<div className='loading-animation'></div> )
            : ( <table className="custom-table" {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {   
                            headerGroup.headers.map( column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                                {column.render("Header")}
                            </th> 
                            )

                            )
                        }
                        
                    </tr> 
                    )

                    )
                }
                
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(
                        (row) => {
                            prepareRow(row)
                            return (<tr {...row.getRowProps()} key={row.id}>
                                    {
                                        row.cells.map( (cell) => {
                                            return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render("Cell")}</td>
                                        }

                                        )
                                    }
                                    
                                </tr>)
                        }
                    )
                }
                
            </tbody>
        
        </table> )
        }
        
        <div className='flex flex-row justify-center w-full'>
            <button className='w-1/5 mr-6  rounded-3xl h-10 hover:bg-purple-500 hover:text-white' onClick = {() => previousPage()} disabled = {!canPreviousPage}>Previous</button>
            <button className=' w-1/5 rounded-3xl h-10 hover:bg-purple-500 hover:text-white' onClick = {() => nextPage()} disabled = {!canNextPage}>Next</button>

        </div>
    </div>
  )
}

export default Table