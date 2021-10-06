import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Hospital } from "../../models/Hospital.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    data: Hospital;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Hospital, callback?: Function) => void;
}

const HospitalForm: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Hospital>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("hospitalCode", data.hospitalCode);
        setValue("name", data.name);
        setValue("address", data.address);
        setValue("description", data.description);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Hospital> = (data: Hospital) => {
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
                        Thông tin Bệnh viện
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
                >
                    <TextField
                        id="outlined-basic"
                        label="Mã bệnh viện"
                        variant="outlined"
                        defaultValue={props.data.hospitalCode}
                        error={!!errors.hospitalCode}
                        helperText={errors.hospitalCode && "Mã bệnh viện là bắt buộc"}
                        {...register("hospitalCode", { required: true })}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Tên bệnh viện"
                        variant="outlined"
                        defaultValue={props.data.name}
                        error={!!errors.name}
                        helperText={errors.name && "Tên bệnh viện là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Địa chỉ"
                        variant="outlined"
                        defaultValue={props.data.address}
                        {...register("address")}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Mô tả"
                        variant="outlined"
                        defaultValue={props.data.description}
                        {...register("description")}
                        multiline
                        rows={5}
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

export default HospitalForm;