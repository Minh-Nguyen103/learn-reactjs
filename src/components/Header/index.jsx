import { Badge, Box, IconButton, Menu, MenuItem, Modal, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, CheckCircle, Close, ShoppingCart } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { hideMiniCart } from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

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

  paper: {
    position: 'absolute',
    width: 300,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
  },

  box: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },

  iconCheck: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1),
  },

  btn: {
    color: 'white',
    backgroundColor: 'red',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const showMiniCart = useSelector((state) => state.cart.showMiniCart);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(hideMiniCart());
  };

  const handleAccountClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const action = logout();
    dispatch(action);

    localStorage.clear();
    handleCloseMenu();
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

          {!isLoggedIn && (
            <Button onClick={handleClickOpen} color="inherit">
              Login
            </Button>
          )}

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
              <Modal
                open={showMiniCart}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <Paper elevation={0} className={classes.paper}>
                  <IconButton size="small" className={classes.close} onClick={handleCloseModal}>
                    <Close />
                  </IconButton>
                  <Box className={classes.box}>
                    <CheckCircle className={classes.iconCheck} />
                    <Typography variant="body2">Thêm vào giỏ hàng thành công!</Typography>
                  </Box>

                  <Button variant="outlined" className={classes.btn}>
                    Xem giỏ hàng và thanh toán
                  </Button>
                </Paper>
              </Modal>
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleAccountClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>

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
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Do not have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
