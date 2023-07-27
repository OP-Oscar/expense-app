import {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext'
import homeGif from '../assets/saving.gif'

import styles from './Home.module.css'

const Home = () => {
    const {userId} = useContext(AuthContext)
    const authCtx = useContext(AuthContext)
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5050/category')
        .then(res => {
                console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [userId])

    const mappedPosts = posts.map(post => {
        return (
            <div key={post.id} className='post-card'>
                <h2>{post.title}</h2>
                <h4>{post.user.username}</h4>
                <p>{post.content}</p>
            </div>
        )
    })

    return authCtx.token ? (
        <main>
            <h1>ah, you are back...nice</h1>
        </main>
    ) :
         (
        <main>
            <h1 style={{padding: "40px"}}>Balance your spending</h1>
            <img src={homeGif} alt="" />
        </main>
    )
}

export default Home