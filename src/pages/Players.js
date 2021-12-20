import React, { useState, useEffect } from "react";
// ** Import Material-Ui DataGrid
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbar
} from '@material-ui/data-grid';
// ** Import Material-Ui Components
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// ** Import Actions
import { useSelector, useDispatch } from 'react-redux';
import { players_store } from "../redux/actions/players/players";
import { API } from "../hooks";
import { checkResponse } from "../theme";
// ** Import Assets
import Countries from "../config/countries.json";
import useStyles from "../assets/styles";
// ** Import Material-Ui Icons
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// ** Import Other Components
import PlayerForm from "../components/PlayerForm";
import DepositForm from "../components/DepositForm";

const Players = () => {
    // ** Declare Maintainers
    const classes = useStyles.grid();
    const dispatch = useDispatch();
    const { players } = useSelector(state => state.players);
    const { session } = useSelector(state => state.auth);
    // ** Declare States
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [depositDialog, setDepositDialog] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formData, setFormData] = useState("");
    // ** Declare Effects
    useEffect(() => {
        (async () => {
            const result = await API.getPlayers();
            dispatch(players_store(result));
            setLoading(false);
        })();
    }, [dispatch])

    // ** Declare Actions
    const handleEdit = user => {
        setOpenDialog(true);
        setFormData(user);
        setFormTitle("Edit User");
    }
    const handleRemove = user => {
        setLoading(true);
        (async () => {
            const result = await API.removePlayers(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleEnable = user => {
        setLoading(true);
        (async () => {
            const result = await API.enablePlayers(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleBlock = user => {
        setLoading(true);
        (async () => {
            const result = await API.blockPlayers(user);
            checkResponse(result);
            setLoading(false);
            reload();
        })();
    }
    const handleDeposit = (user) => {
        setFormTitle("Deposit");
        setFormData(user)
        setDepositDialog(true);
    }
    const reload = () => {
        setLoading(true);
        (async () => {
            const result = await API.getPlayers();
            dispatch(players_store(result));
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
    const handleMultiBlock = () => {
        if(selectedItems.length){
            handleBlock(selectedItems);
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
        setFormTitle("Add New User");
        setOpenDialog(true);
        setFormData({});
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleCloseDepositDialog = () => {
        setDepositDialog(false);
    }
    const formActions = {
        update : async (data) => {
            const result = await API.updatePlayer(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        },
        add : async (data) => {
            const result = await API.addNewPlayer(data);
            checkResponse(result);
            handleCloseDialog();
            reload();
        }
    }
    const depositActions = {
        apply : async (data) => {
            data.depositerId = session.id;
            const result = await API.depositPlayer(data);
            checkResponse(result);
            handleCloseDepositDialog();
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
                    <Tooltip title="Deposit" aria-label="Deposit">
                        <IconButton 
                            onClick={() => handleDeposit(row)}
                            className={classes.tools} 
                        >
                            <CreditCardIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Withdraw" aria-label="Withdraw">
                        <IconButton 
                            onClick={() => handleEdit(row)}
                            className={classes.tools} 
                        >
                            <AccountBalanceIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton 
                        onClick={() => handleEdit([row.id])}
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
                            onClick={() => handleEnable([row.id])}
                            className={classes.tools} 
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                    ) : (
                        <IconButton 
                            onClick={() => handleBlock([row.id])}
                            className={classes.tools} 
                        >
                            <BlockOutlinedIcon />
                        </IconButton>
                    )}
                </>
            )
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 112,
            renderCell: ({row}) => (
                <Avatar className={classes.avatar} alt={row.firstname} src={row.avatar} />
            )
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            width: 150,
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: ({row}) => (
                row.status ? (
                    <Chip 
                        icon={<CheckCircleRoundedIcon className={classes.allowChipIcon} />}
                        label="Allow"
                        size="small"
                    />
                ) : (
                    <Chip 
                        icon={<ErrorRoundedIcon className={classes.blockChipIcon} />}
                        label="Block"
                        size="small"
                    />
                )
            ) 
        },
        { field: 'balance', headerName: 'Balance', width: 100 },
        { field: 'bonusbalance', headerName: 'Bonus Balance', width: 100 },
        { field: 'currency', headerName: 'Currency', width: 100 },
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'address', headerName: 'Address', width: 250 },
        { 
            field: 'birthday', 
            headerName: 'Birthday', 
            renderCell:({row}) => (new Date(row.birthday).toLocaleDateString())
        },
        { field: 'company', headerName: 'Company', width: 150 },
        { 
            field: 'country', 
            headerName: 'Country', 
            width: 150,
            renderCell: ({row}) => (
                <>
                    <img src={`https://flagcdn.com/20x15/${row.country.toLowerCase()}.png`} alt={row.country} />
                    <div className={classes.spacing} />
                    {Countries.find((item) => item.code === row.country).label || ""}
                </>
            )
        },
        { field: 'ip', headerName: 'IP Address', width: 100 },
        { field: 'phone', headerName: 'Phone', width: 100 },
        { field: 'zipCode', headerName: 'Zip Code', width: 100 },
        { 
            field: 'idVerify', 
            headerName: 'ID Verify', 
            width: 100,
            renderCell: ({row}) => (
                row.idVerify ? 
                    <Chip icon={<VerifiedUserRoundedIcon className={classes.verifyChipIcon} />} label="Verified" size="small" />
                :   <Chip icon={<HelpRoundedIcon className={classes.nonVerifyChipIcon} />} label="None" size="small" />
            ) 
        },
        { 
            field: 'emailVerify', 
            headerName: 'Email Verify', 
            width: 110,
            renderCell: ({row}) => (
                row.emailVerify ? 
                    <Chip icon={<VerifiedUserRoundedIcon className={classes.verifyChipIcon} />} label="Verified" size="small" />
                :   <Chip icon={<HelpRoundedIcon className={classes.nonVerifyChipIcon} />} label="None" size="small" />
            ) 
        },
        { 
            field: 'subscribe', 
            headerName: 'Subscribed', 
            width: 150,
            renderCell: ({row}) => (
                row.subscribe ? 
                    <Chip icon={<VerifiedUserRoundedIcon className={classes.verifyChipIcon} />} label="Verified" size="small" />
                :   <Chip icon={<HelpRoundedIcon className={classes.nonVerifyChipIcon} />} label="None" size="small" />
            ) 
        },
        { 
            field: 'firstDeposit', 
            headerName: 'FD Date', 
            width: 250,
            renderCell:({row}) => (new Date(row.firstDeposit).toLocaleString())
        },
        { 
            field: 'joinedIn', 
            headerName: 'Joined Date', 
            width: 200,
            renderCell:({row}) => (new Date(row.joinedIn).toLocaleString())
        },
        { 
            field: 'updatedIn', 
            headerName: 'Updated Date', 
            width: 200,
            renderCell:({row}) => (new Date(row.updatedIn).toLocaleString())
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
                <Button onClick={handleMultiBlock}>
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

    return (
        <>
            <DataGrid 
                autoHeight 
                checkboxSelection 
                disableSelectionOnClick
                pageSize={10}
                rowHeight={88}
                rows={players} 
                loading={loading}
                columns={columns}
                components={{
                    Toolbar : GridToolBarComponent
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelectedItems(newSelection.selectionModel);
                }}
            />
            <PlayerForm 
                formTitle={formTitle}
                formActions={formActions}
                formData={formData}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
            <DepositForm 
                formTitle={formTitle}
                openDialog={depositDialog}
                formData={formData}
                handleCloseDialog={handleCloseDepositDialog}
                formActions={depositActions}
            />
        </>
    );
}
export default Players;