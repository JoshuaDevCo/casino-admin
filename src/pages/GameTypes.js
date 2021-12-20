import React, { useEffect, useState } from "react";
// ** Import Material-Ui DataGrid
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbar 
} from '@material-ui/data-grid';
// ** Import Material-Ui Components
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from '@material-ui/core/IconButton';
// ** Import Material-Ui Icons
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
// ** Import Actions
import { useDispatch, useSelector } from "react-redux";
import { gameTypes_store } from "../redux/actions/games";
import { checkResponse } from "../theme";
import { API } from "../hooks";
// ** Import Assets
import useStyles from "../assets/styles";
// ** Import Other Components
import GameTypesForm from "../components/GameTypesForm";

const GameTypes = () => {
    // ** Declare Maintainers
    const classes = useStyles.grid();
    const dispatch = useDispatch();
    const { gameTypes } = useSelector((state) => state.games);
    // ** Declare States
    const [loading, setLoading] = useState(true);       
    const [selectedItems, setSelectedItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formData, setFormData] = useState({});
    // ** Declare Effects
    useEffect(() => {
        (async () => {
            const result = await API.getGameTypes();
            dispatch(gameTypes_store(result));
            setLoading(false);
        })();
    }, [dispatch])
    // ** Declare Actions
    const reload = () => {
        setLoading(true);
        (async () => {
            const result = await API.getGameTypes();
            dispatch(gameTypes_store(result));
            setLoading(false);
        })();
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
    };
    const handleRemove = user => {
        setLoading(true);
        (async () => {
            const result = await API.removeGameTypes(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleEnable = user => {
        setLoading(true);
        (async () => {
            const result = await API.enableGameTypes(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleDisable = user => {
        setLoading(true);
        (async () => {
            const result = await API.disableGameTypes(user);
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
            const result = await API.updateGameType(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        },
        add : async (data) => {
            const result = await API.addNewGameType(data);
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
            width: 80,
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 150,
        },
        { 
            field: 'icon', 
            headerName: 'Icon', 
            width: 150,
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 120,
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
    ]
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
    return( 
        <>
            <DataGrid 
                autoHeight 
                checkboxSelection 
                disableSelectionOnClick
                rows={gameTypes} 
                loading={loading}
                columns={columns}
                components={{
                    Toolbar : GridToolBarComponent,
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelectedItems(newSelection.selectionModel);
                }}
            />
            <GameTypesForm 
                formTitle={formTitle}
                formActions={formActions}
                formData={formData}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
        </>
    )
}
export default GameTypes;