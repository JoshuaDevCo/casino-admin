import React, {useEffect, useState} from "react";
// ** Import Material-Ui Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";

const GameTypesForm = ({ 
    title, 
    openDialog, 
    handleCloseDialog, 
    formActions,
    formData
}) => {
    // ** Declare States
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [order, setOrder] = useState(0);
    // ** Declare Effects
    useEffect(() => {
        setName(formData.name || "");
        setIcon(formData.icon || "");
        setOrder(formData.order || 0);
    }, [formData]);
    // ** Declare Actions
    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            name, icon, order
        }
        if(formData.id){
            data.id = formData.id;
            formActions.update(data)
        } else {
            formActions.add(data)
        }
    }
    
    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                required
                                label="Name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                margin="dense"
                                id="icon"
                                required
                                label="Icon"
                                type="text"
                                value={icon}
                                onChange={e => setIcon(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                margin="dense"
                                id="order"
                                required
                                label="Order"
                                type="number"
                                value={order}
                                onChange={e => setOrder(e.target.value)}
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
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
export default GameTypesForm;