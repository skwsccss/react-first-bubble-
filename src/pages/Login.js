import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../service/auth.js';
import swal from 'sweetalert';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;
        event.preventDefault()
        if (username === '' || password === '') {
            swal({
                title: "Error",
                text: "Please fill out all fields.",
                icon: "error",
                button: "OK",
            });
        }
        login(username, password).then((res) => {
            if (res.status === false) {
                swal({
                    title: "Error",
                    text: res.message,
                    icon: "error",
                    button: "OK",
                });
            } else {
                this.props.history.push(`/`)
            }
        })
    }

    render() {
        return (
            <div className="row">
                <div className="myform">
                    <h2 className="text-center mb-4">User Login</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.username}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password}></input>
                    </div>
                    <div className="form-group text-center">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                    </div>
                    <div className="form-group mt-5">
                        <p>If you dont have account, please <Link to="/signup">Register</Link> now.</p>
                    </div>
                    <div className="form-group mt-5">
                        <p>Go to <Link to="/">home</Link>.</p>
                    </div>

                </div>
            </div>

        )
    }
}

export default Login;