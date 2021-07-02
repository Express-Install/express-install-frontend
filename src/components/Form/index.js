import React, {useEffect, useState} from 'react';
import Pagination from "./pagination";

import queryString from "query-string";
import NotificationContainer from "react-notifications";
import {createNotification} from "../../Helper/notification";
import {API_BaseURL, Get_Packages_API} from "../../constants/api";
import axios from "axios";
import PackageList from "./PackageList";


function Form() {

    const [packagesList, setPackagesList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalResults: 1
    });
    const [offset, setOffset] = useState(0);

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
                setPagination({page: res.data.page, limit: res.data.limit, totalResults: res.data.totalResults});
                setOffset((res.data.page - 1) * res.data.limit);
            } catch (err) {
                createNotification("error", "Cannot fetch packages list");
            }
        }

        fetchPackageList();
    }, [filters]);

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            page: newPage
        });
    }

    function handleRecordChange() {
        const {totalResults, limit} = pagination;
        /*const currentPage = page;
        let totalCount = 0;
        if (totalResults - (currentPage * limit) > 0) {
            totalCount = limit;
        } else {
            totalCount = totalResults - ((currentPage - 1) * limit);
        }*/
        return (
            <div className="text-center">
                <span className="records">
                    Showing app records <b>{totalResults === 0 ? 0 : offset + 1}</b> to <b>{offset + limit >= totalResults ? totalResults : offset + limit}</b>
                </span>
            </div>
        );
    }

    return (
        <div>
            <form>
                <div className="container">
                    <h3 className="text-center">1.Pick the apps you want</h3>
                </div>
                <PackageList packages={packagesList}/>
            </form>
            {handleRecordChange()}
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
