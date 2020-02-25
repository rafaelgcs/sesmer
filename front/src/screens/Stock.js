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
import MaterialTable from 'material-table';

// Components
import TableCart from '../components/TableCart';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Footer from '../components/Footer';

// Services
import { logout } from '../services/auth';
import api from '../services/api';


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

//TEST


// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import NumberFormat from 'react-number-format';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';


function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            // decimalSeparator
            isNumericString
            prefix="R$"
            allowNegative={false}
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
const useStylesModal = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'green'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
    },
    margin: {
        // margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        // width: 200,
    },
}));

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

const GreenLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: 'green',
    },
    barColorPrimary: {
        backgroundColor: '#6ad65e',
    },
})(LinearProgress);

function ClientsTable(props) {
    const classes = useStylesModal();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Nome', field: 'name' },
            { title: 'CÓD', field: 'cod' },
            { title: 'P. Unit', field: 'p_unit', type: 'numeric' },
            { title: 'P. Entrada', field: 'p_entrada', type: 'numeric' },
            { title: 'P. Saída', field: 'p_saida', type: 'numeric' },
            { title: 'Saídas', field: 'saidas', type: 'numeric' },
            { title: 'Em Estoque', field: 'stock', type: 'numeric' },
            { title: 'P. Final', field: 'p_final', type: 'numeric' },
        ],
        data: [],
    });
    const [updating, setUpdating] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});
    const [editedItem, setEditedItem] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);

    const openSnack = props.openSnack;
    const setAlertMessage = props.snackBarMessage;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (editedItem) {
            setUpdating(false);
            reloadTable();
            setEditedItem(true);
        }
    };
    const deleteItem = () => {
        setOpen(false);
        // if (editedItem) {
        setUpdating(false);

        deleteRow(selectedItem);
        // }
    };
    const saveNewItem = () => {
        setOpen(false);
        if (editedItem) {
            setUpdating(false);

            updateRow(selectedItem);
        }
    };

    const reloadTable = async () => {
        setUpdating(false);
        const response = await api.get('/product/all');

        const returned = await JSON.stringify(response.data.products);
        const products = await JSON.parse(returned);

        setProducts(products);
        setUpdating(true);
    }

    const newRow = async (newData) => {
        let sentData = {
            name: newData.name,
            cod: newData.cod,
            p_unit: newData.p_unit,
            p_entrada: newData.p_entrada,
            p_saida: newData.p_saida,
            p_final: newData.p_final,
        }
        const response = await api.post('/product/', sentData);

        if (response.data.success) {
            let includeStockItem = {
                mercadoriaId: newData.cod,
                quantidade: newData.stock,
                ultima_data: new Date(),
                saidas: newData.saidas,
            };
            const responseStock = await api.post('/stock/', includeStockItem);
            if (responseStock.data.success) {

                return new Promise((resolve, reject) => {
                    resolve();
                    reloadTable();
                    setEditedItem(true);
                });
            } else {
                return new Promise((resolve, reject) => {
                    reject();
                });
            }
        }
        else {
            return new Promise((resolve, reject) => {
                reject();
            });

        }


    }


    const updateRow = async (newData) => {
        console.log("Chegou no updateRow!");
        console.log(newData);
        let product = {
            id: newData.id,
            cod: newData.cod,
            name: newData.name,
            description: newData.description,
            p_unit: newData.p_unit,
            img: newData.img,
            p_entrada: newData.p_entrada,
            p_saida: newData.p_saida,
            p_final: newData.p_final,
        }

        const response = await api.post('/product/update', product);
        if (response.data.success) {
            let stockToUpdate = {
                mercadoriaId: newData.cod,
                quantidade: newData.stock,
                ultima_data: new Date(),
                saidas: newData.saidas
            };
            const response2 = await api.post('/stock/update', stockToUpdate);

            return new Promise((resolve, reject) => {
                if (response2.data.success) {
                    resolve();
                    reloadTable();
                    setEditedItem(true);
                    setAlertMessage("O produto foi atualizado com sucesso!");
                    openSnack(true);
                } else {
                    reject();
                    reloadTable();
                    setEditedItem(true);
                    setAlertMessage("O produto foi atualizado, mas não foi possível atualizar o estoque!");
                    openSnack(true);
                }

            });
        }
        else {
            return new Promise((resolve, reject) => {
                reject();
                reloadTable();
                setEditedItem(true);
                setAlertMessage("O produto foi atualizado, mas não foi possível atualizar o estoque!");
                openSnack(true);

            });
        }
    }

    const deleteRow = async (dataToDelete) => {
        console.log("Entrou no delete");
        let id = dataToDelete.id;
        let cod = dataToDelete.cod;

        const response = await api.get(`/product/delete/${id}`);

        if (response.data.success) {
            const response2 = await api.get(`/stock/delete/${cod}`);

            if (response2.data.success) {
                reloadTable();
                setEditedItem(true);
                setAlertMessage("O produto foi deletado com sucesso!");
                openSnack(true);
            } else {
                reloadTable();
                setEditedItem(true);
                setAlertMessage("O produto foi deletado, mas não foi possível deletar o estoque!");
                openSnack(true);
            }

        }
        else {
            reloadTable();
            setEditedItem(true);
            setAlertMessage("O produto não foi deletado!");
            openSnack(true);
        }

    }


    React.useEffect(() => {

        if (products.length == 0) {
            (async () => {
                const response = await api.get('/product/all');

                const returned = await JSON.stringify(response.data.products);
                const products = await JSON.parse(returned);
                setProducts(products);
            })();
        }

    });

    return (
        <>
            {
                updating
                    ? <MaterialTable
                        title="Todas as mercadorias"
                        localization={{ toolbar: { searchPlaceholder: 'Buscar' } }}
                        columns={state.columns}
                        data={products}
                        icons={tableIcons}
                        onRowClick={(event, item) => {
                            console.log(item);
                            setSelectedItem(item);
                            handleClickOpen();
                        }}
                        // onRowUpdate
                        // onSelectionChange={reloadTable()}
                        // onOrderChange={reloadTable()}
                        editable={{
                            onRowAdd: async newData =>
                                await newRow(newData),
                            //     onRowUpdate: (newData, oldData) => { updateRow(newData, oldData); reloadTable() }
                            //     ,
                            //     onRowDelete: oldData =>
                            //         new Promise(resolve => {
                            //             setTimeout(() => {
                            //                 resolve();
                            //                 setState(prevState => {
                            //                     const data = [...prevState.data];
                            //                     data.splice(data.indexOf(oldData), 1);
                            //                     return { ...prevState, data };
                            //                 });
                            //             }, 600);
                            //         }),
                        }}
                    />
                    : <GreenLinearProgress variant="query" />
            }

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {selectedItem.name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={deleteItem}>
                            DELETAR
                        </Button>
                        <Button autoFocus color="inherit" onClick={saveNewItem}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <form className="row" style={{ padding: 20 }}>
                    {/* <FormControl>
                        <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
                        <Input
                            // value={values.textmask}
                            // onChange={handleChange('textmask')}
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl> */}
                    <Grid container spacing={3} style={{ marginBottom: 20 }}>
                        <Grid item xs={6}>
                            <FormControl style={{ width: '100%' }}>
                                <TextField
                                    label="Nome"
                                    defaultValue={selectedItem.name}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.name = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl style={{ width: '100%' }}>
                                <TextField
                                    label="Descrição"
                                    defaultValue={selectedItem.description}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.description = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginBottom: 20 }}>
                        <Grid item xs={6}>
                            <FormControl className="col-3" style={{ width: '24%', marginRight: '1%' }}>
                                <TextField
                                    label="P. Entrada"
                                    defaultValue={selectedItem.p_entrada}
                                    // value={values.numberformat}
                                    // onChange={handleChange('numberformat')}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.p_entrada = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </FormControl>
                            <FormControl className="col-3" style={{ width: '24%', marginRight: '1%' }}>
                                <TextField
                                    label="P. Saída"
                                    defaultValue={selectedItem.p_saida}
                                    // value={values.numberformat}
                                    // onChange={handleChange('numberformat')}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.p_saida = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </FormControl>
                            <FormControl className="col-3" style={{ width: '24%', marginRight: '1%' }}>
                                <TextField
                                    label="P. Unitário"
                                    defaultValue={selectedItem.p_unit}
                                    // value={values.numberformat}
                                    // onChange={handleChange('numberformat')}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.p_unit = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </FormControl>
                            <FormControl className="col-3" style={{ width: '24%', }}>
                                <TextField
                                    label="P. Final"
                                    defaultValue={selectedItem.p_final}
                                    // value={values.numberformat}
                                    // onChange={handleChange('numberformat')}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.p_final = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="col-6" style={{ width: '49%', marginRight: '1%' }}>
                                <TextField
                                    label="Código"
                                    defaultValue={selectedItem.cod}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.cod = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                />
                            </FormControl>
                            <FormControl className="col-6" style={{ width: '49%', marginLeft: '1%' }}>
                                <TextField
                                    label="Estoque"
                                    defaultValue={selectedItem.stock}
                                    onChange={(e) => {
                                        let edited = selectedItem;
                                        edited.stock = e.target.value;
                                        setSelectedItem(edited);
                                        setEditedItem(true);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>

        </>
    );
}

export default function StockPage() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loadingAutoComplete = openAutoComplete && options.length === 0;
    const [alertMessage, setAlertMessage] = React.useState("");


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSnackClose = () => {
        setSnackOpen(!snackOpen);
    };
    const _doLoggout = () => {
        logout();
        window.location.href = './';
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    React.useEffect(() => {
        let active = true;

        if (!loadingAutoComplete) {
            return undefined;
        }

        (async () => {
            const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            if (active) {
                setOptions(Object.keys(countries).map(key => countries[key].item[0]));
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
                        Estoque
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Settings />
                    </IconButton>
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
                        <Grid item xs={12}>
                            <ClientsTable openSnack={(e) => setSnackOpen(e)} snackBarMessage={(e) => setAlertMessage(e)} />
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
            <Snackbar
                open={snackOpen}
                onClose={handleSnackClose}
                TransitionComponent={SlideTransition}
                message={alertMessage}
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