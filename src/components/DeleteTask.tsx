import { FC, MutableRefObject } from 'react';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask } from '../apis/api'
import { GridApi, GridRowModel } from '@mui/x-data-grid';

interface DeleteTaskProps {
    apiRef: MutableRefObject<GridApi>
}
export const DeleteTask: FC<DeleteTaskProps> = ({ apiRef }) => {
    const queryClient = useQueryClient();

    const deleteTasks = async () => {
        const selectedRows = apiRef.current.getSelectedRows();
        const deletePromises: Promise<void>[] = []
        selectedRows.forEach((v: GridRowModel) => {
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

    return (
        <Button color='warning' variant="contained" size="large" onClick={() => deleteMutation.mutate()}>削除</Button>
    );
}

export default DeleteTask;