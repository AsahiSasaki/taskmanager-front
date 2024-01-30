import axios from "axios";

export type TaskData = {
    id : number;
    title : string;
    description : string;
    status : number;
    deadline : Date;
}

//タスク一覧取得
export const getTasks = async () => {
    const res = await axios.get('http://localhost:8080/tasks');
    return res.data;
};

//タスク取得(byID)
export const getTask = async (id: number) => {
    const res = await axios.get('http://localhost:8080/tasks/'+id);
    return res.data;
};

//タスク作成
export const createTask = async (data: TaskData) => {
    await axios.post('http://localhost:8080/tasks', data);
};

//タスク更新
export const updateTask = async (id: number, data: TaskData) => {
    await axios.put('http://localhost:8080/tasks/'+id, data);
};

//タスク削除
export const deleteTask = async (id:number) => {
    await axios.delete('http://localhost:8080/tasks/'+id);
};