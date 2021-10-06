import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DrugForm from "./components/DrugForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DrugType } from "../DrugTypeManagement/models/DrugType.models";
import DrugTypeService from "../DrugTypeManagement/services/DrugType.service";
import { Drug } from "./models/Drug.model";
import DrugService from "./services/Drug.service";

const Drugs: React.FC = () => {
    // const showSnackbar = useSnackbar();
    const initData: Drug = {
        name: "",
        producer: "",
        drugOrigin: "",
        drugForm: "",
        drugTypeId: 0,
        drugType: { id: 0, name: "", description: "" },
    };
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [data, setData] = useState<Drug>(initData);
    const [drugTypes, setDrugTypes] = useState<DrugType[]>([]);
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
            width: "100",
        },
        { field: "name", align: "left", title: "Tên thuốc", index: 2 },
        { field: "producer", align: "left", title: "Nhà sản xuất", index: 3 },
        { field: "drugOrigin", align: "left", title: "Xuất xứ", index: 4 },
        { field: "drugForm", align: "left", title: "Định dạng", index: 5 },
        {
            field: "drugType",
            align: "left",
            title: "Tên loại thuốc",
            index: 6,
            render: (props: DrugType) => {
                return <React.Fragment>{props.name}</React.Fragment>;
            },
            width: "200",
        },
    ];

    const getDrugTypes = async () => {
        try {
            const response = await DrugTypeService.get(20, 1);
            if (response.status === 200) {
                setDrugTypes(response.data.content);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addRowData = async (callback: Function) => {
        setIsOpenForm(true);
        setData(initData);
        getDrugTypes();
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Drug, callback: Function) => {
        setIsOpenForm(true);
        setData(rowData);
        getDrugTypes();
        setReload(() => callback);
    };

    const postDrug = async (data: Drug) => {
        try {
            const response = await DrugService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const updateDrug = async (data: Drug) => {
        try {
            const response = await DrugService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Drug, clearErrors?: Function) => {
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
        setIsOpenForm(false);
    };

    return (
        <React.Fragment>
            <DrugForm
                opened={isOpenForm}
                data={data}
                handleClose={handleClose}
                drugTypes={drugTypes}
            />
            <CRUDTable
                title="Quản lí Thuốc"
                enableFilter
                query={`${API_ROOT_URL}/drugs`}
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

export default Drugs;
