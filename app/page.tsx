"use client"

import { useState, useEffect } from "react"
import Table from "./components/Table"
import DataGraph from "./components/DataGraph"
import "./Home.css"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const response = await fetch("https://jsonplaceholder.typicode.com/comments")
                    const data = await response.json()
                    
                    setComments(data)
                    console.log(comments)
            
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                  setLoading(false)
                }
            }

            fetchData()
        },  )
  return (
    <div className="p-10 w-screen flex flex-col items-center justify-center">
       <Table comments={comments} loading={loading}/>
       <DataGraph data={comments}/>
    </div>
  );
}
