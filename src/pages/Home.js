import React, { Component } from 'react';
import axios from 'axios';
import environment from '../global.js';
import Header from '../pages/Header.js';
import Circle from '../components/Circle.js';

class Home extends Component {
    state = {
        userlist: [],
        isLoading: true,
        errors: null
    };
    changeHandler = (e) => {
        if (e.target.value !== '') {
            window.location.href = `/profile?userID=` + e.target.value;
        }
    }
    componentDidMount() {
        axios
            .get(environment.apiUrl + "/userlist")
            .then(response =>
                response.data.users.map(user => ({
                    userID: user.userID,
                    username: user.username,
                    amount: user.amount,
                }))
            )
            .then(users => {
                this.setState({
                    userlist: users,
                    isLoading: false
                });
                console.log(users)
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row">
                    <div className="col-12">
                        <select className="form-control" onChange={this.changeHandler}>
                            <option value="" >Select User</option>
                            {
                                this.state.userlist.map(user => {
                                    return (
                                        <option value={user.userID} key={user.userID}>{user.username}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-5 circle-container">
                    <Circle userlist={this.state.userlist} />
                </div>
            </React.Fragment>
        )
    }
}

export default Home;