import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutMajor from "../hooks/usePutMajor";
import { Doctor, DoctorFromAdd } from "../models/Doctor.model";
import { Major } from "../models/Major.model";
import DoctorService from "../services/Doctor.service";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const MajorProfile: React.FC = () => {
    const initCetification: Major = {
        name: "",
        description: "",
        isActive: true,
    };
    const { data, isLoading, isError } = useGetDoctor();
    const { mutate } = usePutMajor();
    const [open, setOpen] = useState<boolean>(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [reload, setReload] = useState<Function>(() => {});
    // const [loading, setLoading] = useState<boolean>(false);
    const [major, setMajor] = useState<Major>(initCetification);
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const createMajor = async (data: DoctorFromAdd) => {
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

    const editMajor = async (dataMajor?: Major) => {
        if (dataMajor) {
            if (dataMajor.id) {
                const response = await mutate({
                    id: dataMajor.id,
                    name: dataMajor?.name,
                    description: dataMajor?.description,
                    isActive: dataMajor?.isActive,
                });
            }
        }
    };
    // Edit major
    const handleClose = (type: "SAVE" | "CANCEL", dataMajor?: Major, clearErrors?: Function) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (dataMajor) {
                if (dataMajor.id) {
                    mutate({
                        id: dataMajor.id,
                        name: dataMajor?.name,
                        description: dataMajor?.description,
                        isActive: dataMajor?.isActive,
                    });
                } else {
                }
            }
            // editMajor(dataMajor);
        }
        if (clearErrors) {
            clearErrors();
        }
        refreshPage();
        setOpen(false);
    };

    const handleOpen = async (maj: Major) => {
        setOpen(true);
        setMajor(maj);
    };
    // Edit major
    //Add major
    const handleCreate = () => {
        setOpenAdd(true);
    };
    const refreshPage = () => {
        window.location.reload();
    };

    const handleCloseMajorAdd = (
        type: "SAVE" | "CANCEL",
        dataMajorAdd?: DoctorFromAdd,
        clearErrors?: Function
    ) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (dataMajorAdd) {
                createMajor(dataMajorAdd);
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        refreshPage();
        setOpenAdd(false);
    };

    return (
        <React.Fragment>
            <Card sx={{ height: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chuyên khoa
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
                        {data?.majorDoctors?.map((item) => (
                            <>
                                <ListItem key={item?.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            borderRadius: 5,
                                            bgcolor: "#fafafa",
                                        }}
                                    >
                                        <Box sx={{ display: "block" }}>
                                            <Typography variant="h6" component="h5">
                                                {item?.major?.name}
                                                {item?.major?.name ? (
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
                                                Mô tả: Chuyên chữa trị các bệnh nội ngoại tiết{" "}
                                                {item?.major?.description}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", ml: 4 }}>
                                            <Typography variant="h6" component="div">
                                                <IconButton onClick={() => handleOpen(item?.major)}>
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItem>
                            </>
                        ))}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm chuyên khoa
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default MajorProfile;
