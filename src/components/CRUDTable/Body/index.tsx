import React, { useState } from "react";

import { ConfirmModal } from "src/components/ConfirmModal";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { ITableData, IColumn } from "../Models";

import { ModeEdit, Delete } from "@mui/icons-material";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const TableData = <T extends Record<string, any>>(
    props: ITableData<T> & { children?: React.ReactNode }
) => {
    const showSnackbar = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedToDeleteId, setSelectedToDeleteId] = useState<number>(0);
    const handleClose = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await fetch(`${props.query}/${selectedToDeleteId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.ok) {
                    props.loadData(1, props.rowPerPage);
                    showSnackbar({
                        children: "Xóa thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
            } catch (ex) {
                showSnackbar({
                    children: "Xóa đối tượng thất bại",
                    variant: "filled",
                    severity: "error",
                });
            } finally {
                setSelectedToDeleteId(0);
            }
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
            <ConfirmModal
                open={open}
                message="Bạn có muốn thực hiện thay đổi?"
                handleClose={handleClose}
            />
            {props.rows?.map((row: T, indexRow: number) => {
                return (
                    <TableRow key={row.id}>
                        {props.columns.map((column: IColumn, index: number) => {
                            const { render, link, renderLink } = column;
                            if (column.type === "index") {
                                return (
                                    <TableCell width={column.width || undefined} key={index}>
                                        {!link ? (
                                            indexRow + 1
                                        ) : (
                                            <a href={`${link}/${row.id}`}>{indexRow + 1}</a>
                                        )}
                                    </TableCell>
                                );
                            }
                            return (
                                <TableCell width={column.width || undefined} key={index}>
                                    {render !== undefined ? (
                                        render(row[column.field])
                                    ) : link ? (
                                        <a href={`${link}/${row.id}`}>{row[column.field]}</a>
                                    ) : renderLink !== undefined ? (
                                        <a href={`${renderLink(row)}`}>{row[column.field]}</a>
                                    ) : (
                                        row[column.field]
                                    )}
                                </TableCell>
                            );
                        })}
                        {(props.isHaveActionDelete || props.isHaveActionEdit) && (
                            <TableCell width={160}>
                                {props.isHaveActionEdit && (
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton
                                            size="large"
                                            onClick={() => {
                                                props.setMutationMode(true);
                                                if (props.action?.onEdit) {
                                                    props.action?.onEdit(row, () => {
                                                        props.loadData(
                                                            props.page,
                                                            props.rowPerPage
                                                        );
                                                        props.setMode("NORMAL");
                                                        props.setMutationMode(false);
                                                    });
                                                }
                                            }}
                                        >
                                            <ModeEdit />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {props.isHaveActionDelete && (
                                    <Tooltip title="Xóa">
                                        <IconButton
                                            size="large"
                                            onClick={() => {
                                                setOpen(true);
                                                setSelectedToDeleteId(row.id);
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                );
            })}
        </React.Fragment>
    );
};
