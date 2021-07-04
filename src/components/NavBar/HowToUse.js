import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

HowToUse.propTypes = {
    open: PropTypes.bool,
    onCloseForm: PropTypes.func
};

HowToUse.defaultProps = {
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
        padding: "15px",
        marginTop: theme.spacing(50),
    },
    formControl: {
        margin: 10,
        minWidth: 120,
    },
    modalHowToUse: {
        height: 450,
        overflowY: "scroll"
    },
    modalHead: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    modalBody: {
        justifyContent: "space-between",
        alignItems: "center"
    }
}));

function HowToUse(props) {
    const classes = useStyle();
    const {open, onCloseForm} = props;
    const [modalStyle] = useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className={classes.modalHead}>
                <p className="title">Instruction</p>
                <CloseIcon className="close-icon" onClick={onCloseForm} />
            </div>
            <div className={classes.modalBody}>
                <h4>
                    1. Pick your wanted app from the app list.
                </h4>
                <img src={process.env.PUBLIC_URL + 'image/app-list.png'} alt="app list" className="img-responsive img-rounded" />
                <h4>
                    2. Click the Get your apps button & copy the code from the box.
                </h4>
                <img src={process.env.PUBLIC_URL + 'image/get-app-button.png'} alt="app button" className="img-responsive img-rounded" />
                <h4>
                    3. Open powershell as administrator
                </h4>
                <img src={process.env.PUBLIC_URL + 'image/open-ps.png'} alt="Open Powershell" className="img-responsive img-rounded" />
                <h4>
                    4. Paste the code and everything left is waiting till the installation is done
                </h4>
                <img src={process.env.PUBLIC_URL + 'image/example-install1.png'} alt="paste your code" className="img-responsive img-rounded"/>
                <h4>
                    5. Happy to use your apps <span className="fa fa-heart" aria-hidden="true"></span>
                </h4>
            </div>
            <Button variant="contained" color="primary" className="btn-submit" onClick={onCloseForm}>
                OK
            </Button>
        </div>
    );
    return (
        <div>
            <Modal open={open} onClose={onCloseForm} className={classes.modalHowToUse}>
                {body}
            </Modal>
        </div>
    );
}

export default HowToUse;