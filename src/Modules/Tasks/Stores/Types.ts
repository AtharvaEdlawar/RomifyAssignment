export interface ITask {
    id?:number,
    status:string,
    name:string,
    created_at?:string,
    updated_at?:string,
}


export interface ITaskHooks {
    createTask:(values:ITask) => Promise<void>
    getTaskById:(id:number)=> Promise<ITask>
    getAllTaskList:(limit:number,offset:number,search:string) => Promise<ITask[]>
    updateTask:(id:number,updated_values:ITask) => Promise<void>
    deleteTask:(id:number) => Promise<void>
}


export interface ITaskState {
    taskList: ITask[],
    totalCount:number
}

export type ITaskReturnHooks = [ITaskHooks,ITaskState]