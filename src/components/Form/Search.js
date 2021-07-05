import React, {useState} from 'react';
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
    const {handleSearch} = props;
    const classes = useStyles();

    const [keyword, setKeyword] = useState('');

    const onChangeKeyWord = (e) => {
        let target = e.target;
        let value = target.value;
        setKeyword(value);
    }

    const onSearch = () => {
        if (handleSearch){
            handleSearch(keyword);
        }
    }

    return (
        <div className={classes.root}>
            <TextField className={classes.searchField} name="keyword" value={keyword} label="Search field" type="search" variant="outlined" onChange={onChangeKeyWord}/>
            <button className="fa fa-search" onClick={onSearch}/>
        </div>
    );
}

export default Search;