import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import Login from 'features/Auth/components/Login';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },

  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
    cursor: 'pointer',
  },
}));

export default function Header() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <FaceIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              MINH NGUYÊN SHOP
            </Link>
          </Typography>

          <NavLink to="/todos" className={classes.link}>
            <Button color="inherit">Todos</Button>
          </NavLink>

          <NavLink to="/albums" className={classes.link}>
            <Button color="inherit">Albums</Button>
          </NavLink>
          <Button onClick={handleClickOpen} color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {/* <Register closeDialog={handleClose} /> */}
          <Login closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
