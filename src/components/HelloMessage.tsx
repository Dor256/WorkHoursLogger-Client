import React from "react";
import Header from "./basics/Header";

type HelloMessageProps = {
    userName: string,
}

const HelloMessage = (props: HelloMessageProps) => {
    const {userName} = props;

    const getMessageText = (userName: string): string => {
        const currentHour = new Date().getHours();
        if(currentHour < 12 && currentHour > 0) {
            return `Good Morning, ${userName}`;
        } else if(currentHour >= 12 && currentHour < 18) {
            return `Good Afternoon, ${userName}`;
        }
        return `Good Evening, ${userName}`;
    }

    return (
        <Header className="heading welcome-heading">
            {getMessageText(userName)}
        </Header>
    );
}

export default HelloMessage;