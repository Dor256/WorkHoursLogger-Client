import React from "react";
import "./GoogleAuth.scss";

const GoogleAuth = () => {

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    return (
        <button className="btn btn-primary button" onClick={handleSignIn}>
            Log In
        </button>
    );
}

export default GoogleAuth;