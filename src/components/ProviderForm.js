import React, { useState,useEffect } from "react";
// ** Import Material-Ui Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import InputAdornment from '@material-ui/core/InputAdornment';
// ** Import Actions
import { useSelector } from "react-redux";
// ** Import Assets
import useStyles from "../assets/styles";

const ProviderForm = ({ 
    title, 
    openDialog, 
    handleCloseDialog, 
    formActions,
    formData
}) => {
    // ** Declare Maintainers
    const classes = useStyles.form();
    const { gameTypes } = useSelector((state) => state.games);
    // ** Declare States
    const [providerName, setProviderName] = useState("");
    const [agregator, setAgregator] = useState("");
    const [lunchType, setLunchType] = useState("type1");
    const [route, setRoute] = useState("Direct");
    const [status, setStatus] = useState(true);
    const [revenuType, setRevenuType] = useState("Fixed Monthly");
    const [percent, setPercent] = useState(20);
    const [money, setMoney] = useState(0);
    const [currency, setCurrency] = useState("USD");
    const [gameType, setGameType] = useState("");
    // ** Declare Effects
    useEffect(() => {
        setProviderName(formData.providerName || "");
        setAgregator(formData.agregator || "");
        setLunchType(formData.lunchType || "type1");
        setRoute(formData.route || "Direct");
        setStatus(formData.status === undefined ? true : formData.status);
        setRevenuType(formData.revenuType || "Fixed Monthly");
        setPercent(formData.percent || 20);
        setMoney(formData.money || 0);
        setCurrency(formData.currency || "USD");
        setGameType(formData.gameType ? formData.gameType.id : "");
    }, [formData]);
     // ** Declare Actions
    const handleSubmit = async e => {
        e.preventDefault();
        let data = {
            providerName,
            agregator,
            lunchType,
            route,
            status,
            revenuType,
            percent,
            money,
            currency,
            gameType
        }
        if(formData.id){
            data.id = formData.id;
            formActions.update(data);
        } else {
            formActions.add(data);
        }
    }
    // ** Declare Grid Components
    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="name"
                                required
                                label="Provider Name"
                                type="text"
                                autoFocus
                                value={providerName}
                                onChange={e => setProviderName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="agregator"
                                required
                                label="Agregator"
                                type="text"
                                value={agregator}
                                onChange={e => setAgregator(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="lunchType"
                                required
                                label="Lunch Type"
                                type="text"
                                value={lunchType}
                                onChange={e => setLunchType(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl 
                                fullWidth 
                                required 
                                margin="dense"
                                className={classes.formControl}
                            >
                                <InputLabel id="route-select">Route</InputLabel>
                                <Select
                                    labelId="route-select"
                                    value={route}
                                    onChange={e => setRoute(e.target.value)}
                                >
                                    <MenuItem value="Direct">Direct</MenuItem>
                                    <MenuItem value="Agregator">Agregator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl 
                                fullWidth 
                                required 
                                margin="dense"
                                className={classes.formControl}
                            >
                                <InputLabel id="route-status">Status</InputLabel>
                                <Select
                                    labelId="route-status"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <MenuItem value={true}>Enabled</MenuItem>
                                    <MenuItem value={false}>Disabled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <FormControl 
                                fullWidth 
                                required 
                                margin="dense"
                                className={classes.formControl}
                            >
                                <InputLabel id="revenu-type-select">Revenue Type</InputLabel>
                                <Select
                                    labelId="revenu-type-select"
                                    value={revenuType}
                                    onChange={e => setRevenuType(e.target.value)}
                                >
                                    <MenuItem value="Fixed Monthly">Fixed Monthly</MenuItem>
                                    <MenuItem value="Fixed Annually">Fixed Annually</MenuItem>
                                    <MenuItem value="GGR">GGR</MenuItem>
                                    <MenuItem value="Rake">Rake</MenuItem>
                                    <MenuItem value="MMG-GGR">{'MMG < GGR'}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="dense"
                                id="percent"
                                label="Percent"
                                type="number"
                                required
                                value={percent}
                                onChange={e => setPercent(e.target.value)}
                                InputProps={{
                                    endAdornment : <InputAdornment position="start">%</InputAdornment>
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="money"
                                label="Money"
                                type="number"
                                required
                                value={money}
                                onChange={e => setMoney(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl 
                                fullWidth 
                                required 
                                margin="dense"
                                className={classes.formControl}
                            >
                                <InputLabel id="currency-label">Currency</InputLabel>
                                <Select
                                    labelId="currency-label"
                                    value={currency}
                                    onChange={e => setCurrency(e.target.value)}
                                >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="EURO">EURO</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl 
                                fullWidth 
                                required 
                                margin="dense"
                                className={classes.formControl}
                            >
                                <InputLabel id="game-type">Game Type</InputLabel>
                                <Select
                                    labelId="game-type"
                                    value={gameType}
                                    onChange={e => setGameType(e.target.value)}
                                >
                                    {
                                        gameTypes.map((item, idx) => (
                                            <MenuItem key={idx} value={item.id}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ProviderForm;