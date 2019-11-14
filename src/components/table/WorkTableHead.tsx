import React from "react";
import TableRow from "../basics/TableRow";
import TableItem from "../basics/TableItem";
import TableHead from "../basics/TableHead";

const WorkTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableItem head>Date</TableItem>
                <TableItem head>Day</TableItem>
                <TableItem head>Start</TableItem>
                <TableItem head>Finish</TableItem>
            </TableRow>
        </TableHead>
    );
}

export default WorkTableHead;