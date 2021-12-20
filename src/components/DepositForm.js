import React, { useState } from "react";
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

const DepositForm = ({ 
    formTitle, 
    openDialog, 
    handleCloseDialog, 
    formActions,
    formData
}) => {
    const [category, setCategory] = useState("cash");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        formActions.apply({
            id : formData.id,
            amount : amount, 
            category : category,
            description : description,
            depositer : "missing feature"
        })
    }
    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle>{formTitle}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="amount-select">Amount Type</InputLabel>
                                <Select
                                    labelId="amount-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <MenuItem value="cash">Cash</MenuItem>
                                    <MenuItem value="bonus">Bonus</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="amount"
                                required
                                label="Amount"
                                type="number"
                                autoFocus
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                rowsMax={5}
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
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