import axios from 'axios'
import { TaskData } from '../models/TaskData'

//タスク一覧取得
export const getTasks: () => Promise<TaskData[]> = async () => {
    const res = await axios.get('http://localhost:8080/tasks')
    return res.data
}

//タスク取得(byID)
export const getTask: (id: number) => Promise<TaskData> = async (
    id: number,
) => {
    const res = await axios.get('http://localhost:8080/tasks/' + id)
    return res.data
}

//タスク作成
export const createTask: (data: TaskData) => Promise<void> = async (
    data: TaskData,
) => {
    await axios.post('http://localhost:8080/tasks', data)
}

//タスク更新
export const updateTask: (id: number, data: TaskData) => Promise<void> = async (
    id: number,
    data: TaskData,
) => {
    await axios.put('http://localhost:8080/tasks/' + id, data)
}

//タスク削除
export const deleteTask: (id: number) => Promise<void> = async (id: number) => {
    await axios.delete('http://localhost:8080/tasks/' + id)
}
