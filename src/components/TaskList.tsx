import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataGrid, GridRowParams, useGridApiRef } from '@mui/x-data-grid'
import { FC } from 'react';
import { Button } from '@mui/material';
import { getTasks, deleteTask} from '../apis/api'

export const TaskList: FC = () => {
    const apiRef = useGridApiRef();
    const queryClient = useQueryClient();

    const { isLoading, data} = useQuery('tasks', getTasks);

    const columns = [
        { field: 'title', headerName: 'タスク名', width: 200 },
        { field: 'description', headerName: 'タスク内容', width: 300 },
        { field: 'status', headerName: 'ステータス', width: 150 },
        { field: 'deadline', headerName: '期日', width: 150 },
        {
            field: 'editBtn',
            headerName: '詳細',
            sortable: false,
            width: 90,
            disableClickEventBubbling: true,
            renderCell: (params: any) => <Button variant="contained" color="primary" onClick={() => {
                console.log("詳細ボタンがクリック", params.row.id);
            }}>詳細</Button>
        },
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
        <Button color='warning' onClick={() => deleteMutation.mutate()}>削除</Button>
        <DataGrid
            rows={row}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
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