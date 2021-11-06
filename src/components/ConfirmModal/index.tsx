import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export interface IConfirmModel {
    message: string;
    open: boolean;
    handleClose: (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => void;
}
export const ConfirmModal: React.FC<IConfirmModel> = (props: IConfirmModel) => {
    const { open, handleClose, message } = props;

    return (
        <Dialog open={open}>
            <DialogTitle>CONFIRM</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose(e, "CONFIRM")} color="primary" autoFocus>
                    Xác nhận
                </Button>
                <Button onClick={(e) => handleClose(e, "CANCEL")} color="secondary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};
