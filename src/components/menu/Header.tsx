import React from "react";
import { HeaderProps } from "../../types/types";
import "./Header.scss";

const Header = (props: HeaderProps) => {
    return ( 
        <h1 className="heading">
            <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> {props.text}
        </h1>
    );
}

export default Header;