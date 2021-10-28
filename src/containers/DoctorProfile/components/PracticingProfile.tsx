import React, { useState } from "react";

import moment from "moment";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutDoctor from "../hooks/usePutDoctor";
import { Doctor, DoctorFromAdd, DoctorPraticing } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Box, BoxProps } from "@mui/system";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                color: "black",
                p: 1,
                m: 1,
                borderRadius: 5,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 5,
                ...sx,
            }}
            {...other}
        />
    );
}

const PracticingProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();
    const { mutate } = usePutDoctor();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [doctorPracticing, setDoctorPracticing] = useState<DoctorPraticing>();
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const createPraticing = async (data: DoctorFromAdd) => {
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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickCloseView = () => {
        setOpen(false);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
        data && setDoctorPracticing(data);
    };
    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataPracticing?: DoctorFromAdd,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataPracticing) {
                if (dataPracticing.id) {
                    // mutate({
                    //     id: dataPracticing.id,
                    //     email: dataPracticing.email,
                    //     name: dataPracticing.name,
                    //     avatar: dataPracticing.avatar,
                    //     practisingCertificate: dataPracticing.practisingCertificate,
                    //     certificateCode: dataPracticing.certificateCode,
                    //     placeOfCertificate: dataPracticing.placeOfCertificate,
                    //     dateOfCertificate: dataPracticing.dateOfCertificate,
                    //     scopeOfPractice: dataPracticing.scopeOfPractice,
                    //     description: dataPracticing.description,
                    //     numberOfConsultants: dataPracticing.numberOfConsultants,
                    //     numberOfCancels: dataPracticing.numberOfCancels,
                    //     rating: dataPracticing.rating,
                    //     isVerify: dataPracticing.isVerify,
                    //     isActive: dataPracticing.isActive,
                    //     certificationDoctors: dataPracticing.certificationDoctors,
                    //     hospitalDoctors: dataPracticing.hospitalDoctors,
                    //     majorDoctors: dataPracticing.majorDoctors,
                    // });
                    createPraticing(dataPracticing);
                } else {
                    // postDrug(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpenModal(false);
    };
    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2, display: "flex" }}>
                    <Box>
                        <Typography variant="h6" component="div">
                            Hồ sơ
                            {data?.isActive ? (
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
                    </Box>
                    <Box sx={{ ml: 27 }}>
                        <Typography variant="h6" component="h5">
                            <IconButton onClick={() => handleOpenModal()}>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <Item>
                        <Box sx={{ display: "block" }}>
                            <Box sx={{ display: "flex" }}>
                                <Stack direction="row" spacing={1}>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Chứng chỉ hành nghề:
                                    </Typography>

                                    <Typography variant="body2" component="h5">
                                        <Link
                                            variant="body2"
                                            underline="none"
                                            onClick={handleClickOpen}
                                        >
                                            {" "}
                                            View
                                        </Link>
                                    </Typography>
                                </Stack>
                                <Dialog open={open} onClose={handleClickCloseView}>
                                    <DialogTitle>Chứng chỉ</DialogTitle>
                                    <DialogContent>
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={data?.practisingCertificate}
                                            loading="lazy"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mã chứng nhận:
                                </Typography>
                                <Typography variant="body2" component="h5">
                                    {data?.certificateCode}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Nơi cấp chứng nhận:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.placeOfCertificate}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Cấp ngày:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {moment(data?.dateOfCertificate).format("DD/MM/YYYY")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Phạm vi:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.scopeOfPractice}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mô tả:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.description}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Số bệnh nhân đã tư vấn:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.numberOfConsultants}
                                    {/* <Chip icon={<PersonIcon />} label={data?.numberOfConsultants} /> */}
                                </Typography>
                            </Stack>

                            <Box sx={{ mt: 1 }} />

                            <Stack direction="row" spacing={1}>
                                {/* <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Tình trạng:
                                </Typography> */}

                                <Typography variant="body2" component="h5">
                                    {data?.isVerify ? (
                                        <Chip
                                            label="Đã xác thực"
                                            variant="outlined"
                                            color="success"
                                        />
                                    ) : (
                                        <Chip
                                            label="Chưa xác thực"
                                            variant="outlined"
                                            color="error"
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </Box>
                    </Item>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default PracticingProfile;
