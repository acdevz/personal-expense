import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API requests
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Timeline = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const response = await axios.get('http://localhost:8888/api/transactions');
          console.log('API Response:', response);
      
          const transactions = response.data.transactions;
          if (!transactions || transactions.length === 0) {
            console.log('No transactions found.');
            setChartData({
              labels: ['No Data'],
              datasets: [
                {
                  label: 'Transactions Amount',
                  data: [0],
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: true,
                },
              ],
            });
            return;
          }
      
          setTransactions(transactions);
      
          const chartOverview = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const month = date.getMonth();
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month] += transaction.amount;
            return acc;
          }, {});
      
          const chartMonths = Object.keys(chartOverview).map((month) => `Month ${parseInt(month) + 1}`);
          const chartAmounts = Object.values(chartOverview);
      
          if (chartMonths.length && chartAmounts.length) {
            setChartData({
              labels: chartMonths,
              datasets: [
                {
                  label: 'Transactions Amount',
                  data: chartAmounts,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                },
              ],
            });
          } else {
            console.error('Invalid chart data.');
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }      
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h2>Timeline</h2>
        {/* <Line data={chartData} /> */}
      </div>

      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort transactions by date
            .map((transaction) => (
              <li key={transaction.id}>
                <div>{new Date(transaction.date).toLocaleDateString()}</div>
                <div>{transaction.icon} {transaction.name} - {transaction.wallet} - {transaction.note}</div>
                <div>{transaction.amount}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
