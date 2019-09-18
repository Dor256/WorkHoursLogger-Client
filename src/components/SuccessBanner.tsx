import React from "react";
import { CSSTransition } from "react-transition-group";
import "./SuccessBanner.scss";

type Props = {
    mounted: boolean,
    success: boolean
}

const SuccessBanner = (props: Props) => {
    const hideClass = props.mounted ? "movedown" : null;
    const bannerTypeClass = props.success ? "alert-success" : "alert-danger";

    return (
        <CSSTransition in={props.mounted} timeout={1000} classNames="fade">
            <div className={`alert ${bannerTypeClass} ${hideClass}`} role="alert">
                Logged Succesfuly!
            </div>
        </CSSTransition>
    );
}

export default SuccessBanner;