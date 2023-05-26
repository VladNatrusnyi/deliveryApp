import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const AlertDialog = ({isOpen = false, fnOK, fnCansel}) => {
  const [open, setOpen] = useState(isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const agreeFn = () => {
    fnOK()
    handleClose()
  }

  const handleClose = () => {
    fnCansel()
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sorry, but the order can only contain dishes from one restaurant."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are sure that you want to change the restaurant, because when you change it, all your previous purchases added to the basket will be cleared
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={agreeFn} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
