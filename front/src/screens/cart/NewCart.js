import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
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
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import api from '../../services/api';
import { cart as localCart, restartCart as restartLocalCart, getLocalCart } from '../../services/auth';

import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import MaterialTable from 'material-table';

// Components
import TableCart from '../../components/TableCart';
import { logout, getToken } from '../../services/auth';
import { mainListItems, secondaryListItems } from '../../components/listItems';
import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';
import Footer from '../../components/Footer';



// // Icons
// import MenuIcon from '@material-ui/icons/Menu';
// import Settings from '@material-ui/icons/Settings';
// import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import CloseIcon from '@material-ui/icons/Close';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// import DoneIcon from '@material-ui/icons/Done';


// Icons
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import NavigationIcon from '@material-ui/icons/Navigation';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneIcon from '@material-ui/icons/Done';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



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
        height: 240,
    },

    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton2: {
        padding: 10,
    },
    divider2: {
        height: 28,
        margin: 4,
    },

    card: {
        display: 'flex',
    },
    detailsCard: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentCard: {
        flex: '1 0 auto',
    },
    coverCard: {
        width: 151,
    },
    controlsCard: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const GreenLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: 'green',
    },
    barColorPrimary: {
        backgroundColor: '#6ad65e',
    },
})(LinearProgress);

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'transparent',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        },
    },
})(TextField);

const TransitionComponent = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function NewCart() {

    const [users, setUsers] = React.useState([]);

    const TableColumns = [
        { title: 'Nome', field: 'name' },
        { title: 'E-mail', field: 'email' },
    ];

    const classes = useStyles();
    const theme = useTheme();
    const [loadingSearch, setLoadingSearch] = React.useState(false);
    const [loadingCartTable, setLoadingCartTable] = React.useState(true);
    const [loadingCartValue, setLoadingCartValue] = React.useState(true);
    const [cart, setCart] = React.useState({
        itens: [],
        itemSelected: null,
        valor: 0.0,
        status: 0,
        showItemSelected: false,
        cliente: null,
    });
    const [selectedClient, setSelectedClient] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [messageSnackBar, setMessageSnackBar] = React.useState("");
    const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [valueProductSearch, setValueProductSearch] = React.useState('');
    const loadingAutoComplete = openAutoComplete && options.length === 0;
    const [openDialog, setOpenDialog] = React.useState(false);
    const getProductCodByName = (name) => {
        let id = null;
        products.map((item) => {
            if (name == item.name) {
                console.log("Algum entrou");
                id = item.id;
            }
        });

        return id;
    }

    const escolherItem = async (e) => {
        e.preventDefault();
        // startSearch();
        // setLo
        let id = getProductCodByName(valueProductSearch);
        // console.log(id);
        if (id != null) {

            setLoadingSearch(true);
            const response = await api.get(`/product/${id}`);
            // React.useEffect(() => {
            let newCart = cart;
            console.log(response);
            if (response.data.success) {
                console.log("entrou no success");
                // resetCart();
                newCart.itemSelected = response.data.product;
                newCart.showItemSelected = true;
                setCart(newCart);
                setLoadingSearch(false);
            }
        }
        else {
            setMessageSnackBar("Para efetuar uma pesquisa é necessário digitar algo no campo de busca!");
            setSnackOpen(true);
        }
        //     return true;
        // });
    };

    const verifyItemInCart = (obj) => {
        let counter = cart.itens.filter(item => item.obj.id == obj.id).length;

        if (counter == 0) {
            return false;
        }

        return true;
    };

    const startSearch = () => {
        setLoadingCartTable(true);
        setLoadingCartValue(true);
        setLoadingSearch(true);
    }

    const resetCart = async () => {
        setLoadingCartTable(true);
        setLoadingCartValue(true);
        setLoadingSearch(true);

        let newCart = cart;
        newCart.itemSelected = {};
        newCart.itens = [];
        newCart.showItemSelected = false;
        newCart.valor = 0.0;
        newCart.cliente = null;
        setSelectedClient(false);
        setCart(newCart);
        setValueProductSearch("");
        restartLocalCart();
        setMessageSnackBar("Carrinho está vazio...");
        setSnackOpen(true);
        await sleep(800);

        setLoadingCartTable(false);
        setLoadingCartValue(false);
        setLoadingSearch(false);
        setSelectedClient(false);
    };

    const calcNewCartValue = (editCart) => {
        let value = 0.0;

        editCart.itens.map((item) => {
            value += parseFloat(item.valor);
        });

        return value;
    };

    const insertItemInCart = async () => {

        setLoadingCartTable(true);
        setLoadingCartValue(true);
        let newCart = cart;

        let isExist = verifyItemInCart(newCart.itemSelected);
        newCart.status = 1;
        if (newCart.itemSelected.stock == 0 || newCart.itemSelected.stock == newCart.itemSelected.saidas) {
            setMessageSnackBar("O item não está mais em estoque...");
            setSnackOpen(true);
        } else {
            if (!isExist) {
                let item = { id: newCart.itemSelected.id, obj: newCart.itemSelected, quantidade: 1, valor: newCart.itemSelected.p_final };
                newCart.itens.push(item);
                newCart.valor = calcNewCartValue(newCart).toFixed(2);
                setCart(newCart);
            } else {
                let item = newCart.itens.filter(item => item.obj.id == newCart.itemSelected.id)[0];
                if (item.quantidade < item.obj.stock) {
                    item.quantidade += 1;
                    item.valor = parseFloat(parseFloat(newCart.itemSelected.p_final) + parseFloat(item.valor)).toFixed(2);
                    newCart.valor = parseFloat(calcNewCartValue(newCart).toFixed(2));
                    setCart(newCart);
                } else {
                    setMessageSnackBar("O item não está mais em estoque...");
                    setSnackOpen(true);
                }
            }
        }
        localCart(JSON.stringify(newCart));
        await sleep(100);
        setLoadingCartTable(false);
        setLoadingCartValue(false);
    };

    const finalizarCompra = async () => {
        let dateNow = new Date();
        let userLogged = JSON.parse(getToken());
        // setOpenDialog(true);
        console.log(cart);
        console.log(userLogged);
        let venda = JSON.stringify({
            valor: cart.valor,
            clienteId: cart.cliente.id,
            vendedorId: userLogged.id,
            dia_venda: dateNow.getDate(),
            mes_venda: dateNow.getMonth() + 1,
            ano_venda: dateNow.getFullYear(),
            hora_venda: `${dateNow.getHours()}:${dateNow.getMinutes() < 10 ? "0" + dateNow.getMinutes() : dateNow.getMinutes()}`,
            metodo: 'Cartão de Crédito',
        });

        const response = await api.post('/sale/', venda);

        // console.log(response);
        if (response.status == 200) {
            if (response.data.success) {
                console.log("Registrou Venda");
                let itensVenda = [];
                itensVenda = cart.itens.map((item) => {
                    let returnedItem = {
                        mercadoria_cod: item.obj.id,
                        venda_id: response.data.id,
                        quantidade: item.quantidade
                    };
                    return returnedItem;
                });
                const response2 = await api.post('/sale/addItens', JSON.stringify(itensVenda));

                if (response2.status == 200) {
                    if (response2.data.success) {
                        console.log("Cadastrou os itens");
                        let clientToUpdate = {
                            valor_gasto: parseFloat(cart.cliente.valor_gasto) + parseFloat(cart.valor),
                            id: cart.cliente.id,
                        }
                        const response3 = await api.post('/sale/update/cliente', JSON.stringify(clientToUpdate));

                        if (response3.status == 200) {
                            if (response3.data.success) {
                                console.log("Atualizou o cliente");
                                let toUpdateItens = cart.itens.map((item)=>{
                                    let toUpdateItem = {
                                        mercadoriaId: item.obj.cod,
                                        quantidade: item.obj.stock - item.quantidade,
                                        saidas: item.obj.saidas + item.quantidade
                                    };
                                    return toUpdateItem;
                                });

                                const response4 = await api.post('/sale/update/itens', JSON.stringify(toUpdateItens));
                                if (response4.status == 200) {
                                    if (response4.data.success) {
                                        console.log("Atualizou os itens");
                                        finishCart();
                                    } else {
                                        console.log("Não atualizou os itens");
                                    }
                                } else {
                                    console.log("Não atualizou os itens");
                                }
                            } else {
                                console.log("Não atualizou o cliente");
                            }
                        } else {
                            console.log("Não atualizou o cliente");
                        }
                    } else {
                        console.log("Não cadastrou os itens");
                    }
                } else {
                    console.log("Não cadastrou os itens");
                }
            } else {
                console.log("Não registrou a Venda");
            }
        } else {
            console.log("Não registrou a Venda");
        }
    };

    const finishCart = async () => {
        setLoadingCartTable(true);
        setLoadingCartValue(true);
        setLoadingSearch(true);

        let newCart = cart;
        newCart.itemSelected = {};
        newCart.itens = [];
        newCart.showItemSelected = false;
        newCart.valor = 0.0;
        newCart.cliente = null;
        setSelectedClient(false);
        setCart(newCart);
        setValueProductSearch("");
        restartLocalCart();
        setMessageSnackBar("Compra finalizada com sucesso!");
        setSnackOpen(true);
        await sleep(800);

        setLoadingCartTable(false);
        setLoadingCartValue(false);
        setLoadingSearch(false);
        setSelectedClient(false);
    };

    const enableToSelectClient = async () => {
        // let dateNow = new Date();
        setOpenDialog(true);
        // console.log(cart);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSnackClose = () => {
        setSnackOpen(!snackOpen);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const _doLoggout = () => {
        logout();
        window.location.href = './';
    };
    React.useEffect(() => {
        let active = true;

        if (!loadingAutoComplete) {
            return undefined;
        }

        (async () => {
            const response = await api.get('/product/all');

            const returned = JSON.stringify(response.data.products);
            const products = await JSON.parse(returned);
            setProducts(products);
            if (active) {
                setOptions(Object.keys(products).map(key => products[key]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingAutoComplete]);

    React.useEffect(() => {
        if (!openAutoComplete) {
            setOptions([]);
        }
    }, [openAutoComplete]);

    React.useEffect(() => {
        // restartLocalCart();
        if (cart.status == 0) {
            let newCart;
            //   let cartReceived = false;
            try {
                newCart = getLocalCart();
            } catch{
                // console.log("O catch funcionou e caiu nele haha");
            }
            if (newCart != null) {
                setCart(JSON.parse(newCart));
                if (JSON.parse(newCart).cliente == null) {
                    console.log(newCart);
                    setSelectedClient(false);
                } else {
                    console.log(newCart);
                    setSelectedClient(true);
                }
            }

            setLoadingCartTable(false);
            setLoadingCartValue(false);
            setLoadingSearch(false);
        }

        if (users.length == 0) {
            (async () => {
                const response = await api.get('/cliente/all');

                const returned = await JSON.stringify(response.data.clientes);
                const clientes = await JSON.parse(returned);
                setUsers(clientes);
            })();
        }
    });

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
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
                        Nova Venda
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
                        {/* Search itens */}
                        <Grid item xs={12}>
                            <Paper component="form" onSubmit={(e) => escolherItem(e)} className={classes.root2}>
                                {/* <IconButton className={classes.iconButton2} aria-label="menu">
                                    <MenuIcon />
                                </IconButton> */}
                                <Autocomplete
                                    id="asynchronous-demo"
                                    style={{ width: '100%' }}
                                    open={openAutoComplete}
                                    defaultValue={valueProductSearch}
                                    inputValue={valueProductSearch}
                                    onInputChange={(event, value) => setValueProductSearch(value)}
                                    onOpen={() => {
                                        setOpenAutoComplete(true);
                                    }}
                                    onClose={() => {
                                        setOpenAutoComplete(false);
                                    }}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={option => option.name}
                                    options={options}
                                    loading={loadingAutoComplete}
                                    renderInput={params => (
                                        <CssTextField
                                            {...params}
                                            label="Encontre o produto aqui"
                                            fullWidth
                                            variant="outlined"
                                            style={{ border: 'none' }}
                                            // value={valueProductSearch}
                                            onChange={item => setValueProductSearch(item.target.value)}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loadingAutoComplete ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                <IconButton type="submit" className={classes.iconButton2} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                {/* <Divider className={classes.divider2} orientation="vertical" />
                                <IconButton color="primary" className={classes.iconButton2} aria-label="directions">
                                    <DirectionsIcon />
                                </IconButton> */}
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {loadingSearch ? <GreenLinearProgress variant="query" /> :
                                        cart.showItemSelected
                                            ?
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.coverCard}
                                                    image={cart.itemSelected.img}
                                                    title={cart.itemSelected.name}
                                                />
                                                <div className={classes.detailsCard}>
                                                    <CardContent className={classes.contentCard}>
                                                        <Typography component="h5" variant="h5">
                                                            {cart.itemSelected.name}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            {cart.itemSelected.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <div className={classes.controlsCard}>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            Valor: {parseFloat(cart.itemSelected.p_final).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            - Estoque: {cart.itemSelected.stock}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Button onClick={() => insertItemInCart()} startIcon={<AddShoppingCartIcon />} variant="contained">Adicionar ao Carrinho</Button>

                                            </Card>
                                            : <Typography component="h5" variant="h5">
                                                Nenhum produto selecionado ou sendo procurado...
                                            </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        cart.itens.length > 0 &&
                                        <Grid container justify="space-between" spacing={5} >
                                            <Grid item xs={7} >
                                                {
                                                    selectedClient ?
                                                        <Fab onClick={() => finalizarCompra()} className="mr-2" variant="extended" style={{ backgroundColor: 'green' }} color="primary" aria-label="add">
                                                            <DoneIcon style={{ marginRight: 10 }} className={classes.extendedIcon} />
                                                            Finalizar Venda
                                                        </Fab>
                                                        : <Fab onClick={() => enableToSelectClient()} className="mr-2" variant="extended" style={{ backgroundColor: 'green' }} color="primary" aria-label="add">
                                                            {/* <DoneIcon style={{ marginRight: 10 }} className={classes.extendedIcon} /> */}
                                                            Selecionar Cliente
                                                        </Fab>
                                                }

                                                <Fab onClick={() => resetCart()} color="primary" style={{ backgroundColor: 'red', marginLeft: 10 }} variant="extended" aria-label="edit">
                                                    Apagar Carrinho
                                                </Fab>

                                            </Grid>

                                            <Grid item xs={5} alignContent="flex-end" style={{ textAlign: 'right' }}>
                                                {
                                                    loadingCartValue ? <GreenLinearProgress variant="query" />
                                                        : <>
                                                            <Typography component="p" variant="h7" color="inherit" noWrap className={classes.title}>
                                                                Valor Total do Carrinho:
                                                            </Typography>
                                                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                                                {parseFloat(cart.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                            </Typography>
                                                        </>
                                                }
                                            </Grid>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            {loadingCartTable ? <GreenLinearProgress variant="query" /> :
                                <TableCart data={cart.itens} />
                            }
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
            <Dialog open={openDialog} onClose={handleCloseDialog} TransitionComponent={TransitionComponent}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {/* {selectedItem.name} */}
                            Selecione o Cliente para a venda
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={deleteItem}>
                            DELETAR
                        </Button>
                        <Button autoFocus color="inherit" onClick={saveNewItem}>
                            Salvar
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Fab onClick={() => window.location.href = "../clientes"} variant="extended" style={{ borderRadius: 0, backgroundColor: 'green' }} color="primary" aria-label="add">
                    {/* <DoneIcon style={{ marginRight: 10 }} className={classes.extendedIcon} /> */}
                    Adicionar Cliente Novo
                </Fab>
                <MaterialTable
                    title=""
                    localization={{ toolbar: { searchPlaceholder: 'Buscar' } }}
                    columns={TableColumns}
                    data={users}
                    icons={tableIcons}
                    onRowClick={(event, item) => {
                        let newCart = cart;
                        newCart.cliente = item;

                        setCart(newCart);
                        localCart(JSON.stringify(newCart));
                        setOpenDialog(false);
                        setSelectedClient(true);
                        // console.log(item);
                        // console.log(cart);
                    }}
                />
            </Dialog>

            <Snackbar
                open={snackOpen}
                onClose={handleSnackClose}
                TransitionComponent={SlideTransition}
                message={messageSnackBar}
                action={
                    <React.Fragment>
                        {/* <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                      </Button> */}
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleSnackClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}