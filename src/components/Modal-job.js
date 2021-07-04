/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import "../assets/css/Modal.css";
import axios from "axios";
import {API_BaseURL, Category_API} from "../constants/api";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ModalJob() {
  const jobs = [
    "Common",
    "IT",
    "Designer",
    "Marketer",
    "Student",
    "Teacher",
    "Accountant",
    "HR",
    "Manager",
    "Financial",
    "Medical",
    "Content",
    "Media",
  ];

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(state){
      try {
        const res = await axios.get(API_BaseURL + Category_API + state.job);
        localStorage.setItem("job", state.job);
        setOpen(false)
      } catch (err) {
        console.log("Fail to pick a job", err);
      }
    }else{

    }
};

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="header-modal">
        <p className="title">Choose your job</p>
        <CloseIcon className="close-icon" onClick={handleClose} />
      </div>
      <div className="body-modal">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Job</InputLabel>
          <Select
            native
            value={state.age}
            onChange={handleChange}
            inputProps={{
              name: "job",
              id: "age-native-simple",
            }}
            className="select">
            <option aria-label="None" value="" />
            {jobs.map((job,id = 0) => (
              <option
                  key={id}
                  value={job}>{job}</option>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" className="btn-submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      {body}
    </Modal>
  );
}
