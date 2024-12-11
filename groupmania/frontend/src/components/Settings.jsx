import React from "react";
import Link from "next/link";

import "../app/styles/main.scss";
import "../app/styles/settings.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Setting() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="setting-content">
      <h1>Setting</h1>
      <Link to="/userupdateinfo">
        <h3>Update Profile</h3>
      </Link>
      <React.Fragment>
        <h3 variant="outlined" onClick={handleClickOpen}>
          Delete account
        </h3>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to delete account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Link to="/login">
              <Button onClick={handleClose} autoFocus>
                Yes, I'm sure
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Setting;
