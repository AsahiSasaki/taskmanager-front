import { useQuery } from 'react-query';
import { DataGrid, GridRenderCellParams, GridRowParams, useGridApiRef } from '@mui/x-data-grid'
import { FC, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getTasks } from '../apis/api'
import { TaskDetails } from './TaskDetails'
import TaskDelete from './TaskDelete';

export const TaskList: FC = () => {
    
    //チェックを入れている行を取得するために使う
    const apiRef = useGridApiRef();
    
    //ダイアログ表示を制御
    const [open, setOpen] = useState(false);
    
    //<TaskDetails />のpropsに使う ただの変数だと再レンダリングされない
    const [selectedId, setSelectedId] = useState<number | null>(null);
   
    //タスク一覧のデータと、取得中の場合の早期リターンに使う
    const { isLoading, data} = useQuery('tasks', getTasks);
   
    //ダイアログ表示制御
    const handleClickOpen = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (isLoading){
        return <CircularProgress />;
    }
    
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
            renderCell: (params:  GridRenderCellParams) => <Button variant="contained" color="primary" onClick={() => {
                handleClickOpen(params.row.id);
            }}>詳細</Button>
        },
    ];

    const row = [];

    for (const item of data) {
        row.push({id: item.id, title: item.title, description: item.description, status: item.status === 1 ? '完了' : '未完了',  deadline: item.deadline})
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TaskDelete apiRef={apiRef}/>
            </Box>
            <Box>
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
                        height:"420px",width:"940px",fontSize:18,border:"none"
                    }}
                    getRowClassName={(params: GridRowParams) => {
                        if (params.row.status === "未完了") {
                            return 'rows-incomplete'
                        } else {
                            return '';
                        }
                    }}
                />
            </Box>
            <Dialog 
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                    height: '90%',
                    width: '35%'
                    },
                }}>
                <DialogTitle>タスク詳細</DialogTitle>
                <DialogContent>
                    <TaskDetails id={Number(selectedId)} handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    {/* ToDo
                    ここのボタンをクリックして更新できるようにしたい
                    <Button>
                        OK
                    </Button> */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TaskList;