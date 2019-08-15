
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import { getAuth, logoutAuth } from '../service/auth.js';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let auth = getAuth();
        if (auth.token) {
            this.setState({ username: auth.username });
        }
    }

    logout() {
        logoutAuth();
        window.location.href = "/";
    }

    render() {
        return (
            <div className="row header">
                <div className="col-6">
                    <Link to="/"><img src={logo} className="myApp-logo" alt="logo" /></Link>
                </div>
                <div className="col-6 text-right">
                    {(this.state.username === '') ? <Link to={{ pathname: '/login' }}>Login</Link> : <a href="#" onClick={this.logout}>{this.state.username} / Logout</a>}
                </div>
            </div>
        )
    }

}

export default Header;