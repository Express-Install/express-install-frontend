import React, {useEffect, useState} from 'react';
import Pagination from "./pagination";

import queryString from "query-string";
import NotificationContainer from "react-notifications";
import {createNotification} from "../../Helper/notification";
import {API_BaseURL, Get_Packages_API} from "../../constants/api";
import axios from "axios";
import PackageList from "./PackageList";
import ModalApp from "./ModalApp";
import Search from "./Search";


function Form() {
    const [packagesList, setPackagesList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalResults: 1
    });
    const [offset, setOffset] = useState(0);

    const [filters, setFilters] = useState({
        category: 'common',
        page: 1,
        limit: 120,
        sortBy: 'download:desc'
    });
    const [toggleModal, setToggleModal] = useState(false);
    const [pickedApp, setPickedApp] = useState([]);

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
        //handlePickJob();
    }, [filters]);

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            page: newPage
        });
    }

    function handleRecordChange() {
        const {totalResults, limit} = pagination;
        return (
            <div className="text-center">
                <span className="records">
                    Showing app records <b>{totalResults === 0 ? 0 : offset + 1}</b> to <b>{offset + limit >= totalResults ? totalResults : offset + limit}</b>
                </span>
            </div>
        );
    }

    function openModal() {
        setToggleModal(true)
    }

    function handleCloseModal() {
        setToggleModal(false);
    }

    function renderModal() {
        let open = toggleModal;
        let xhtml = null;
        if (open === true) {
            xhtml = (
                <ModalApp open={open} app={pickedApp} onCloseForm={handleCloseModal}/>
            );
        }
        return xhtml;
    }

    function handlePickedApp (app){
        setPickedApp(app);
    }



/*function handlePickJob () {
    let job = null;
    if (localStorage.getItem("job")){
        job = localStorage.getItem("job");
        setFilters({
            ...filters,
            category: stringify(job)
        });
    }
}*/

return (
    <div>
        <form>
            <div className="container">
                <h3 className="text-center">1.Pick the apps you want</h3>
                <Search/>
            </div>
            <PackageList packages={packagesList} onGetPickedApp={handlePickedApp}/>

        </form>
        {handleRecordChange()}
        <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
        />
        {/*<div className="container"></div>*/}
        {renderModal()}
        <div className="container">
            <h3 className="text-center">2.Get installing code & run it in Powershell as Administrators</h3>
            <p className="text-center text-danger">Check off your apps again</p>
            <p className="text-center">
                <button type="submit" className="btn btn-primary btn-lg" onClick={openModal}>Get your apps</button>
            </p>
        </div>
        <p className="text-center"><small>Our installer works on Windows 10, 8.x, 7, and equivalent Server
            versions.</small></p>
        <NotificationContainer/>
    </div>
);
}

export default Form;