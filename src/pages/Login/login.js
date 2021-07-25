import React, { useState } from 'react'
import './login.css'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'

import Logo from '../../images/adc-logo.svg'
import Padlock from '../../images/img-padlock.svg'
import Mail from '../../images/mail.svg'

function Login() {

    const [invalid, setInvalid] = useState()
    const [loading, setLoading] = useState(false) // qualquer coisa muda pra true

    const [backendInvalid, setBackendInvalid] = useState()
    const [show, setShow] = useState(true)

    let history = useHistory()

    const { register, handleSubmit } = useForm()

    const onSubmit = values =>
        axios.post("https://login-api-gabriel.herokuapp.com/auth/authenticate", values)
        .then((response) => {

        const { data: { token } } = response
        
        if(response.data) {

            localStorage.setItem("accessToken", token )
            axios.defaults.headers.Authorization = `Bearer ${token}`
            history.push("/")
        }

        setLoading(false)

    }).catch((err) => {

        if(!err.response.data.error) {
           
            setBackendInvalid(err.response.data.errInvalid.message)
            setShow(false)
           
        } else {
            setInvalid(err.response.data.error)
            setShow(true)
        }

        setLoading(false)

    })

    function handleLoading() {
        setLoading(true)
    }

    return(
        <div className="login">

                <div className="card">
                    <img className="logo-adc" src={Logo} />
                    <h1>Entrar</h1>
                    <div className="card-body">

                        <form onSubmit={handleSubmit(onSubmit)} >
                            
                            <div className="fields" >
                                <div className="input-fake" >
                                    <img src={Mail} />
                                    <input type="text" name="email" placeholder="Email" autoComplete="off" {...register("email")} />
                                </div>
                                
                            </div>
                            
                            <div className="fields-1" >
                                <div className="input-fake" >
                                    <img src={Padlock} />
                                    <input type="password" name="password" placeholder="Senha" autoComplete="off" {...register("password")} />
                                </div>

                                <p className="error-message">{ !show && backendInvalid }</p>
                                <p className="error-message" >{ show && invalid }</p>
                            
                            </div>

                            <p className="message-register">Você não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                                
                            <button onClick={handleLoading} > 
                            { loading && <div class="loadingio-spinner-rolling-yi8phtw2ml"><div class="ldio-zbpv5ybpu8e">
                            <div></div>
                            </div></div>}

                            { !loading && <span>Logar</span> }
                            </button>
                        </form>

                    </div>

                </div>
                
        </div>
    )
}

export default Login