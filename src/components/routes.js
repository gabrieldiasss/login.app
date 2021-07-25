import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Login from '../pages/Login/login'
import Feed from '../pages/Feed/feed'
import Register from '../pages/Register/register'

import Private from './private'
import PrivateLogin from './privateLogin'
import PrivateRegister from './privateRegister'

function Routes() {
    return(
        <Router>
            <Switch>
                <PrivateLogin exact path="/login" component={Login} />
                <Private exact path="/" component={Feed} />
                <PrivateRegister exact path="/register" component={Register} />
            </Switch>
        </Router>
    )
    
}

export default Routes