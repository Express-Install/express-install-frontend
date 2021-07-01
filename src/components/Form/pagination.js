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
    const {page, limit, totalPages} = pagination;


    function handlePageChange(newPage) {
        if (onPageChange){
            onPageChange(newPage);
        }
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