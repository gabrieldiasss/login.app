import React from 'react'

import { Redirect, Route } from 'react-router-dom'

function Private(props) {
    const isLogged = !!localStorage.getItem("accessToken")
    return isLogged ? <Route {...props} /> : <Redirect to="/login" />
}

export default Private