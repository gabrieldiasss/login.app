import React from 'react'

import { Redirect, Route } from 'react-router-dom'

function PrivateLogin(props) {
    const isLogged = localStorage.getItem("accessToken")
    return isLogged ? <Redirect to="/" /> : <Route {...props} />
}

export default PrivateLogin