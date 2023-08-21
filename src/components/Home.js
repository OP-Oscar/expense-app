import {useContext} from 'react'
import { Button } from 'flowbite-react';

import AuthContext from '../store/authContext'
import homeGif from '../assets/saving.gif'
import Graphs from './Graphs'
import Balance from './Balance'
import {Card} from "flowbite-react";

import styles from './Home.module.css'

const Home = () => {
    const authCtx = useContext(AuthContext)


    return authCtx.token ? (
        <main>
            <div>
            <Card>
            <h1 className={styles.balance_title}>Balance</h1>
            <h3>
            <Balance/>
            </h3>
            </Card>
            </div>
            <p> </p>
            <br />
            <Card>
            <h1 className={styles.chart_title}>Expenses By Category</h1>
            <Graphs/>
            </Card>
        </main>
    ) :
         (
        <main>
            <h1 style={{padding: "40px"}}>Balance your spending</h1>
            <img className={styles.img_home} src={homeGif} alt="" />
            <br />
            <p className={styles.description}> Introducing our Expense Tracker, your ultimate financial companion for maintaining a healthy budget. This user-friendly app empowers you to effortlessly track your expenses and income in one central hub. By recording your spending habits and sources of income, you gain a clear overview of your financial landscape. Visualize your expenditures through interactive charts and graphs, enabling you to identify trends, set realistic budgets, and work towards your financial goals. Whether you're an individual, a family, or a business, our Expense Tracker equips you with the tools to make informed financial decisions and achieve balance in your budget. Take control of your financial journey today with our intuitive Expense Tracker app. </p>
        </main>
    )
}

export default Home