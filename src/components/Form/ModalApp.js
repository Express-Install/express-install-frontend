import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes, {bool} from 'prop-types';
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Label} from "@material-ui/icons";

ModalApp.propTypes = {
    open: PropTypes.bool,
    onCloseForm: PropTypes.func
};

ModalApp.defaultProps = {
    open: false
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyle = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: "20px"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function ModalApp(props) {
    const classes = useStyle();
    const {open, onCloseForm} = props;
    const [modalStyle] = useState(getModalStyle);
    const [copySuccess, setCopySuccess] = useState('');
    //const textAreaRef = useRef(null);


    const handleCopy = async () => {
        let x = document.getElementsByTagName("textarea");
        await navigator.clipboard.writeText(x[0].innerHTML);
        setCopySuccess('Copied!');
        await alert('Copied to clipboard!');
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="header-modal">
                <p className="title">Your installing code</p>
                <CloseIcon className="close-icon" onClick={onCloseForm} />
            </div>
            <div className="body-modal">
                <FormControl>
                    <TextareaAutosize className="textarea" aria-label="minimum height" rowsMin={3} placeholder="Your installing code here...">
                        Anh ba 123457980...
                    </TextareaAutosize>
                </FormControl>
                <Button variant="contained" color="primary" className="btn-submit" onClick={handleCopy}>
                    Copy
                </Button>
            </div>
        </div>
    );
    return (
        <Modal open={open} onClose={onCloseForm}>
            {body}
        </Modal>
    );
}

export default ModalApp;