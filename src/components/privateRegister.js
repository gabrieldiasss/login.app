import React from 'react'

import { Redirect, Route } from 'react-router-dom'

function PrivateRegister(props) {
    const isLogged = localStorage.getItem("accessToken")
    return isLogged ? <Redirect to="/" /> : <Route {...props} />
}

export default PrivateRegister