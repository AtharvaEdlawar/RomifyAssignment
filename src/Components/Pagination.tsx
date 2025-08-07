import React from 'react';
import { Paginator } from 'primereact/paginator';

interface PaginationProps {
    totalRecords: number;
    rows: number;
    first: number;
    onPageChange: (event: { first: number; rows: number; page: number; pageCount: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalRecords, rows, first, onPageChange }) => {
    return (
        <div className="mt-2">
            <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                className="justify-content-center"
            />
        </div>
    );
};

export default Pagination;
