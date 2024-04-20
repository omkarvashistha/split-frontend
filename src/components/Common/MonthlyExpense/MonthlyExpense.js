import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './MonthlyExpense.css';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Ticks, layouts } from 'chart.js/auto';

const MonthlyExpenses = ({  }) => {
    const data = [
        {
          "month": "January",
          "totalAmount": 20000
        },
        {
          "month": "February",
          "totalAmount": 1500
        },
        {
          "month": "March",
          "totalAmount": 30000
        },
        {
          "month": "April",
          "totalAmount": 2500
        },
        {
          "month": "May",
          "totalAmount": 22000
        },
        {
          "month": "June",
          "totalAmount": 19000
        },
        {
          "month": "July",
          "totalAmount": 1900
        },
        {
          "month": "August",
          "totalAmount": 20000
        }
      ]
      
  // Prepare the data for the Bar chart
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Total Amount Spent',
        data: data.map(item => item.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        offset : -20,
        formatter: (value, ctx) => {
          return value.toLocaleString(); // Formatted to include commas for thousands.
        },
        color: '#444',
        font: {
          weight: 'bold',
          size: 12
        },
      }
    },
    scales: {
      y: {
        display : true,
        ticks : {
            display : false
        }
      },
    },
  };

  return (
    <div className='monthly-chart'>
      <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
    </div>
  );
}

export default MonthlyExpenses;
