import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import { ErrorMessage, Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik'
import type { ITask } from "../Stores/Types";
import taskValidationSchema from "../Stores/Schema";
import { InputText } from "primereact/inputtext";

interface ITaskFormProps {
    initialValues: ITask;
    onSubmit: (values: ITask, formikHelpers: FormikHelpers<ITask>) => void;
    mode: 'create' | 'edit' | 'view';
    onCancel: () => void;
}

const TaskForm: React.FC<ITaskFormProps> = ({
    initialValues,
    onSubmit,
    mode,
    onCancel
}) => {
    const isViewMode = mode === 'view';
    const isCreateMode = mode === 'create';
    const statusDropdown = [
        { label: 'PENDING', value: 'pending' },
        { label: 'IN-PROGRESS', value: 'in-progress' },
        { label: 'COMPLETED', value: 'completed' }
    ];

    return (
        <Formik
            validationSchema={taskValidationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ dirty, setFieldValue, isSubmitting, values }) => {
                return (
                    <Form>
                        <div className="bar-item-form-container">
                            <div className="form-header">
                                <div className="form-header-content">
                                    <div className="form-header-left">
                                        <h1 className="form-title">
                                            {isCreateMode ? 'Create New Task' : mode === 'edit' ? 'Edit Task' : 'View Task'}
                                        </h1>
                                    </div>
                                    <div className="form-actions">
                                        {isViewMode && (
                                            <span className="view-mode-badge">
                                                <i className="pi pi-eye"></i>Read Only
                                            </span>
                                        )}
                                        {!isViewMode && (
                                            <Button
                                                label="Save Changes"
                                                icon="pi pi-check"
                                                className="p-button-sm"
                                                type="submit"
                                                disabled={!dirty || isSubmitting}
                                            />
                                        )}
                                        <Button
                                            label="Cancel"
                                            icon="pi pi-times"
                                            className="p-button-sm p-button-secondary"
                                            onClick={onCancel}
                                            type="button"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Card className="main-form-card">
                                <div className="form-content">
                                    <h2 className="section-title">Track Information</h2>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            {isCreateMode ? (
                                                <div className="status-field">
                                                    <div className="pendingStyles">
                                                        <span className="pendingCircle"></span>
                                                        <span>PENDING Status</span>
                                                    </div>
                                                    <span className="required-asterisk">*</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <label htmlFor="status" className="important">Status</label>
                                                    <Dropdown
                                                        id="status"
                                                        name="status"
                                                        options={statusDropdown}
                                                        optionLabel="label"
                                                        optionValue="value"
                                                        value={values.status}
                                                        onChange={e => setFieldValue('status', e.value)}
                                                        disabled={isViewMode}
                                                    />
                                                </>
                                            )}
                                            <ErrorMessage name="status" component="small" className="p-error" />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor="name" className="important">Name</label>
                                            <InputText
                                                id="name"
                                                value={values.name}
                                                onChange={e => setFieldValue('name', e.target.value)}
                                                disabled={isViewMode}
                                                placeholder="Enter task name"
                                            />
                                            <ErrorMessage name="name" component="small" className="p-error" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default TaskForm;