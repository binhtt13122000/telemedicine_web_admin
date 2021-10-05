import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Drug } from "../../models/Drug.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IDrugForm {
    data: Drug;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Drug, callback?: Function) => void;
}

const DrugForm: React.FC<IDrugForm> = (props: IDrugForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Drug>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("producer", data.producer);
        setValue("drugOrigin", data.drugOrigin);
        setValue("drugForm", data.drugForm);
        setValue("drugType.name", data.drugType.name);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Drug> = (data: Drug) => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (data) {
            props.handleClose("SAVE", data, clearErrors);
        }
    };

    return (
        <Modal open={props.opened}>
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minWidth: 275,
                    mx: "auto",
                    p: 1,
                    m: 2,
                    borderRadius: 1,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                    <Typography variant="h6" component="h2">
                        Thông tin Thuốc
                    </Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            justifyContent: "center",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Tên thuốc"
                        variant="outlined"
                        defaultValue={props.data.name}
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p>Name is required.</p>}
                    <TextField
                        id="outlined-basic"
                        label="Nhà sản xuất"
                        variant="outlined"
                        defaultValue={props.data.producer}
                        {...register("producer")}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Xuất xứ"
                        variant="outlined"
                        defaultValue={props.data.drugOrigin}
                        {...register("drugOrigin")}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Định dạng"
                        variant="outlined"
                        defaultValue={props.data.drugForm}
                        {...register("drugForm")}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Tên loại thuốc"
                        variant="outlined"
                        defaultValue={props.data.drugType.name}
                        {...register("drugType.name")}
                    />
                    <Box
                        sx={{
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button variant="contained" onClick={handleSubmit(submitHandler)} autoFocus>
                            Lưu
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default DrugForm;
