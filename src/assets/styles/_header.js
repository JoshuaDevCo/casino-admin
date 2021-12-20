import { fade, makeStyles } from '@material-ui/core/styles';
const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "white",
        boxShadow: "0px 2px 10px -8px rgba(0,0,0,0.2), 0px 1px 10px -8px rgba(0,0,0,0.14), 0px 1px 10px -8px rgba(0,0,0,0.12)",
        color: "#6c7293"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    scrollbar: {
        height: "calc(100% - 51px - 64px - 1px) !important"
    },
    avatar : {
        width: theme.spacing(6),
        height: theme.spacing(6),
        margin: theme.spacing(0, 1),
        borderRadius: 5,
        marginRight: 0
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
    toolbarNested: {
        minHeight: 50,
        color: "#222"
    },
    breadcrumbs: {
        paddingLeft: theme.spacing(3),
        "& a":{
            display: "flex",
            alignItems: "center",
            textDecoration: "none !important"
        }
    },
    breakCrumbsSeperate: {
        fontSize: 4
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        border: "none",
        background: '#1e1e2d'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        paddingLeft: theme.spacing(2),
        background: "#1b1b28",
        color: "white",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    clockParent: {
        justifyContent: "center"
    },
    spacing: {
        flexGrow : 1
    },
    userInfo: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft : theme.spacing(2),
    },
    hideMenuIcon: {
        color: "#6c7293",
        transform: "rotate(180deg)",
        transition: theme.transitions.create("color", {
            easing: theme.transitions.easing.easeOut,
            duration: "0.5s",
        }),
        "&:hover":{
            color: "#3597fc"
        }
    },
    list: {
        height: "100%",
        padding: "24px 0px"
    },
    listItem: {
        padding: theme.spacing(1.5, 3),
        color: "#a2a3b7",
        "&:hover": {
            background: "#1b1b28"
        }
    },
    listItemIcon: {
        color: '#494b74',
        minWidth: 45
    },
    listItemText: {
        color: "#a2a3b7"
    },
    listItemDivider: {
        padding: theme.spacing(1, 3),
        color: "#a2a3b7",
        opacity: .4,
        marginTop: theme.spacing(2)
    },
    listItemIconNested: {
        minWidth: 35,
        "& circle":{
            r : 3
        }
    },
    nestedList: {
        paddingLeft: theme.spacing(5.5)
    },
    active: {
        color: "white",
        background: "#1b1b28",
        "& svg": {
            color: "#3597fc"
        },
        "& span":{
            color: "white"
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.08),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    }
}));

export default useStyles;