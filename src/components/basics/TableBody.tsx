import React from "react";

type TableBodyProps = {
    children: JSX.Element | JSX.Element[]
}

const TableBody = (props: TableBodyProps) => {
    return (
        <tbody>
            {props.children}
        </tbody>
    );
}

export default TableBody;