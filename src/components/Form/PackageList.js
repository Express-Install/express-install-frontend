import React from 'react';
import PropTypes from 'prop-types';
import './ListStyle.css';

PackageList.propTypes = {
    packages: PropTypes.array,
    onPackagesClick: PropTypes.func
};

PackageList.defaultProps = {
    packages: [],
    onPackagesClick: null
}

let pickedApp = [];
const handlePickApp = (packageName,event) => {
    if (event.target.checked === true) {
        pickedApp.push(packageName);
    } else {
        removeItem(pickedApp, packageName);
    }

    console.log(pickedApp);
}

function removeItem(array, item){
    for(const i in array){
        if(array[i]===item){
            array.splice(i,1);
            break;
        }
    }
}

function PackageList(props) {
    const {packages} = props;
    return (
        <div className="container">
            <div className="grid-container">
                {packages.map(item => (
                    <div className="grid-item" key={item.id}>
                        <h4>
                            {item.title}
                        </h4>
                        <span className="label label-danger">Description</span><i>: {item.summary}</i>
                        <br/><span className="label label-success">Download</span>: {item.download}<br/>
                        <span className="checkbox-line"><i>Pick this: </i> &nbsp;<input type="checkbox"
                                                                                        className="larger"
                                                                                        name="checkBox1"
                                                                                        // checked={handleChecked}
                                                                                        onChange={(e) => {
                                                                                            handlePickApp(item.packageName,e)
                                                                                        }}/></span>
                        {/* eslint-disable-next-line react/style-prop-object */}
                        {/*<span className="packageName" >{item.packageName}</span>*/}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default PackageList;