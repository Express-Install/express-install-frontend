import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

Search.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        float: "right",
        marginBottom: 10,
    },
    searchField: {
        width: "30vw",
    },
}));

function Search(props) {
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <TextField className={classes.searchField} label="Search field" type="search" variant="outlined"/>
            <button className="fa fa-search" disabled/>
        </form>
    );
}

export default Search;