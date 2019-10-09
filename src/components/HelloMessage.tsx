import React from "react";

type Props = {
    user?: GoogleUser
}

const HelloMessage = (props: Props) => {
    const userProfile = props.user ? props.user.getBasicProfile() : undefined;
    if(userProfile) {
        return <h1>Hello {userProfile.getName()}!</h1>
    }
    return null;
}
export default HelloMessage;