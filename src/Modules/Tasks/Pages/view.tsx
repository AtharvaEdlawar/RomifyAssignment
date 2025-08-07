import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from './Form';
import { toast } from 'react-toastify';
import UseTask from '../Stores/Hook';
import type { ITask } from '../Stores/Types';

const TaskView: React.FC = () => {
    const navigate = useNavigate();
    const { id, mode } = useParams<{ id: string; mode: string }>();
    const [{ getTaskById, createTask, updateTask}] = UseTask(); // Uncomment when hook is available
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState<ITask>({
        name: '',
        status: 'pending'
    });
    useEffect(() => {
        if (id && id !== 'add') {
            loadTaskManagement();
        } else {
            setLoading(false);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

     const loadTaskManagement = async () => {
        try {
            setLoading(true);
            const Task = await getTaskById(Number(id));
            setInitialValues(Task);
        } catch (error) {
            toast.error("Failed to load Task management");
            console.error('Error loading Task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: ITask) => {
        try {
            setLoading(true);
            if (mode === 'create') {
                console.log("Creating new Task with values:", values);
                await createTask(values);
                navigate('/task');
            } else if (mode === 'edit' && id) {
                console.log("Updating Task with values:", values);
                await updateTask(Number(id), values); 
                navigate('/task');
            }
        } catch (error) {
            console.error('Error saving Task:', error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return <div>Loading.....</div>;
    }

    return (
        <TaskForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            mode={mode as 'create' | 'edit' | 'view'}
            onCancel={() => navigate('/task')}
        />
    );
};

export default TaskView;