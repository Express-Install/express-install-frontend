import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/SideBar.css';
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

SideBar.propTypes = {
    toggleSideBar: PropTypes.bool,
    pickedApp: PropTypes.array
};

function SideBar(props) {
    const {toggle, app, handleToggleSideBar, onGetPickedApp} = props;
    const [pickedApp, setPickedApp] = useState([]);

    useEffect(() => {
        setPickedApp(JSON.parse(localStorage.getItem("pickedApp")));
    }, [localStorage.getItem("pickedApp")]);

    const handleDeletePackage = (e) => {
        const newList = pickedApp.filter((item) => item !== e);
        localStorage.setItem("pickedApp", JSON.stringify(newList));
        if (onGetPickedApp){
            onGetPickedApp(newList);
        }
    }

    return (
        <div className={
            toggle
                ? "container-side-bar toggle-on"
                : "container-side-bar toggle-off"
        }>
            <div className="header-side-bar">
                <p className="title-side-bar">Package</p>
                <CloseIcon
                    onClick={handleToggleSideBar}
                    className="close-icon"
                />
            </div>
            <div className="content-side-bar">
                {pickedApp.map((item, id=0) =>(
                   <div key={id} className="package">
                       <p className="name-package">{item}</p>
                       <DeleteOutlineIcon
                           className="delete-package"
                           value={item}
                           onClick={() => handleDeletePackage(item)}
                       />
                   </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;