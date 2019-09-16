import React from "react";
import axios from "axios";

const ExitButton = () => {
    const handleClick = () => {
        axios.put("https://work-logger-app.herokuapp.com/log", {
            dateString: new Date().toString()
        })
    }

    return <button className="button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;