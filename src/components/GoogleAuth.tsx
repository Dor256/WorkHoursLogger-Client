import React from "react";
import Button from "./basics/Button"
import "./GoogleAuth.scss";

const GoogleAuth = () => {

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    return (
        <Button 
            className="btn btn-primary button" 
            onClick={handleSignIn} 
        >
            Log In
        </Button>
    );
}

export default GoogleAuth;