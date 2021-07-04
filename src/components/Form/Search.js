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
}));

function Search(props) {
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <TextField label="Search field" type="search" variant="outlined" />
            <button className="fa fa-search" disabled="true"/>
        </form>
    );
}

export default Search;