import React, { useState, useEffect } from "react";
// ** Import Material-Ui DataGrid
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbar
} from '@material-ui/data-grid';
// ** Import Material-Ui Components
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
// ** Import Material-Ui Icons
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
// ** Import Actions
import { useSelector, useDispatch } from 'react-redux';
import { gameTypes_store } from "../redux/actions/games";
import { providers_store } from "../redux/actions/providers";
import { checkResponse } from "../theme";
import { API } from "../hooks";
// ** Import Assets
import useStyles from "../assets/styles";
// ** Import Other Components
import ProviderForm from "../components/ProviderForm";

const Games = () => {
    // ** Declare Maintainers
    const classes = useStyles.grid();
    const dispatch = useDispatch();
    const { providers } = useSelector((state) => state.providers)
    const { gameTypes } = useSelector((state) => state.games)
    // ** Declare States
    const [loading, setLoading] = useState(true);       
    const [page, setPage] = useState(0);  
    const [perPage, setPerPage] = useState(10);        
    const [openDialog, setOpenDialog] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formData, setFormData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeTab, setActiveTab] = React.useState(0);
    // ** Declare Effects
    useEffect(() => {
        setLoading(true);
        (async () => {
            let result = await API.getGameTypes();
            dispatch(gameTypes_store(result));
            (async () => {
                result = await API.getProviders(result[activeTab]);
                dispatch(providers_store(result));
                setLoading(false);
            })();
        })();
    }, [dispatch, activeTab])
    // ** Declare Actions
    const changeActiveTab = (event, newValue) => {
        setPage(0);
        setActiveTab(newValue);
    };
    const reload = () => {
        setLoading(true);
        (async () => {
            const result = await API.getProviders(gameTypes[activeTab]);
            dispatch(providers_store(result));
            setLoading(false);
        })();
    }
    const changePage = (e, value) => {
        setPage(value - 1);
    }
    const handleEdit = user => {
        setOpenDialog(true);
        setFormData(user);
        setFormTitle("Edit User");
    }
    const handleAddAction = () => {
        setFormTitle("Add New User");
        setOpenDialog(true);
        setFormData({});
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleRemove = user => {
        setLoading(true);
        (async () => {
            const result = await API.removeProviders(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleEnable = user => {
        setLoading(true);
        (async () => {
            const result = await API.enableProviders(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleDisable = user => {
        setLoading(true);
        (async () => {
            const result = await API.disableProviders(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleMultiRemove = () => {
        if(selectedItems.length){
            handleRemove(selectedItems);
        } else {
            alert("Please select users to remove", "info");
        }
    }
    const handleMultiDisable = () => {
        if(selectedItems.length){
            handleDisable(selectedItems);
        } else {
            alert("Please select users to block", "info");
        }
    }
    const handleMultiEnable = () => {
        if(selectedItems.length){
            handleEnable(selectedItems);
        } else {
            alert("Please select users to enable", "info");
        }
    }
    const formActions = {
        update : async (data) => {
            const result = await API.updateProvider(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        },
        add : async (data) => {
            const result = await API.addNewProvider(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        }
    }

    // ** Declare Grid Components
    const columns = [
        { 
            field: 'action', 
            headerName: 'Actions', 
            width: 150,
            renderCell: ({row}) => (
                <>
                    <IconButton 
                        className={classes.tools} 
                        onClick={() => handleEdit(row)}
                    >
                        <TuneRoundedIcon />
                    </IconButton>
                    <IconButton 
                        className={classes.tools} 
                        onClick={() => handleRemove([row])}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton className={classes.tools}>
                        <ArrowUpwardRoundedIcon />
                    </IconButton>
                    <IconButton className={classes.tools}>
                        <ArrowDownwardRoundedIcon />
                    </IconButton>
                </>
            )
        },
        { 
            field: 'order', 
            headerName: 'Order', 
            width: 100,
        },
        { 
            field: 'providerName', 
            headerName: 'Provider Name', 
            width: 200,
        },
        { 
            field: 'agregator', 
            headerName: 'Agregator', 
            width: 100,
        },
        { 
            field: 'revenuType', 
            headerName: 'Revenu Type', 
            width: 120,
        },
        { 
            field: 'money', 
            headerName: 'Money', 
            width: 120,
        },
        { 
            field: 'percent', 
            headerName: 'Percent', 
            width: 120,
        },
        { 
            field: 'route', 
            headerName: 'Route', 
            width: 120,
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: ({row}) => (
                row.status ? (
                    <Chip 
                        icon={<CheckCircleRoundedIcon className={classes.allowChipIcon} />}
                        label="Enabled"
                        size="small"
                    />
                ) : (
                    <Chip 
                        icon={<BlockRoundedIcon className={classes.blockChipIcon} />}
                        label="Disabled"
                        size="small"
                    />
                )
            ) 
        },
        { 
            field: 'gameType', 
            headerName: 'Game Type', 
            width: 150,
            renderCell: ({row}) => (
                <Chip
                    icon={
                        <Icon className={classes.chipIcon}>
                            {row.gameType.icon}
                        </Icon>
                    }
                    label={row.gameType.name}
                    size="small"
                />
            )
        }
    ];
    const GridToolBarComponent = () => (
        <GridToolbarContainer className={classes.toolbar}>
            <div>
                <Button onClick={handleAddAction}>
                    <AddCircleOutlineRoundedIcon />
                    <div className={classes.spacing} />
                    Add
                </Button>
                <Button onClick={handleMultiRemove}>
                    <DeleteRoundedIcon />
                    <div className={classes.spacing} />
                    Remove
                </Button>
                <Button onClick={handleMultiEnable}>
                    <CheckCircleOutlineRoundedIcon />
                    <div className={classes.spacing} />
                    Enable
                </Button>
                <Button onClick={handleMultiDisable}>
                    <BlockOutlinedIcon />
                    <div className={classes.spacing} />
                    Disable
                </Button>
                <Button onClick={reload}>
                    <RotateLeftIcon />
                    <div className={classes.spacing} />
                    Reload
                </Button>
            </div>
            <GridToolbar />
        </GridToolbarContainer>
    );
    const GridFooter = ({ state }) => {
        return(
            <div className={classes.footer}>
                <FormControl className={classes.formControl}>
                    <div>Per Page</div>
                    <Select
                        value={perPage}
                        onChange={e => {
                            setPerPage(e.target.value);
                            setPage(0)
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <Pagination 
                    size="small"
                    page={state.pagination.page + 1}
                    count={state.pagination.pageCount} 
                    showFirstButton 
                    showLastButton 
                    onChange={changePage}
                />
            </div>
        )
    }
    return(
        <>
            <Tabs
                value={activeTab}
                onChange={changeActiveTab}
                variant="fullWidth"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
            >
                { gameTypes.map((item, idx) => (
                    <Tab key={idx} label={item.name} icon={<Icon>{item.icon}</Icon>} />
                ))}
            </Tabs>
            <DataGrid 
                autoHeight 
                checkboxSelection 
                pagination
                disableSelectionOnClick
                rows={providers} 
                page={page}
                pageSize={perPage}
                loading={loading}
                columns={columns}
                components={{
                    Toolbar : GridToolBarComponent,
                    Footer : GridFooter
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelectedItems(newSelection.selectionModel);
                }}
            />
            <ProviderForm 
                formTitle={formTitle}
                formActions={formActions}
                formData={formData}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
        </>
    )
}

export default Games;