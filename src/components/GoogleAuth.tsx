import React from "react";
import clientId  from "../api/OAuth";
import "./GoogleAuth.scss";

//TODO: Finish implementing Google OAuth2 for Client side

class GoogleAuth extends React.Component {

    handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        return (
            <div id="auth-button" onClick={this.handleSignIn}>
                <img id="auth-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/>
                <span id="auth-text">Log In With TechSee User</span>
            </div>
        );
    } 
}

export default GoogleAuth;