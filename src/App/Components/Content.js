
import React, { Suspense, useState, useContext, useEffect } from "react";

import { Link, Route, Switch } from 'react-router-dom';

import routes from "../routes/routes";
import { CssBaseline, AppBar, Toolbar, Drawer, List, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';

import sideMenu from './Navigation/menuItems'
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../Context/userContext";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuList from './Navigation/MenuList';
import Logo from '../../images/logo.jpg'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowX: 'hidden'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: '#ECECEC'
    },
    toolbarLeft: {
        display: "flex",
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#235063'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: "24px 0 100px",
        position: "relative",
        minHeight: '100vh',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    MenuBtns: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: '0',
        backgroundColor: '#225164',
        display: 'block',
        color: 'white',
        padding: ' 10px 15px',
        width: '100%',
        textAlign: 'center'
    }
}));

const Content = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [test, setTest] = useState(false);

    useEffect(() => {
        if (user) {
            setTest(true)
        }
    }, [user])

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar className={clsx(classes.toolbar)}>
                    <div className={clsx(classes.toolbarLeft)}>
                        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawer} edge="start" className={clsx(classes.menuButton)}>
                            { open ? <CloseIcon /> : <MenuIcon /> }
                        </IconButton>

                        <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/'} >
                            <img src={Logo} alt="Logo" style={{ width: '50px' }} />
                        </Link>
                    </div>

                    {user !== undefined ?
                        <div>
                            {
                                user.role === 'admin' 
                                    ?
                                        <Link style={{ textDecoration: 'none', 'color': '#235063', marginRight: '30px' }} to={'/admin'} className={classes.MenuBtns}>
                                            <VerifiedUserOutlinedIcon style={{ marginRight: '5px' }} />
                                            Admin
                                        </Link>
                                    :   null
                            }

                            <Link style={{ textDecoration: 'none', 'color': '#235063' }} to={'/profile'} className={classes.MenuBtns}>
                                <AccountCircleOutlinedIcon style={{ marginRight: '5px' }} />
                                {user.username}
                            </Link>
                        </div>
                        :
                        <div>
                            <Link style={{ textDecoration: 'none', 'color': 'white', 'backgroundColor': '#193F4C', 'padding': '5px 10px', 'borderRadius': '3px' }} to={'/login'}>Вход</Link>
                        </div>
                    }
                </Toolbar>
            </AppBar>

            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }} >
                <List>
                    {sideMenu.map(({ path, name, withAuth, component, index, innerMenu }) => (
                        <MenuList key={path} path={path} name={name} withAuth={withAuth} component={component} index={index} innerMenu={innerMenu} />
                    ))}
                </List>
            </Drawer>

            <main className={clsx(classes.content, { [classes.contentShift]: open })}>
                <div className={classes.drawerHeader} />

                <Suspense fallback={
                    <CircularProgress style={{
                        width: '60px',
                        height: '60px',
                        position: 'absolute',
                        left: 'calc(50% - 30px)',
                        top: 'calc(50% - 30px)',
                    }} />
                }>
                    <Switch>
                        <>
                            {routes.map(({ path, component, type }) => {
                                return (
                                    <Route exact key={path} path={path} component={component} />
                                )
                            })}

                            { localStorage.length !== 0 ? <Route exact path="/" /> : null }
                        </>
                    </Switch>
                </Suspense>

                <footer className={classes.footer}> Created by Ivan Angelov </footer>
            </main>
        </div>
    );
}

export default Content;