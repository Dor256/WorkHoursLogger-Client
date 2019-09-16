import React from "react";
import axios from "axios";

const SendLogButton = () => {
    const handleClick = () => {
        axios.get("https://work-logger-app.herokuapp.com/log", {
            params: {
                dateString: new Date().toString()
            }
        })
    }

    return <button className="button" onClick={handleClick}>Send Log</button>
}

export default SendLogButton;