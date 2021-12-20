import React, { useState, useEffect } from "react";
// ** Import Material-Ui Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// ** Import Actions
import { API } from "../hooks";

const DepositForm = ({ 
    title, 
    openDialog, 
    handleCloseDialog, 
    formActions,
    formData
}) => {
    // ** Declare States
    const [roles, setRoles] = useState([]);
    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    // ** Declare Actions
    const handleSubmit = e => {
        e.preventDefault();
        if(formData.id){
            formActions.update({
                id : formData.id,
                name : name, 
                pid : pid,
            })
        } else {
            formActions.add({
                name : name, 
                pid : pid
            })
        }
    }
    // ** Declare Effects
    useEffect(() => {
        (async () => {
            const result = await API.getRoles();
            setRoles(result);
        })();
        setName(formData.name || "");
        setPid(formData.pid || "");
    }, [formData])
    return(
        <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog} 
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="users-select">Users</InputLabel>
                                <Select
                                    labelId="users-select"
                                    value={pid}
                                    onChange={(e) => setPid(e.target.value)}
                                >
                                    {roles.map((item, idx) => {
                                        return(
                                            <MenuItem key={idx} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
export default DepositForm;