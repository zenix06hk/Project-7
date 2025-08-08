"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle.jsx";

import "./settings.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import ThemeSwitcher from "@/components/DarkModeTheme/ThemeSwitcher";

function Setting() {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { data: session } = useSession();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      // Get JWT token from NextAuth session
      const token = session?.accessToken;

      if (!token) {
        alert("Please log in first");
        return;
      }

      // console.log("Attempting to delete account with token:", token);

      // Call your backend API to delete the user account
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/delete-account`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Delete account response status:", response.status);
      const data = await response.json();
      // console.log("Delete account response data:", data);

      if (data?.success) {
        alert("Account deleted successfully!");
        // Sign out from NextAuth and redirect to sign-in page
        await signOut({ callbackUrl: "/signin" });
      } else {
        console.error("Failed to delete account:", data?.error);
        alert(
          `Failed to delete account: ${data?.error || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting account.");
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div className="setting-content">
      <div className="settings-container">
        <h1>Settings</h1>
        <Link href="/updateProfile">
          <h3>Update Profile</h3>
        </Link>
        <div className="setting-darkmode">
          <h3>Dark Mode</h3>
          <DarkModeToggle />
        </div>
        {session && (
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
              <DialogTitle id="alert-dialog-title">
                {"Delete account"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure want to delete account?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button
                  onClick={handleDeleteAccount}
                  autoFocus
                  disabled={isDeleting}
                  color="error"
                >
                  {isDeleting ? "Deleting..." : "Confirm delete account"}
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
        {!session && <p>Please log in to access account settings.</p>}
      </div>
    </div>
  );
}

export default Setting;
