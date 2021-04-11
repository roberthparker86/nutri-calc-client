import React from 'react';
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      width: "100%"
    },
    message: {
      fontSize: "16px"
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold"
    }
  });

// Requires an open (boolean) hook, an onClose handler, and an alert object
export default function ResponseAlert (props) {
    const classes = useStyles();
    const { open, handleClose, alert } = props; 

    return (
        <Snackbar className={classes.root} open={open} onClose={handleClose} >
        <Alert className={classes.message} onClose={handleClose} severity={alert.severity} variant="filled" >
          <AlertTitle className={classes.title}>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    );
};