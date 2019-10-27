import React from "react";
import "./Header.scss";

export type HeaderProps = {
    className: string,
    children?: string | JSX.Element | React.ReactNode[]
}

const Header = (props: HeaderProps) => {
    return ( 
        <h1 className={props.className}>
            {props.children}
        </h1>
    );
}

export default Header;