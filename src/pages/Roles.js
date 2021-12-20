import React, {useEffect, useState} from 'react';
// ** Import Material-Ui DataGrid
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbar
} from '@material-ui/data-grid';
// ** Import Material-Ui Components
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
// ** Import Actions
import { useSelector, useDispatch } from 'react-redux';
import { roles_store } from "../redux/actions/users/roles";
import { API } from "../hooks";
import { checkResponse } from "../theme";
// ** Import Material-Ui Icons
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
// ** Import Assets
import useStyles from "../assets/styles";
// ** Import Other Components
import RolesForm from "../components/RolesForm";

const Roles = () => {
    // ** Declare Maintainers
    const classes = useStyles.grid();
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.users);
    // ** Declare States
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formData, setFormData] = useState("");
    // ** Declare Effects
    useEffect(() => {
        (async () => {
            const result = await API.getRoles();
            dispatch(roles_store(result));
            setLoading(false);
        })();
    }, [dispatch])
    // ** Declare Actions
    const handleEdit = user => {
        setOpenDialog(true);
        setFormData(user);
        setFormTitle("Edit Role");
    }
    const handleRemove = user => {
        setLoading(true);
        (async () => {
            const result = await API.removeRoles(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleEnable = user => {
        setLoading(true);
        (async () => {
            const result = await API.enableRoles(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleDisable = roles => {
        setLoading(true);
        (async () => {
            const result = await API.disableRoles(roles);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const reload = () => {
        setLoading(true);
        (async () => {
            const result = await API.getRoles();
            dispatch(roles_store(result));
            setLoading(false);
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
    const handleAddAction = () => {
        setFormTitle("Add New Role");
        setOpenDialog(true);
        setFormData({});
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const formActions = {
        update : async (data) => {
            const result = await API.updateRole(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        },
        add : async (data) => {
            const result = await API.addNewRole(data);
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
            width: 180,
            renderCell: ({row}) => (
                <>
                    <IconButton 
                        onClick={() => handleRemove([row])} 
                        className={classes.tools} 
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(row)} 
                        className={classes.tools} 
                    >
                        <TuneRoundedIcon />
                    </IconButton>
                    {!row.status ? (
                        <IconButton 
                            className={classes.tools} 
                            onClick={() => handleEnable([row])} 
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                    ) : (
                        <IconButton 
                            onClick={() => handleDisable([row])} 
                            className={classes.tools} 
                        >
                            <BlockOutlinedIcon />
                        </IconButton>
                    )}
                </>
            )
        },
        {
            field: 'id',
            headerName: 'Id',
            width: 250,
        },
        {
            field: 'pid',
            headerName: 'Parent Id',
            width: 250,
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 250,
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
        }
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
                    Block
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
                pageSize={10}
                rowHeight={88}
                rows={roles} 
                loading={loading}
                columns={columns}
                components={{
                    Toolbar : GridToolBarComponent
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelectedItems(newSelection.selectionModel);
                }}
            />
            <RolesForm 
                formTitle={formTitle}
                formActions={formActions}
                formData={formData}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
        </>
    )
}
export default Roles;