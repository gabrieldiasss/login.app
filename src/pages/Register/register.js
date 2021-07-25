import React, { useState } from 'react'
import './register.css'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'

import Logo from '../../images/adc-logo.svg'
import Padlock from '../../images/img-padlock.svg'
import Mail from '../../images/mail.svg'
import User from '../../images/img-user.svg'

function Login() {

    const [invalid, setInvalid] = useState()
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [backendInvalid, setBackendInvalid] = useState()

    const [ show, setShow ] = useState(true)


    let history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = values => axios.post("https://login-api-gabriel.herokuapp.com/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password
    }).then((response) => {

        const { data: { token } } = response
        
        if(response.data) {

            localStorage.setItem("accessToken", token )
            axios.defaults.headers.Authorization = `Bearer ${token}`
            history.push("/")
        }

        setLoadingRegister(false)

    }).catch((err) => {

        if(!err.response.data.error) {
            setBackendInvalid(err.response.data.errInvalid.message)
            setShow(false)
        } else {
            setInvalid(err.response.data.error)
            setShow(true)
        }

        

        setLoadingRegister(false)

    })

    function handleLoading() {
        setLoadingRegister(true)
    }

    return(
        <div className="login">

                <div className="card">
                    <img className="logo-adc" src={Logo} />
                    <h1>Cadastrar-se</h1>
                    <div className="card-body">

                        <form onSubmit={handleSubmit(onSubmit)} >

                            <div className="fields" >
                                <div className="input-fake" >
                                    <img src={User} />
                                    <input type="text" name="name" placeholder="Nome de usuário" autoComplete="off" {...register("name")} />
                                </div> 
                            </div>
                            
                            <div className="fields" >
                                <div className="input-fake" >
                                    <img src={Mail} />
                                    <input type="text" name="email" placeholder="Email" autoComplete="off" {...register("email")} />
                                </div>

                            </div>
                            
                            <div className="fields-1" >
                                <div className="input-fake" >
                                    <img src={Padlock} />
                                    <input type="password" name="password" placeholder="Criar senha" autoComplete="off" {...register("password")} />
                                </div>
                        
                                
                            </div>

                            <p className="error-message">{ show && invalid}</p>
                            <p className="error-message">{ !show && backendInvalid}</p>

                            <p className="message-register">Você já tem uma conta? <Link to="/login">Entrar</Link></p>
                                
                            <button onClick={handleLoading} >
                                { loadingRegister && <div class="loadingio-spinner-rolling-yi8phtw2ml"><div class="ldio-zbpv5ybpu8e">
                                <div></div>
                                </div></div> }

                                { !loadingRegister && <span>CADASTRAR</span> }
                            </button>
                            
                        </form>

                    </div>
                </div>
            
        </div>
    )
}

export default Login