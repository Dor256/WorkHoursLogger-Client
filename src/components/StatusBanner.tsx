import React from "react";
import "./StatusBanner.scss";

export type BootstrapAlertClass = 'alert-success' | 'alert-danger';

export type BannerMessage = {
    message: string;
    type: BootstrapAlertClass;
}

type StatusBannerProps = {
    bannerMessage?: BannerMessage;
}

type StatusBannerState = {
    visible: string;
    tempBannerMessage?: BannerMessage;
}

export class StatusBanner extends React.Component<StatusBannerProps, StatusBannerState> {
    state: StatusBannerState = {
        visible: ""
    }

    hideBanner = () => {
        this.setState({
            visible: "hidden",
            tempBannerMessage: this.props.bannerMessage
        });
        setTimeout(() => {
            this.setState({
                tempBannerMessage: undefined,
                visible: ""
            });
        }, 1000);
    }

    UNSAFE_componentWillReceiveProps(nextProps: StatusBannerProps) {
        if (!nextProps.bannerMessage) {
            this.hideBanner();
        } else if (nextProps.bannerMessage) {
            this.setState({
                visible: "visible"
            });
        }
    }

    render () {
        const {visible, tempBannerMessage} = this.state;
        const {message='', type=''} = this.props.bannerMessage || tempBannerMessage || {};
 
        return (
            <div className={`alert ${type} ${visible}`} role="alert">
                {message}
            </div>
        );
    }
}
