import React, {useEffect, useState} from 'react';
// ** Import Material-Ui DataGrid
import { 
    DataGrid,
    GridToolbarContainer,
    GridToolbar
} from '@material-ui/data-grid';
// ** Import Material-Ui Components
// import IconButton from '@material-ui/core/IconButton';
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// ** Import Actions
import { useSelector, useDispatch } from 'react-redux';
import { transactions_store } from "../redux/actions/finance";
import { API } from "../hooks";
// ** Import Material-Ui Icons
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
// ** Import Assets
import useStyles from "../assets/styles";

const Transactions = () => {
    // ** Declare Maintainers
    const classes = useStyles.grid();
    const dispatch = useDispatch();
    const { transactions } = useSelector(state => state.finance);
    // ** Declare States
    const [loading, setLoading] = useState(true);
    // ** Declare Effects
    useEffect(() => {
        (async () => {
            const result = await API.getTransactions();
            dispatch(transactions_store(result));
            setLoading(false);
        })();
    }, [dispatch]);
    // ** Declare Actions
    const reload = () => {
        setLoading(true);
        (async () => {
            const result = await API.getTransactions();
            dispatch(transactions_store(result));
            setLoading(false);
        })();
    }
    // ** Declare Grid Components
    const columns = [
        {
            field: "fromName",
            headerName: "From",
            width: 150,
            renderCell: ({row}) => (
                <Tooltip title={row.fromName}>
                    <div>{row.fromName}</div>
                </Tooltip>
            )
        },
        {
            field: "toName",
            headerName: "To",
            width: 150,
            renderCell: ({row}) => (
                <Tooltip title={row.toName}>
                    <div>{row.toName}</div>
                </Tooltip>
            )
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: ({row}) => (
                <Chip 
                    icon={<CheckCircleRoundedIcon className={classes.allowChipIcon} />}
                    label={row.status}
                    size="small"
                />
            )
        },
        {
            field: "commission",
            headerName: "Commission",
            width: 80
        },
        {
            field: "currency",
            headerName: "Currency",
            width: 120
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            renderCell: ({row}) => (
                <Tooltip title={row.description}>
                    <div className={classes.workWrap}>
                        {row.description}
                    </div>
                </Tooltip>
            )
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.amount}>
                    <div>{row.amount}</div>
                </Tooltip>
            )
        },
        {
            field: "type",
            headerName: "Type",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.type}>
                    <div>{row.type}</div>
                </Tooltip>
            )
        },
        {
            field: "category",
            headerName: "Category",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.category}>
                    <div>{row.category}</div>
                </Tooltip>
            )
        },
        {
            field: "fromLastBalance",
            headerName: "Last Balance(from)",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.fromLastBalance}>
                    <div>{row.fromLastBalance}</div>
                </Tooltip>
            )
        },
        {
            field: "fromUpdatedBalance",
            headerName: "Updated Balance(from)",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.fromUpdatedBalance}>
                    <div>{row.fromUpdatedBalance}</div>
                </Tooltip>
            )
        },
        {
            field: "toLastBalance",
            headerName: "Last Balance(to)",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.toLastBalance}>
                    <div>{row.toLastBalance}</div>
                </Tooltip>
            )
        },
        {
            field: "toUpdatedBalance",
            headerName: "Updated Balance(to)",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={row.toUpdatedBalance}>
                    <div>{row.toUpdatedBalance}</div>
                </Tooltip>
            )
        },
        {
            field: "date",
            headerName: "Date",
            width: 120,
            renderCell: ({row}) => (
                <Tooltip title={new Date(row.date).toLocaleDateString()}>
                    <div>{new Date(row.date).toLocaleDateString()}</div>
                </Tooltip>
            )
        }
    ];
    const GridToolBarComponent = () => (
        <GridToolbarContainer className={classes.toolbar}>
            <div>
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
                rows={transactions} 
                loading={loading}
                columns={columns}
                components={{
                    Toolbar : GridToolBarComponent
                }}
            />
        </>
    )
}
export default Transactions;