import React from "react";
import { CSSTransition } from "react-transition-group";
import "./StatusBanner.scss";

type Props = {
    mounted: boolean,
    success: boolean
}

const SuccessBanner = (props: Props) => {
    const hideClass = props.mounted ? "movedown" : null;
    const bannerTypeClass = props.success ? "alert-success" : "alert-danger";

    const getBannerMessage = (): string => {
            if(props.success) {
                return "Success!";
            }
            return "Something went wrong!";
        }

    return (
        <CSSTransition in={props.mounted} timeout={1000} classNames="fade">
            <div className={`alert ${bannerTypeClass} ${hideClass}`} role="alert">
                {getBannerMessage()}
            </div>
        </CSSTransition>
    );
}

export default SuccessBanner;