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

function PackageList(props) {
    const {packages, onPackagesClick} = props;
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
                        <span className="checkbox-line"><i>Pick this: </i> &nbsp;<input type="checkbox" className="larger" name="checkBox1" /></span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default PackageList;