import React, { useState,useEffect } from "react";
// ** Import Material-Ui Components
import DateFnsUtils from '@date-io/date-fns';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
// ** Import Assets
import Countires from "../config/countries.json";
import useStyles from "../assets/styles";

const UserForm = ({ 
    title, 
    openDialog, 
    handleCloseDialog, 
    formActions,
    formData
}) => {
    // ** Declare Maintainers
    const classes = useStyles.form();
    // ** Declare States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    // ** Declare Effects
    useEffect(() => {
        setEmail(formData.email || "");
        setPassword(formData.password || "");
        setCPassword(formData.password || "");
        setFirstName(formData.firstname || "");
        setLastName(formData.lastname || "");
        setCompany(formData.company || "");
        setCountry(formData.country || "AD");
        setZipCode(formData.zipCode || "");
        setPhone(formData.phone || "");
        setAddress(formData.address || "");
        setGender(formData.gender || "");
        if(formData.birthday){
            setBirthday(new Date(formData.birthday));
        } else {
            setBirthday(new Date());
        }
    }, [formData]);
     // ** Declare Actions
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handleCountry = (e, v) => {
        if(v){
            setCountry(v.code);
        }
    }
    const handleBirthdayChange = (date) => {
        setBirthday(date);
    };
    const countryToFlag = isoCode => {
        return <img src={`https://flagcdn.com/20x15/${isoCode.toLowerCase()}.png`} alt={isoCode} />
    }
    const handleSubmit = async e => {
        e.preventDefault();
        let rdata = {
            email : email,
            password : password,
            firstname : firstName,
            lastname : lastName,
            company : company,
            country : country,
            zipCode : zipCode,
            phone : phone,
            address : address,
            gender : gender,
            birthday : birthday
        }
        if(formData.id){
            rdata.id = formData.id;
            rdata.updatedIn = new Date();
            formActions.update(rdata);
        } else {
            formActions.add(rdata);
        }
    }
    // ** Declare Grid Components
    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstname"
                                required
                                label="First Name"
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="lastname"
                                required
                                label="Last Name"
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                margin="dense"
                                id="email"
                                required
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-lable"
                                    id="gender"
                                    value={gender}
                                    onChange={handleGender}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="password"
                                required
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="cpassword"
                                required
                                label="Confirm Password"
                                type="password"
                                value={cPassword}
                                onChange={e => setCPassword(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="company"
                                label="Company"
                                type="text"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="phone"
                                label="Phone"
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                margin="dense"
                                id="zipcode"
                                label="Zip Code"
                                type="text"
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="dense"
                                    id="date-picker-inline"
                                    label="Birthday"
                                    fullWidth
                                    value={birthday}
                                    onChange={handleBirthdayChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="address"
                                label="Address"
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="country-select"
                                options={Countires}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                fullWidth
                                value={Countires.find((value) => value.code === country)}
                                onChange={handleCountry}
                                getOptionLabel={(option) => option.label}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{countryToFlag(option.code)}</span>
                                        {option.label} ({option.code}) +{option.phone}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        variant="standard"
                                        fullWidth
                                        margin="dense"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'country', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
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

export default UserForm;