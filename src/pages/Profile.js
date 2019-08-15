import React, { Component } from 'react';
import { getAuth, getUserData } from '../service/auth.js';
import defaultAvatar from '../assets/avatar.jpg';
import Header from '../pages/Header.js';
import axios from 'axios';
import environment from '../global.js';
import swal from 'sweetalert';
import queryString from 'query-string'

class Profile extends Component {
    constructor(props) {
        super(props);
        const values = queryString.parse(this.props.location.search)
        let userID = values.userID;
        let username = values.username;
        this.state = {
            amount: 0,
            userID: userID,
            username: username,
            avatar: '',
            description: '',
            selectedFile: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.fileChangeHandleer = this.fileChangeHandleer.bind(this);
    }

    componentDidMount() {
        let authUser = getAuth();
        if (authUser.token === '' || authUser.token === null) {
            this.props.history.push(`/login`)
        } else {
            getUserData(this.state.userID).then((res) => {
                let { username, amount, description, avatar } = res;
                this.setState({ username, amount, description, avatar });
            })

        }
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    fileChangeHandleer(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                avatar: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    onUpdate(event) {
        event.preventDefault();
        let { amount, userID, description } = this.state;
        const data = new FormData()
        data.append('file', this.state.selectedFile);
        data.append('amount', amount);
        data.append('userID', userID);
        data.append('description', description);
        axios.post(environment.apiUrl + `/updateUserData`, data)
            .then(res => {
                if (res.data.status) {
                    window.location.reload();
                }
            })
    }

    fileInputOpen() {
        document.getElementById('avatar').click();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="form-group">
                            <p>{this.state.username} Profile</p>
                        </div>
                        <div className="form-group">
                            <img src={(this.state.avatar != '') ? `${this.state.avatar}` : defaultAvatar} id="avatar-img" className="profilePhoto" alt="profile photo" title="Update profile Photo" onClick={this.fileInputOpen} />
                            <input type="file" name="avatar" id="avatar" onChange={this.fileChangeHandleer} style={{ 'display': 'none' }}></input>
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input className="form-control" name="amount" value={this.state.amount} onChange={this.changeHandler}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" value={this.state.description} onChange={this.changeHandler}></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.onUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;