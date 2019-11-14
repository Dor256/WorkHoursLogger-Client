import React from "react";

export type TableHeadProps = {
    children: JSX.Element | JSX.Element[]
}

const TableHead = (props: TableHeadProps) => {
    return (
        <thead>
            {props.children}
        </thead>
    );
}

export default TableHead;