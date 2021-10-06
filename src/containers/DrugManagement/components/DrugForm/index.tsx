import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Autocomplete } from "@material-ui/lab";

import { Drug } from "../../models/Drug.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DrugType } from "src/containers/DrugTypeManagement/models/DrugType.models";

export interface IDrugForm {
    data: Drug;
    drugTypes: DrugType[];
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Drug, callback?: Function) => void;
}

const DrugForm: React.FC<IDrugForm> = (props: IDrugForm) => {
    // const [drugTypes, setDrugTypes] = useState<DrugType[]>([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        // getValues,
        clearErrors,
    } = useForm<Drug>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("producer", data.producer);
        setValue("drugOrigin", data.drugOrigin);
        setValue("drugForm", data.drugForm);
        setValue("drugType", data.drugType);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Drug> = (data: Drug) => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (data) {
            // const drugTypeId = props.drugTypes.find((item) => {
            //     if (item.name === data.drugType.name) return item.id;
            // });
            // const res = { ...data, drugTypeId };
            // console.log(res);
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
                    onSubmit={handleSubmit(submitHandler)}
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            justifyContent: "center",
                        },
                    }}
                >
                    <TextField
                        id="drug-name"
                        label="Tên thuốc *"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name && "Tên thuốc là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="drug-producer"
                        label="Nhà sản xuất"
                        variant="outlined"
                        {...register("producer")}
                    />
                    <TextField
                        id="drug-origin"
                        label="Xuất xứ"
                        variant="outlined"
                        {...register("drugOrigin")}
                    />
                    <TextField
                        id="drug-form"
                        label="Định dạng"
                        variant="outlined"
                        {...register("drugForm")}
                    />
                    <Autocomplete
                        options={props.drugTypes}
                        getOptionLabel={(drugType: DrugType) => drugType.name}
                        onChange={(e, newValue) => {
                            if (newValue) {
                                setValue("drugType", newValue);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tên loại thuốc *"
                                variant="outlined"
                                // defaultValue={props.drugTypes.find(
                                //     (item: DrugType) => item.name === getValues().drugType.name
                                // )}
                                error={!!errors.drugType}
                                helperText={errors.drugType && "This is required!"}
                                {...register("drugType", { required: true })}
                            />
                        )}
                    />
                    <Box
                        sx={{
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" type="submit" autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default DrugForm;
