import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import React, {forwardRef, useImperativeHandle} from "react";


export const AlertMessage = forwardRef((props, ref) => {

        useImperativeHandle(
            ref,
            () => ({
                handleClick() {
                    setOpen(true);
                }
            }),
        )

        const [open, setOpen] = React.useState(false);

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };

        return (
            <Snackbar style={{marginTop: 50}} open={open} autoHideDuration={2000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity={`${props.typeAlert}`}>
                    {props.alertMessage}
                </Alert>
            </Snackbar>
        )

    }
)
