import React from "react";
import Header from "./Header";
import Image from "../basics/Image";

type MenuHeaderProps = {
    className?: string
}

const MenuHeader = (props: MenuHeaderProps) => {
    const { className } = props;
    return (
        <Header className={`heading ${className}`}>
            <Image className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`}/>
            Work Logger
        </Header>
    );
}

export default MenuHeader;