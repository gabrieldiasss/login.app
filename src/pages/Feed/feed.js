import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './feed.css'

import { useHistory } from 'react-router-dom'

function Feed() {

    const [response, setResponse] = useState("")
    const [ loading, setLoading ] = useState(true)

    let history = useHistory()

    useEffect(() => {
        axios.get("https://login-api-gabriel.herokuapp.com/project", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        .then((response) => {
            setResponse(response.data)
            setLoading(false)
        })

    }, [])

    function handleLogout() {

        localStorage.removeItem("accessToken")
        axios.defaults.headers.Authorization = undefined
        history.push("/login")

    }

    if(loading) {
        return (
            <div className="loading" >
                <div class="loadingio-spinner-bean-eater-rv7xwwkwm3r"><div class="ldio-52eaq43k80o">
                <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
                </div></div>
            </div>
        )
         
    }

    return(
        <div className="feed" >
            <header>
                <div className="container">
                    <h1>login.app</h1>
                    <h2 onClick={handleLogout}>Sair</h2>
                </div>
            </header>

            <main>
                <h1>{response}</h1>
            </main>
        </div> 
    )
}

export default Feed