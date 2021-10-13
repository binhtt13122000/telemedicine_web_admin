import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DrugTypeForm from "./components/DrugTypeForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DrugType } from "./models/DrugType.models";
import DrugTypeService from "./services/DrugType.service";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const DrugTypes: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initDrugType: DrugType = {
        name: "",
        description: "",
        isActive: true,
    };
    const [data, setData] = useState<DrugType>(initDrugType);
    const [reload, setReload] = useState<Function>(() => {});
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "name",
            align: "left",
            title: "Tên loại thuốc",
            index: 2,
        },
        {
            field: "isActive",
            align: "left",
            title: "Trạng thái",
            disableSort: true,
            disableFilter: true,
            index: 3,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip
                            label={props ? "Active" : "Inactive"}
                            color={props ? "success" : "default"}
                        />
                    </Box>
                );
            },
            width: "100",
        },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initDrugType);
        setReload(() => callback);
        // callback();
    };

    const updateRowData = async (rowData: DrugType, callback: Function) => {
        // callback();
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postDrug = async (data: DrugType) => {
        try {
            const response = await DrugTypeService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const updateDrug = async (data: DrugType) => {
        try {
            const response = await DrugTypeService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: DrugType, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateDrug(data);
                } else {
                    postDrug(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DrugTypeForm data={data} open={open} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Loại thuốc"
                enableFilter
                query={`${API_ROOT_URL}/drug-types`}
                columns={colums}
                action={{
                    onAdd: (callback) => addRowData(callback),
                    onDelete: true,
                    onEdit: (rowData, callback) => updateRowData(rowData, callback),
                }}
            />
        </React.Fragment>
    );
};

export default DrugTypes;
