import React, {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import styles from './Graphs.module.css'

function Graphs()  {
  // const [userExpenses, setUserExpenses] = useState([])
  const [barChart, setBarChart] = useState([])
  const {userId, token } = useContext(AuthContext);
  const url = "http://localhost:5050";

  const onlyCategories = (x)=>{
      const categoryCount = {};
      for (const item of x){
        const categoryName = item.category_name;
        categoryCount[categoryName] = (categoryCount[categoryName] || 0)+1;
      }
      setBarChart(categoryCount)
  }
  const getUserExpenses = useCallback(() => {
    axios.get(`${url}/getAllExpenseWithCat/${userId}`, { headers: {authorization: token}})
        .then(res =>{
        onlyCategories(res.data)
        console.log(`Successfully obtained user expense`)})
        .catch(err => console.log(err))
}, [userId, token])

useEffect(() => {
  getUserExpenses()
}, [getUserExpenses])

  const data = {
    labels: Object.keys(barChart),
    datasets: [
      {
        label: 'Count',
        data: Object.values(barChart),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
  <div className={styles.graph_div}>
  <Bar data={data} options={options} />
  </div>
  )
};

export default Graphs;
