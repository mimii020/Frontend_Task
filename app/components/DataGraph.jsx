"use client"

import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(
    Tooltip, Legend,
    ArcElement
)

function DataGraph({ data }) {
    const commentsByPost = data.reduce((acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});
    const countsArray = Object.keys(commentsByPost).map((postId) => ({
        postId,
        count: commentsByPost[postId],
    }));

    console.log(countsArray[0])

    countsArray.sort((a, b) => b.count - a.count);
    const top5 = countsArray.slice(0, 5);
    const chartData = {
        labels: top5.map((post) => `Post ${post.postId}`),
        datasets: [
            {
                label: 'Number of comments per post',
                data:  top5.map((post) => post.count), 
                backgroundColor: [
                    '#FFD8BE',
                    '#A3E7FC',
                    '#B5EAD7',
                    '#FFB7B2',
                    '#E1D5E7'
                ],
              
            },
        ],
    };

    const options = {
        responsive: true,
    };
  return (
    <div className='mt-10 flex flex-col w-1/2 bg-white rounded-3xl p-10 items-center'>
        <h1 className='text-2xl'>Data Chart</h1>
        <Doughnut className='m-auto'
            data = {chartData}
            height = {400}
            options = {options}
        />
            
    </div>
  )
}

export default DataGraph