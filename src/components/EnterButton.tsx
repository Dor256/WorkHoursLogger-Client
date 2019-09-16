import React from "react";
import axios from "axios";

const EnterButton = () => {
    const handleClick = () => {
        axios.post("https://work-logger-app.herokuapp.com/log", {
            dateString: new Date().toString()
        })
    }

    return <button className="button" onClick={handleClick}>Enter</button>;
}

export default EnterButton;