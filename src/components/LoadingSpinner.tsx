import React from "react";
import "./LoadingSpinner.scss";


const LoadingSpinner = () => {
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default LoadingSpinner;