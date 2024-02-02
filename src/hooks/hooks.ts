import { useQuery } from 'react-query';
import { getTasks } from '../apis/api'
import { useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';

//タスク一覧取得
export const useTasks = () => {
    const { isLoading, data } = useQuery('tasks', getTasks);
    return { isLoading, data };
}

//タスク詳細ダイアログ表示
export const useTaskDialog = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const handleClickOpen = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return { selectedId, open, handleClickOpen, handleClose };
}

//削除時の選択行取得
export const useDeleteTask = () => {
    //チェックを入れている行を取得するために使う
    const apiRef = useGridApiRef();
    return { apiRef};
}