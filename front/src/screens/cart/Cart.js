import React from 'react';
import clsx from 'clsx';

//Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Settings from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

//My components
import { mainListItems, secondaryListItems } from '../../components/listItems';
import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';
import Footer from '../../components/Footer';
import { logout } from '../../services/auth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'green'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 'auto',
    },
}));

export default function CartPage() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const _doLoggout = () => {
        logout();
        window.location.href = './';
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Página de Vendas
                    </Typography>
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Settings />
                    </IconButton> */}
                    <IconButton color="inherit" onClick={() => _doLoggout()}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        SESMER v2.0
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Nova Venda */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <Link onClick={() => window.location.href = "./cart/add"} style={{ cursor: 'pointer', textDecoration: 'none', color: 'green' }}>
                                    <Grid container>
                                        <Grid item xs={4} style={{ alignContent: 'center', textAlign: 'center' }}>
                                            <div style={{ width: '100%', alignContent: 'center', textAlign: 'center', flex: 1 }}>
                                                <AddShoppingCartIcon style={{ color: 'green', fontSize: 70, }} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography component="p" variant="h5" >
                                                Nova Venda
                                            </Typography>
                                            <Typography component="p" style={{ color: 'grey' }} >
                                                Inicie uma nova venda
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                                {/* <Link
                                    variant="body2"
                                    to="/cart/add"
                                    // to="/cart/history"
                                    href="/cart/add"
                                    style={{ cursor: 'pointer',  color: 'green', textDecoration: 'none' }}
                                >
                                    

                                </Link> */}
                            </Paper>
                        </Grid>
                        {/* Minhas Vendas */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <Link
                                    to="/cart/history"
                                    href="/cart/history"
                                    style={{ cursor: 'pointer', color: 'green', textDecoration: 'none' }}
                                >
                                    <Grid container>
                                        <Grid item xs={4} style={{ alignContent: 'center', textAlign: 'center' }}>
                                            <div style={{ width: '100%', alignContent: 'center', textAlign: 'center', flex: 1 }}>
                                                <ShoppingBasketIcon style={{ color: 'green', fontSize: 70, }} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography component="p" variant="h6" >
                                                Minhas Vendas
                                            </Typography>
                                            <Typography component="p" style={{ color: 'grey' }} >
                                                Veja seu histórico de vendas
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Paper>
                        </Grid>
                        {/* Todas as Venda */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <Link
                                    disabled
                                    variant="body2"
                                    to="/cart/all"
                                    href="/cart/all"
                                    style={{ cursor: 'pointer', color: 'green', textDecoration: 'none' }}
                                >
                                    <Grid container>
                                        {/* <Grid item xs={4} style={{ alignContent: 'center', textAlign: 'center' }}>
                                            <div style={{ width: '100%', alignContent: 'center', textAlign: 'center', flex: 1 }}>
                                                <ShoppingBasketIcon style={{ color: 'green', fontSize: 70, }} />
                                            </div>
                                        </Grid> */}
                                        <Grid item xs={12}>
                                            <Typography component="p" variant="h6" >
                                                Todas as Vendas
                                            </Typography>
                                            <Typography component="p" style={{ color: 'grey' }} >
                                                Pesquise as vendas feitas por um cliente específico ou por data
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    );
}