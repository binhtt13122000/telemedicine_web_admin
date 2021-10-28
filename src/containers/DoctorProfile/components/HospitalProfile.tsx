import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutHospital from "../hooks/usePutHospital";
import { Doctor, DoctorFromAdd } from "../models/Doctor.model";
import { Hospital } from "../models/Hospital.model";
import DoctorService from "../services/Doctor.service";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    Chip,
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const HospitalProfile: React.FC = () => {
    const initHospital: Hospital = {
        hospitalCode: "",
        name: "",
        address: "",
        description: "",
        lat: 0,
        long: 0,
        isActive: true,
    };
    const { data, isLoading, isError } = useGetDoctor();
    const { mutate } = usePutHospital();
    const [open, setOpen] = useState<boolean>(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [hospital, setHospital] = useState<Hospital>(initHospital);
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const refreshPage = () => {
        window.location.reload();
    };
    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataHospital?: Hospital,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataHospital) {
                if (dataHospital.id) {
                    mutate({
                        id: dataHospital?.id,
                        hospitalCode: dataHospital?.hospitalCode,
                        name: dataHospital?.name,
                        address: dataHospital?.address,
                        lat: dataHospital?.lat,
                        long: dataHospital?.long,
                        description: dataHospital?.description,
                        isActive: dataHospital?.isActive,
                    });
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
        refreshPage();
    };
    const createHospital = async (data: DoctorFromAdd) => {
        try {
            let formData = new FormData();
            formData.append("Id", JSON.stringify(data?.id));
            formData.append("Email", data.email);
            formData.append("Name", data.name);
            formData.append("Avatar", data.avatar);
            formData.append("PractisingCertificate", data.practisingCertificate);
            formData.append("CertificateCode", data.certificateCode);
            formData.append("PlaceOfCertificate", data.placeOfCertificate);
            formData.append("DateOfCertificate", data.dateOfCertificate);
            formData.append("ScopeOfPractice", data.scopeOfPractice);
            formData.append("description", data.description);
            formData.append("NumberOfConsultants", JSON.stringify(data.numberOfConsultants));
            formData.append("NumberOfCancels", JSON.stringify(data.numberOfCancels));
            formData.append("Rating", JSON.stringify(data.rating));
            formData.append("IsVerify", JSON.stringify(data.isVerify));
            formData.append("IsActive", JSON.stringify(data.isActive));
            formData.append("CertificationDoctors", JSON.stringify(data.certificationDoctors));
            formData.append("HospitalDoctors", JSON.stringify(data.hospitalDoctors));
            formData.append("MajorDoctors", JSON.stringify(data.majorDoctors));
            const service = new DoctorService<Doctor>();
            const response = await service.updateFormData(formData);
            if (response.status === 201) {
                // eslint-disable-next-line no-console
                console.log(response.data);
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };
    const handleCloseHospitalAdd = (
        type: "SAVE" | "CANCEL",
        dataHospital?: DoctorFromAdd,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataHospital) {
                // const res = {
                //     ...dataHospital,
                //     id: data?.id,
                //     email: data?.email,
                //     certificateCode: data?.certificateCode,
                //     placeOfCertificate: data?.placeOfCertificate,
                //     dateOfCertificate: data?.dateOfCertificate,
                //     scopeOfPractice: data?.scopeOfPractice,
                //     isActive: data?.isActive,
                // };
                createHospital(dataHospital);
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        refreshPage();
        setOpenAdd(false);
    };
    const handleOpen = async (hos: Hospital) => {
        setOpen(true);
        setHospital(hos);
    };
    const handleCreate = () => {
        setOpenAdd(true);
    };

    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Bệnh viện
                    </Typography>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: 300,
                            "& ul": { padding: 0 },
                        }}
                    >
                        {data?.hospitalDoctors?.map((item) => (
                            <ListItem key={item?.id}>
                                <Box sx={{ display: "flex", borderRadius: 5, bgcolor: "#fafafa" }}>
                                    <Box sx={{ display: "block" }}>
                                        <Typography variant="h6" component="h5">
                                            {item?.hospital?.name}
                                            {item?.hospital?.name ? (
                                                <Tooltip title="Còn hoạt động">
                                                    <IconButton>
                                                        <CheckCircleOutlineIcon color="success" />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Không hoạt động">
                                                    <IconButton>
                                                        <CheckCircleOutlineIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Địa chỉ: {item?.hospital?.address}
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Mô tả: {item?.hospital?.description}
                                        </Typography>

                                        <Box sx={{ mt: 1 }} />
                                        <Typography variant="body2" component="h5">
                                            Tình trạng:{" "}
                                            {item?.isWorking ? (
                                                <Chip
                                                    label="Đang công tác"
                                                    variant="outlined"
                                                    color="success"
                                                />
                                            ) : (
                                                <Chip
                                                    label="Nghỉ công tác"
                                                    variant="outlined"
                                                    color="error"
                                                />
                                            )}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography variant="h6" component="h5">
                                            {/* <IconButton>
                                                <Icon color="error">delete</Icon>
                                            </IconButton> */}
                                            <IconButton onClick={() => handleOpen(item?.hospital)}>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm bệnh viện
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default HospitalProfile;
