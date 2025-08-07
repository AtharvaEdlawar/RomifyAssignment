import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import moment from 'moment';
import Pagination from '../../../../src/Components/Pagination';
import UseTaskManagement from '../Stores/Hook';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import type { ITask } from '../Stores/Types'
import 'primeicons/primeicons.css';
const TaskList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [{ getAllTaskList, deleteTask },{taskList,totalCount}] = UseTaskManagement(); 
    const [searchText, setSearchText] = useState('');
    const [globalFilter, setGlobalFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [first, setFirst] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        loadTaskManagement();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, globalFilter]);

    const loadTaskManagement = async () => {
        try {
            setLoading(true);
           await getAllTaskList(pageSize, first, globalFilter);
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false);
        }
    }

    const handleSearchClick = () => {
        setGlobalFilter(searchText);
        setCurrentPage(1);
        setFirst(0);
    }

    const handleSearchInputChange = (value: string) => {
        setSearchText(value);
        if (value === '') {
            setGlobalFilter('');
            setCurrentPage(1);
            setFirst(0);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleDelete = (id: number) => {
        confirmDialog({
            message: 'Are you sure you want to delete this Task?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                deleteTask(id)
                    .then(() => {
                        // Refresh the list after successful deletion
                        loadTaskManagement();
                    })
                    .catch((error) => {
                        console.error('Error deleting Task:', error);
                    });
            }
        });
    };

    const onPageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
        setFirst(event.first);
        setCurrentPage(event.page + 1);
    };

  const statusBodyTemplate = (rowData: ITask) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'Pending',
                    className: 'pendingStyles',
                    circleClassName: 'pendingCircle'
                };
            case 'in-progress':
                return {
                    label: 'In Progress',
                    className: 'inProgressStyles',
                    circleClassName: 'inProgressCircle'
                };
            case 'completed':
                return {
                    label: 'Completed',
                    className: 'completedStyles',
                    circleClassName: 'completedCircle'
                };
            default:
                return {
                    label: 'Unknown',
                    className: 'disabledStyles',
                    circleClassName: 'disabledCircle'
                };
        }
    };

    const statusConfig = getStatusConfig(rowData.status);

    return (
        <span className={statusConfig.className}>
            <span className={statusConfig.circleClassName}></span>
            {statusConfig.label}
        </span>
    );
};

    const dateBodyTemplate = (rowData: ITask) => {
        return rowData.created_at ? moment(rowData.created_at).format('DD/MM/YYYY') : '-';
    };
    const actionBodyTemplate = (rowData: ITask) => {
        return (
            <div className="actions">
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-text p-button-plain view_btn"
                    onClick={() => navigate(`/task/${rowData.id}/view`, {
                        state: { isEdit: false, id: rowData.id }
                    })}
                    tooltip="View"
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-plain edit_btn"
                    onClick={() => navigate(`/task/${rowData.id}/edit`, {
                        state: { isEdit: true, id: rowData.id }
                    })}
                    tooltip="Edit"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-text p-button-danger delete_btn"
                    tooltip="Delete"
                    onClick={() => handleDelete(rowData.id!)}
                />
            </div>
        );
    };

    const columns = [
        { field: 'name', header: 'Name', headerStyle: { width: '100px' } },
        { field: 'created_at', header: 'Created', headerStyle: { width: '120px' }, body: dateBodyTemplate },
        { field: 'status', header: 'Status', headerStyle: { width: '120px' }, body: statusBodyTemplate },
        { field: 'actions', header: 'Actions', headerStyle: { width: '120px' }, body: actionBodyTemplate }
    ];

    return (
        <>
        <ConfirmDialog/>
        <div className="card listPage_Card">
            <div className="location-header">
                <div className="header-content">
                    <div className="header-left">
                        <h2 className="location-title">Task Management</h2>
                        <div className="header-divider"></div>
                    </div>
                    <div className="right_section">
                        <div className="global-search-container">
                            <div className="p-inputgroup">
                                <InputText
                                    placeholder="Search Tasks..."
                                    value={searchText}
                                    onChange={(e) => handleSearchInputChange(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <Button
                                    icon="pi pi-search"
                                    className="p-button"
                                    onClick={handleSearchClick}
                                />
                            </div>
                        </div>
                        <div className="text-right gap-2 arrows">
                            <Button
                                label="New"
                                icon="pi pi-plus"
                                className="addNew_button"
                                onClick={() => navigate(`/task/create`)}
                            />
                        </div>
                        <div className="filter_box">
                            <Button
                                icon="pi pi-sync"
                                className="export_button"
                                onClick={loadTaskManagement}
                                title="Refresh"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='dataTable_container'>
                <DataTable
                    value={taskList || []}
                    loading={loading}
                    globalFilter={globalFilter}
                    emptyMessage="No Tasks found."
                    className="p-datatable-customers"
                >
                    {columns?.map((col) => (
                        <Column key={col.field} {...col} />
                    ))}
                </DataTable>
                <Pagination
                    first={first}
                    rows={pageSize}
                    totalRecords={totalCount}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
        </>
    );
}

export default TaskList;