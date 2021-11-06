import React, { useState } from "react";

import GooglePlacesAutocomplete, {
    getLatLng,
    geocodeByAddress,
} from "react-google-places-autocomplete";
import { SubmitHandler, useForm } from "react-hook-form";

import { Hospital } from "../../models/Hospital.model";

import { Button, Card, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    data: Hospital;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Hospital, callback?: Function) => void;
}

const HospitalForm: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { data } = props;
    const [checked, setChecked] = React.useState<boolean>(data.isActive);
    const [place, setPlace] = useState<any>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // eslint-disable-next-line no-console
        console.log(event.target.checked); //true
        if (event.target.checked === true) {
            setValue("isActive", true);
        } else if (event.target.checked === false) {
            setValue("isActive", false);
        } else {
            // eslint-disable-next-line no-console
            console.log(event.target.checked);
        }
    };
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
        setValue("isActive", data.isActive);
        if (data.address) {
            setPlace({ label: data.address });
        }
        setChecked(data.isActive);
    }, [data, setValue, setChecked]);
    const submitHandler: SubmitHandler<Hospital> = (data: Hospital) => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (place) {
            geocodeByAddress(place.label)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    // eslint-disable-next-line no-console
                    console.log("Successfully got latitude and longitude", { lat, lng });
                    // eslint-disable-next-line no-console
                    console.log(place);
                    if (data && lat && lng) {
                        data.lat = lat;
                        data.long = lng;
                        data.address = place.label;
                        setPlace(null);
                        props.handleClose("SAVE", data, clearErrors);
                    }
                });
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
                            // justifyContent: "center",
                        },
                    }}
                >
                    <TextField
                        id="hospital-code"
                        label="Mã bệnh viện *"
                        variant="outlined"
                        defaultValue={props.data.hospitalCode}
                        error={!!errors.hospitalCode}
                        helperText={errors.hospitalCode && "Mã bệnh viện là bắt buộc"}
                        {...register("hospitalCode", { required: true })}
                    />
                    <TextField
                        id="hospital-name"
                        label="Tên bệnh viện *"
                        variant="outlined"
                        defaultValue={props.data.name}
                        error={!!errors.name}
                        helperText={errors.name && "Tên bệnh viện là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <Box id="address_box" sx={{ width: "100%" }}>
                        <GooglePlacesAutocomplete
                            apiOptions={{ language: "vi", region: "vn" }}
                            autocompletionRequest={{
                                componentRestrictions: {
                                    country: ["vn"],
                                },
                            }}
                            selectProps={{
                                styles: {
                                    container: (provided) => ({
                                        ...provided,
                                        width: "96% !important",
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        height: "40px",
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: "white",
                                    }),
                                },
                                value: place,
                                onChange: setPlace,
                                placeholder: "Địa chỉ",
                            }}
                            apiKey="AIzaSyBnFc2k4rFaznVW9zfTJQz2s92PZOcqWTs"
                        />
                    </Box>
                    <TextField
                        id="description"
                        label="Mô tả"
                        variant="outlined"
                        defaultValue={props.data.description}
                        {...register("description")}
                        multiline
                        rows={5}
                    />
                    <Stack direction="row" spacing={0}>
                        <Typography
                            sx={{
                                // mx: "auto",
                                p: 1,
                                //
                                // "& > :not(style)": { m: 1 },
                            }}
                        >
                            Trạng thái:
                        </Typography>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                props.handleClose("CANCEL", undefined, clearErrors);
                                setPlace(null);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSubmit(submitHandler)} autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default HospitalForm;
