import { useQuery } from 'react-query';
import axios from 'axios';
import { DataGrid, GridRowParams} from '@mui/x-data-grid'
  
const getTasks = async () => {
  const res = await axios.get('http://localhost:8080/tasks');
  return res.data;
};

function TaskList() {
    const columns = [
        { field: 'title', headerName: 'タスク名', width: 200 },
        { field: 'description', headerName: 'タスク内容', width: 300 },
        { field: 'status', headerName: 'ステータス', width: 150 },
        { field: 'deadline', headerName: '期日', width: 150 },
    ];

    const { isLoading, data} = useQuery('tasks', getTasks);
  
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
        
    }

    return (
        <div>
        <h2>タスク一覧</h2>
        <DataGrid
            rows={row}
            columns={columns}
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