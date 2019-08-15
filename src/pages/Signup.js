import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../service/auth.js';
import swal from 'sweetalert';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            cpassword: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const { username, password, cpassword } = this.state;
        event.preventDefault()
        if (username === '' || password === '' || cpassword !== password) {
            swal({
                title: "Error",
                text: "Invalid Inputs",
                icon: "error",
                button: "OK",
            });
        } else {
            signup(username, password).then((res) => {
                if (res.status) {
                    window.location.href = '/login';
                } else {
                    swal({
                        title: "Error",
                        text: res.message,
                        icon: "error",
                        button: "OK",
                    });
                }
            })
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="myform">
                    <h2 className="text-center mb-4">User Signup</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} ></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} ></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" name="cpassword" value={this.state.cpassword} onChange={this.handleChange} ></input>
                    </div>
                    <div className="form-group text-center">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
                    </div>
                    <div className="form-group mt-5">
                        <p>If you have an account already, please <Link to="/login">login</Link> now.</p>
                    </div>
                    <div className="form-group mt-5">
                        <p>Go to <Link to="/">home</Link>.</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Signup;