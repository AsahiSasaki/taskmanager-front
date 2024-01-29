import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { DataGrid, GridRowParams, useGridApiRef } from '@mui/x-data-grid'
import { FC } from 'react';
import TaskForm from './TaskForm';
import { Button } from '@mui/material';

const getTasks = async () => {
    const res = await axios.get('http://localhost:8080/tasks');
    return res.data;
};

const deleteTask = async (id:number) => {
    await axios.delete('http://localhost:8080/tasks/'+id);
};

export const TaskList: FC = () => {
    const apiRef = useGridApiRef();
    const queryClient = useQueryClient();

    const { isLoading, data} = useQuery('tasks', getTasks);

    const columns = [
        { field: 'title', headerName: 'タスク名', width: 200 },
        { field: 'description', headerName: 'タスク内容', width: 300 },
        { field: 'status', headerName: 'ステータス', width: 150 },
        { field: 'deadline', headerName: '期日', width: 150 },
    ];

    const deleteTasks = async () => {
        const selectRows = apiRef.current.getSelectedRows();
        const deletePromises: Promise<void>[] = []
        selectRows.forEach(v => {
            deletePromises.push(deleteTask(v.id));
        })
        await Promise.all(deletePromises);
    };
    const deleteMutation = useMutation(() => deleteTasks(),
    {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks");
        }
    });

    if (isLoading){
        return 
    }
   
    //テーブルの値
    const row = [];

    for (let item of data) {
        if (item.status === 0){
            row.push({id: item.id, title: item.title, description: item.description, status: "未完了",  deadline: item.deadline})
        }
        if (item.status === 1){
            row.push({id: item.id, title: item.title, description: item.description, status: "完了",  deadline: item.deadline})
        }   
    };

    return (
        <div>
        <TaskForm />
        <Button color='warning' onClick={() => deleteMutation.mutate()}>削除</Button>
        <DataGrid
            rows={row}
            columns={columns}
            checkboxSelection
            apiRef={apiRef}
            sx={{
                '& .rows-incomplete': {
                    background: '#FFC4B5 !important'
                },
                height:"700px",width:"1000px",fontSize:18,border:"none"
            }}
            getRowClassName={(params: GridRowParams) => {
                if (params.row.status === "未完了") {
                    return 'rows-incomplete'
                } else {
                    return '';
                }
            }}
        />
        </div>
    );
}

export default TaskList;