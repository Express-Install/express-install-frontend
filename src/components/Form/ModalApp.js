import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {API_BaseURL, Get_Script_API} from "../../constants/api";
import axios from "axios";
import {format} from "date-fns";
import "react-notifications/lib/notifications.css";
import {NotificationContainer} from "react-notifications";
import {createNotification} from "../../Helper/notification";

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
    textarea: {
        minWidth: 300
    }
}));

function ModalApp(props) {
    const classes = useStyle();
    const {open, onCloseForm, app} = props;
    const [modalStyle] = useState(getModalStyle);
    const [script, setScript] = useState('');

    const pickedApp = app;
    const userID = localStorage.getItem("userID") === null ? '' : localStorage.getItem("userID");
    /*const configScriptAPI = {
        packages: pickedApp,
        dirName: userID,
        fileName: format(new Date(), 'yyyy-MM-dd.kk-mm-ss')
    }*/

    const handleCopy = async () => {
        let x = document.getElementsByTagName("textarea");
        await navigator.clipboard.writeText(x[0].innerHTML);
        // await alert('Copied to clipboard!');
        createNotification("success", "Copied to clipboard!");
    }

    useEffect(() => {
        handleScript();
    }, []);

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
            const completeScript = completeInstallScript(res.data);
            setScript(completeScript);
        }catch (err){
            console.log("Cannot get script: ", err);
        }
    }


    const completeInstallScript = (script) => {
        let defaultString = "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('";
        const completeScript = defaultString+API_BaseURL+'/'+script+"'))";
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
                    <TextareaAutosize readOnly className={classes.textarea} value={script} aria-label="minimum height" rowsMin={3} placeholder="Your installing code here...">
                        {script}
                    </TextareaAutosize>
                </FormControl>
            </div>
            <Button variant="contained" color="primary" className="btn-submit" onClick={handleCopy}>
                Copy
            </Button>
        </div>
    );
    return (
        <div>
            <Modal open={open} onClose={onCloseForm}>
                {body}
            </Modal>
            <NotificationContainer/>
        </div>
    );
}

export default ModalApp;