import React, { ReactElement } from "react";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarWarning: React.FC = (): ReactElement => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
        return "test";
    };

    const handleClose = () => {
        setOpen(false);
        return "test";
    };

    return (
        <Stack spacing={2} sx={{ width: "10%" }}>
            <Button variant="outlined" onClick={handleClick}>
                Warning Snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
                    Warning
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default SnackbarWarning;
