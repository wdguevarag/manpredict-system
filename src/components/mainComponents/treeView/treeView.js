import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {white} from "color-name";
import {NavLink} from "react-router-dom";

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, rediText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    console.log(props)

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot} >
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        <NavLink to={`/`+rediText}>
                        {labelText}
                        </NavLink>
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        height: 500,
        flexGrow: 1,
        maxWidth: 400,
        backgroundColor: 'white'
    },
});

export default function GmailTreeView() {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultExpanded={['0']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            <StyledTreeItem nodeId="1" labelText="Yanacocha" labelIcon={SupervisorAccountIcon} rediText="area/1"
                            labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" >
                <StyledTreeItem nodeId="10" labelText="Mnto. mina" labelIcon={Label} rediText="gen_insp/1/1"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="11" labelText="Mnto. procesos" labelIcon={Label} rediText="gen_insp/1/2"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="12" labelText="Op. mina" labelIcon={Label} rediText="gen_insp/1/3"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="13" labelText="Serv. mina" labelIcon={Label} rediText="gen_insp/1/4"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="2" labelText="Shahuindo" labelIcon={SupervisorAccountIcon} rediText="area/2"
                            labelInfo="2,294" color="#e3742f" bgColor="#fcefe3" >
                <StyledTreeItem nodeId="14" labelText="Mnto. mina" labelIcon={Label} rediText="gen_insp/2/1"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="15" labelText="Mnto. procesos" labelIcon={Label} rediText="gen_insp/2/2"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="16" labelText="Op. mina" labelIcon={Label} rediText="gen_insp/2/3"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="17" labelText="Serv. mina" labelIcon={Label} rediText="gen_insp/2/4"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="3" labelText="Zamine" labelIcon={SupervisorAccountIcon} rediText="area/3"
                            labelInfo="3,566" color="#a250f5" bgColor="#f3e8fd">
                <StyledTreeItem nodeId="18" labelText="Mnto. mina" labelIcon={Label} rediText="gen_insp/3/1"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="19" labelText="Mnto. procesos" labelIcon={Label} rediText="gen_insp/3/2"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="20" labelText="Op. mina" labelIcon={Label} rediText="gen_insp/3/3"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="21" labelText="Serv. mina" labelIcon={Label} rediText="gen_insp/3/4"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="4" labelText="He Parts" labelIcon={SupervisorAccountIcon} rediText="area/4"
                            labelInfo="733" color="#3c8039" bgColor="#e6f4ea" >
                <StyledTreeItem nodeId="22" labelText="Mnto. mina" labelIcon={Label} rediText="gen_insp/4/1"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="23" labelText="Mnto. procesos" labelIcon={Label} rediText="gen_insp/4/2"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="24" labelText="Op. mina" labelIcon={Label} rediText="gen_insp/4/3"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
                <StyledTreeItem nodeId="25" labelText="Serv. mina" labelIcon={Label} rediText="gen_insp/4/4"
                                labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
            </StyledTreeItem>
        </TreeView>
    );
}
