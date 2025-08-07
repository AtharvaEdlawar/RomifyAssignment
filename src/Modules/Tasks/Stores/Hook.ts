import { useRecoilState, useRecoilValue } from 'recoil';
import {ItaskListAtom, totalCountAtom } from './Atom';
import type { ITask, ITaskReturnHooks} from './Types';
import { toast } from 'react-toastify';
import { useAdminAppService } from '../../../Utils/Axios';
import { loginState } from '../../../auth/Stores/AuthAtom';


const UseTaskManagement = (): ITaskReturnHooks => {
    const adminAppService = useAdminAppService();
    const [taskList, setTaskList] = useRecoilState(ItaskListAtom);
    const auth_response:any = useRecoilValue(loginState);
    const [totalCount, setTotalCount] = useRecoilState<number>(totalCountAtom);
    const createTask = async (values: ITask) => {
        try {
            const finalValues = {
                user_id: auth_response.userData.id,
                ...values

            }
            const response = await adminAppService.post('/task/task',finalValues);
            toast.success('Task added successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.message || 'Failed to add Task');
            throw error;
        }
    };

    const updateTask = async (id: number, values: ITask) => {
        try {
            const response = await adminAppService.put(`/task/task/${id}`, values);
            toast.success('Task updated successfully');
            return response.data;
        } catch (error:any) {
            toast.error(error.message || 'Failed to update Task');
            throw error;
        }
    };

    const getTaskById = async (id: number) => {
        try {
            const response = await adminAppService.get(`/task/task/${id}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.message || 'Failed to get Task');
            throw error;
        }
    };

    const getAllTaskList = async (limit: number, offset: number, search?: string) => {
        try {
            const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
            const user_id = auth_response.userData.id
            const response = await adminAppService.get(`/task/task?limit=${limit}&offset=${offset}&${searchParam}&user_id=${user_id}`);
            setTaskList(response.data.data);
            setTotalCount(response.data.pagination.total);
            return response.data.data;
        } catch (error:any) {
            console.log("error in get List function", error)
            toast.error(error.message || 'Failed to get Task list');
            throw error;
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await adminAppService.delete(`/task/task/${id}`);
            toast.success('Task deleted successfully');
        } catch (error:any) {
            toast.error(error.message || 'Failed to delete Task');
            throw error;
        }
    };

    return [
        {
            createTask,
            updateTask,
            getAllTaskList,
            getTaskById,
            deleteTask,
        },
        {
            taskList,
            totalCount,
        }
    ];
};

export default UseTaskManagement;