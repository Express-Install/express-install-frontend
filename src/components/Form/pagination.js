import React from 'react';
import PropTypes from 'prop-types';
import './ListStyle.css'

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const {pagination, onPageChange} = props;
    const {page, limit, totalResults} = pagination;
    const totalPages = Math.ceil(totalResults / limit);


    function handlePageChange(newPage) {
        if (onPageChange){
            onPageChange(newPage);
        }
    }

    function showCurrentPage (){
        return (
            <span className="current-page">
                {page}
            </span>
        )
    }

    return (
        <div className="text-center mt-15">
            <button
                disabled={page <= 1}
                onClick={ () => handlePageChange(page - 1 )}
            >
                <span className="fa fa-caret-left" aria-hidden="true"/> &nbsp;
                Prev
            </button>
            {showCurrentPage()}
            <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1 )}
            >
                Next &nbsp;
                <span className="fa fa-caret-right" aria-hidden="true"/>
            </button>
        </div>
    );
}

export default Pagination;