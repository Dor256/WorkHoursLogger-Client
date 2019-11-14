import React from "react";
import TableRow from "../basics/TableRow";
import TableItem from "../basics/TableItem";
import { WorkLoggerEntry } from "../App";

export type WorkTableRowProps = {
    workEntry: WorkLoggerEntry
}

const WorkTableRow = (props: WorkTableRowProps) => {
    const {workEntry} = props;
    return (
        <TableRow>
            <TableItem>{workEntry.date}</TableItem>
            <TableItem>{workEntry.day}</TableItem>
            <TableItem>{workEntry.start}</TableItem>
            <TableItem>{workEntry.finish}</TableItem>
        </TableRow>
    );
}

export default WorkTableRow;