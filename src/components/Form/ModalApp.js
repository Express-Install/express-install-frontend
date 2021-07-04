import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes, {bool, object} from 'prop-types';
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {API_BaseURL, Get_Script_API} from "../../constants/api";
import axios from "axios";
import {format} from "date-fns";

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
    const {open, onCloseForm, app} = props;
    const [modalStyle] = useState(getModalStyle);
    const [copySuccess, setCopySuccess] = useState('');
    const [script, setScript] = useState('');
    //const [pickedApp, setPickedApp] = useState([]);

    const pickedApp = app;
    const userID = localStorage.getItem("userID") === null ? '' : localStorage.getItem("userID");
    const configScriptAPI = {
        packages: pickedApp,
        dirName: userID,
        fileName: format(new Date(), 'yyyy-MM-dd.kk-mm-ss')
    }
   /* console.log(Array.isArray(configScriptAPI.packages));*/

    const handleCopy = async () => {
        let x = document.getElementsByTagName("textarea");
        await navigator.clipboard.writeText(x[0].innerHTML);
        setCopySuccess('Copied!');
        await alert('Copied to clipboard!');
    }

    const handleScript = async () => {
        try {
            const res = await axios.post(API_BaseURL+Get_Script_API,
                {
                    packages: pickedApp,
                    dirName: userID,
                    fileName: format(new Date(), 'yyyy-MM-dd.kk-mm-ss')
                },
                { headers: {"Content-Type": "application/json"} }
            )
            setScript(res.data);
            localStorage.setItem("script", res.data);
        }catch (err){
            console.log("Cannot get script: ", err);
        }
    }


    const completeInstallScript = () => {
        let defaultString = "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('";
        const completeScript = defaultString+API_BaseURL+'/'+localStorage.getItem("script")+"'))";
        return completeScript;
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="header-modal">
                <p className="title">Your installing code</p>
                <CloseIcon className="close-icon" onClick={onCloseForm} />
            </div>
            <div className="body-modal">
                <FormControl>
                    <TextareaAutosize aria-readonly={true} className="textarea" aria-label="minimum height" value="Script here" rowsMin={3} placeholder="Your installing code here...">
                        {completeInstallScript}
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