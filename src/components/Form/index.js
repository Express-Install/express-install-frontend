import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Pagination from "./pagination";

import queryString from "query-string";
import NotificationContainer from "react-notifications";
import {createNotification} from "../../Helper/notification";
import {API_BaseURL, Get_Packages_API} from "../../constants/api";
import axios from "axios";
import PackageList from "./PackageList";

const useStyle = makeStyles((theme) => ({
}));

function Form() {
    const classes = useStyle();

    const [packagesList, setPackagesList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalPages: 1
    });

    const [filters, setFilters] = useState({
        page: 1,
        limit: 120
    });

    useEffect(() => {
        async function fetchPackageList() {
            try {
                const paramString = queryString.stringify(filters);
                const res = await axios.get(`${API_BaseURL}${Get_Packages_API}?${paramString}`);
                setPackagesList(res.data.results);
                setPagination({page: res.data.page, limit: res.data.limit, totalPages: res.data.totalPages});
            } catch (err) {
                createNotification("error", "Cannot fetch packages list");
            }
        }
        fetchPackageList();
    },[filters]);

    function handlePageChange(newPage) {
        setFilters({
           ...filters,
           page: newPage
        });
    }

    return (
        <div>
            <form>
                <div className="container">
                    <h3 className="text-center">1.Pick the apps you want</h3>
                </div>
                <PackageList packages={packagesList}/>
            </form>
            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />
            {/*<div className="container"></div>*/}
            <div className="container">
                <h3 className="text-center">2.Download and run your custom installer</h3>
                <p className="text-center text-danger">Check off your apps again</p>
                <p className="text-center" style={{justifyContent: "space-around"}}>
                    <button type="submit" className="btn btn-primary btn-lg" disabled>Get your apps</button>
                </p>
            </div>
            <p className="text-center"><small>Our installer works on Windows 10, 8.x, 7, and equivalent Server
                versions.</small></p>
            <NotificationContainer/>
        </div>
    );
}

export default Form;