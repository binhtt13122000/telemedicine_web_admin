import React from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { Doctors } from "../models/Doctor.model";

import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Button, Card, IconButton, Typography } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export interface ICertificateForm {
    doctors?: Doctors;
}

const CertificateCarosuel: React.FC<ICertificateForm> = (props: ICertificateForm) => {
    const { doctors } = props;
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    return (
        <React.Fragment>
            {doctors?.certificationDoctors.length === 0 ? (
                <Typography component="div" align="center">
                    <Box sx={{ p: 1, fontSize: 18 }}>Chưa có chứng chỉ</Box>
                </Typography>
            ) : (
                <>
                    <Card sx={{ height: "100%", borderRadius: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                height: 60,
                                pl: 2,
                                bgcolor: "#e0e0e0",
                                // borderRadius: 3,
                            }}
                        >
                            <Typography variant="h6" component="div">
                                Chứng chỉ
                            </Typography>
                        </Box>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {doctors?.certificationDoctors?.map((step, index) => (
                                <div key={step?.certification?.name}>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ ml: "3rem", display: "flex" }}>
                                            <Typography variant="h6" component="div">
                                                {step?.certification?.name}
                                            </Typography>
                                            {step?.isActive ? (
                                                <IconButton>
                                                    <VerifiedIcon color="success" />
                                                </IconButton>
                                            ) : (
                                                <IconButton>
                                                    <BlockIcon color="error" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Box>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 400,
                                                display: "block",

                                                overflow: "hidden",
                                                width: "100%",
                                            }}
                                            src={step?.evidence}
                                            alt={step?.certification?.name}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={doctors?.certificationDoctors.length || 0}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={
                                        activeStep ===
                                        (doctors?.certificationDoctors.length != 0 &&
                                        doctors?.certificationDoctors.length != undefined
                                            ? doctors?.certificationDoctors.length
                                            : 1) -
                                            1
                                    }
                                >
                                    Next
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </Card>
                </>
            )}
        </React.Fragment>
    );
};

export default CertificateCarosuel;
