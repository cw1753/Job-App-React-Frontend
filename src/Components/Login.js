import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
require('dotenv').config();

export default class Login extends Component {
    responseGoogle = (res) =>{
        fetch("/auth/google", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"access_token": res.accessToken})
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error(res.error);
            }
            return res.json();
        }).then( (data) => {
            //Save token and set timer in local Storage
            localStorage.setItem('JWT_TOKEN', data.token);
            localStorage.setItem('JWT_TIMER', new Date().getTime() + 24*60*60*1000);
        }).catch( (err) => {
            console.log("Error: ", err);
        })
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Google Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}