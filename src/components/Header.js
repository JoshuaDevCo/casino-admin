/*jshint esversion: 6 */
import React, {useEffect, useState} from "react";
import clsx from 'clsx';

// ** Import Material-Ui Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';

// ** Import Material-Ui Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import FingerprintRoundedIcon from '@material-ui/icons/FingerprintRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ContactlessRoundedIcon from '@material-ui/icons/ContactlessRounded';
import GamesRoundedIcon from '@material-ui/icons/GamesRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import UpdateIcon from '@material-ui/icons/Update';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import HowToRegRoundedIcon from '@material-ui/icons/HowToRegRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
// ** Import Actions
import { History } from "../theme";
import { toggle_dark_mode_store } from "../redux/actions/config";
import { useSelector, useDispatch } from "react-redux";
// ** Import Assets
import useStyles from "../assets/styles";
import Logo from "../assets/img/logo.png";

// ** Import Other Components
import Clock from "./Clock";
import { Scrollbars } from 'react-custom-scrollbars';

const Header = ({ open, openDrawer, closeDrawer }) => {
    // ** Declare Maintainers
    const { session } = useSelector(state => state.auth);
    const { isDarkMode } = useSelector(state => state.config);
    console.log("isDarkMode", isDarkMode)
    const classes = useStyles.header();
    const dispatch = useDispatch();
    // ** Declare States
    const [profileOptions, setProfileOptions] = useState(null);
    const [values, setValues] = useState({});

    // ** Declare Actions
    const handleChange = (prop) => {
        setValues({ [prop]: !values[prop] });
        const activeDrawers = JSON.stringify({[prop]:!values[prop]});
        sessionStorage.setItem("activeDrawers", activeDrawers);
    };
    const handleDarkMode = () => {
        dispatch(toggle_dark_mode_store(!isDarkMode));
    };
    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rememberMe");
        window.location.reload();
        return;
    };
    const handleBack = () => {
        History.goBack();
    };
    const openProfileOptions = (event) => {
        setProfileOptions(event.currentTarget);
    };
    const closeProfileOptions = () => {
        setProfileOptions(null);
    };
    const getPageName = () => {
        let pName = pageName[0];
        if(pName){
            pName = pName.split("");
            pName[0] = pName[0].toUpperCase();
            pName = pName.join("");
            pName = pName.replace("-", " ");
        }
        return pName;
    };
    const gotoPage = page => {
        closeProfileOptions();
        History.push(`/${page}`);
    };

    let pageName = History.location.pathname.split("/");
    pageName.splice(0, 1);

    // ** Declare Effects
    useEffect(() => {
        const activeDrawers = sessionStorage.getItem("activeDrawers");
        if(activeDrawers)
            setValues(JSON.parse(activeDrawers));
        else
            setValues({ activeDashboard : true });
    }, []);
    // ** Render Components
    return(
        <>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={openDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.spacing} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <IconButton onClick={() => handleDarkMode()}>
                        {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                    <Button onClick={e => openProfileOptions(e)}>
                        <div className={classes.userInfo}>
                            <Typography color="primary" variant="subtitle1">
                                {`${session.firstname} ${session.lastname}`}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {session.email}
                            </Typography>
                        </div>
                        <Avatar src={session.avatar} className={classes.avatar} />
                    </Button>
                    <Popover 
                        open={Boolean(profileOptions)}
                        anchorEl={profileOptions}
                        onClose={() => closeProfileOptions()}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                        <List component="nav">
                            <ListItem button onClick={() => gotoPage("profile")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <VpnKeyRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change Password" />
                            </ListItem>
                            <ListItem button onClick={() => handleLogOut()}>
                                <ListItemIcon>
                                    <ExitToAppOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Popover>
                </Toolbar>
                <Toolbar className={clsx(classes.toolbar, classes.toolbarNested)}>
                    <IconButton onClick={() => handleBack()}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {getPageName()}
                    </Typography>
                    <Breadcrumbs  
                        separator={
                            <FiberManualRecordIcon className={classes.breakCrumbsSeperate} />
                        } 
                        aria-label="breadcrumb"
                        className={classes.breadcrumbs}
                    >
                        <Link color="inherit" to="/">
                            <HomeRoundedIcon />
                        </Link>
                        {
                            pageName.map((item, idx) => {
                                return(
                                    <Link key={idx} color="inherit" to="/">
                                        {item}
                                    </Link>
                                )
                            })
                        }
                    </Breadcrumbs>
                    <div className={classes.spacing} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img src={Logo} alt="logo" />
                    <div className={classes.spacing} />
                    <IconButton onClick={closeDrawer}>
                        <DoubleArrowIcon 
                            className={classes.hideMenuIcon} 
                        />
                    </IconButton>
                </div>
                <Toolbar className={clsx(classes.toolbar, classes.toolbarNested, classes.clockParent)}>
                    <Clock />
                </Toolbar>
                <Divider />
                <Scrollbars className={classes.scrollbar}>
                    <List className={classes.list}>
                        <ListItem button 
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeDashboard"]
                            })} 
                            onClick={() => handleChange("activeDashboard")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <DashboardRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Dashboard" />
                        </ListItem>
                        <ListItem button
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeNotification"]
                            })} 
                            onClick={() => handleChange("activeNotification")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <NotificationsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Notification" />
                        </ListItem>
                        <ListItem button
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeChat"]
                            })} 
                            onClick={() => handleChange("activeChat")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <ChatRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Chat" />
                        </ListItem>
                        <ListItem button
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeBlog"]
                            })} 
                            onClick={() => handleChange("activeBlog")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <ForumRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Blog" />
                        </ListItem>
                        <ListItem button 
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeUser"]
                            })} 
                            onClick={() => handleChange("activeUser")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <AssignmentIndRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="User" />
                            {values["activeUser"] ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                        </ListItem>
                        <Collapse in={values["activeUser"]} timeout="auto">
                            <List disablePadding>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/user/roles")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <VerifiedUserRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Roles" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/user/users")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <GroupRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Users" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <HowToRegRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Active Users" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/user/players")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <SportsEsportsRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Players" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <GamesRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Active Players" 
                                    />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button 
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeGame"]
                            })} 
                            onClick={() => handleChange("activeGame")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <SportsEsportsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Game" />
                            {values["activeGame"] ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                        </ListItem>
                        <Collapse in={values["activeGame"]} timeout="auto">
                            <List disablePadding>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/game/types")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <CategoryRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Types" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/game/providers")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <ContactlessRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Providers" 
                                    />
                                </ListItem>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)} onClick={() => History.push("/game/games")}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <GamesRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Games" 
                                    />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button 
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeFinance"]
                            })} 
                            onClick={() => handleChange("activeFinance")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <MonetizationOnRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Finance" />
                            {values["activeFinance"] ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                        </ListItem>
                        <Collapse in={values["activeFinance"]} timeout="auto">
                            <List disablePadding onClick={() => History.push("/finance/transaction")}>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <HistoryIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Transaction" 
                                    />
                                </ListItem>
                            </List>
                            <List disablePadding onClick={() => History.push("/finance/request")}>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <LowPriorityIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Request" 
                                    />
                                </ListItem>
                            </List>
                            <List disablePadding onClick={() => History.push("/finance/deposit")}>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Deposit" 
                                    />
                                </ListItem>
                            </List>
                            <List disablePadding onClick={() => History.push("/finance/withdraw")}>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <PlaylistAddCheckIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Withdraw" 
                                    />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <AccountBalanceRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Payment" />
                        </ListItem>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <LoyaltyRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Promotion" />
                        </ListItem>
                        <ListItem button 
                            className={clsx(classes.listItem, {
                                [classes.active] : values["activeCMS"]
                            })} 
                            onClick={() => handleChange("activeCMS")}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <SettingsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="CMS" />
                            {values["activeCMS"] ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                        </ListItem>
                        <Collapse in={values["activeCMS"]} timeout="auto">
                            <List disablePadding>
                                <ListItem button className={clsx(classes.listItem, classes.nestedList)}>
                                    <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconNested)}>
                                        <GamesRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        className={classes.listItemText} 
                                        primary="Games" 
                                    />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <AssessmentRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Report" />
                        </ListItem>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <FingerprintRoundedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Permission" />
                        </ListItem>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <UpdateIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary="Update" />
                        </ListItem>
                    </List>
                </Scrollbars>
            </Drawer>
        </>
    )
}
export default Header;