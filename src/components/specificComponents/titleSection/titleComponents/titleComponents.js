import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useParams } from "react-router-dom";
import {ListComponents} from "../../../ComponentsComponents/sectComponents/listComponents";
import {ListElement} from "../../../ComponentsComponents/sectElements/listElement";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'rgba(247,247,247,0.9);',
    },
    tabStyle: {
        padding: '0.5%'
    }
}));

const menuItems = ['Componentes','Elementos']

export default function ScrollableTabsButtonAuto() {

    let { id } = useParams();

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    let itemsTop = [];

    for(let i = 0; i < menuItems.length; i++) {
        itemsTop.push(<Tab key={`tab-${i}`} className={classes.tabStyle} label={menuItems[i]} {...a11yProps(i)} />);
    }

    const [itemsTitle] = React.useState(itemsTop);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {itemsTitle}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ListComponents/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ListElement/>
            </TabPanel>
        </div>
    );
}
