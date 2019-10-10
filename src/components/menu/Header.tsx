import React from "react";
import "./Header.scss";

export type HeaderProps = {
    children?: string | JSX.Element;
}

const Header = (props: HeaderProps) => {
    return ( 
        <h1 className="heading">
            <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/>
            {props.children}
        </h1>
    );
}

export default Header;