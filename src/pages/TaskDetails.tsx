import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { TaskData, getTask, updateTask } from '../apis/api'
import { useMutation, useQuery } from 'react-query';
import { Box, Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

export const TaskDetails: FC = () => {

    const { id } = useParams();

    const { data} = useQuery(['task', id], () => getTask(Number(id)));
    const { handleSubmit, register } = useForm<TaskData>();
    
    const updateMutation = useMutation((data:TaskData) => updateTask(Number(id), data),
        {
        onSuccess: () => {
            window.location.href = `http://localhost:5173`;
        }
        }
    );

    const [status, setStatus] = useState<number | null>(null);

    useEffect(() => {
        if (data) {
            setStatus(data.status);
        }
    },[data]);

    if (status === null){
        return 
    }

    const onSubmit: SubmitHandler<TaskData> = (data) => {
        const updatedData = {...data, status};
        updateMutation.mutate(updatedData);
    };

    const toggleStatus = () => {
        setStatus(status === 1 ? 0 : 1);
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx = {{ marginBottom: 2 }}>
                    <TextField label="タスク名" {...register('title')} defaultValue={data.title} placeholder="Title" />
                </Box>
                <Box sx = {{ marginBottom: 2 }}>
                    <TextField label="タスク内容" {...register('description')} defaultValue={data.description} placeholder="Description" />
                </Box>
                <Box sx = {{ marginBottom: 2 }}>
                    <TextField type="date" label="期日" {...register('deadline')} defaultValue={data.deadline} placeholder="Deadline" />
                </Box>
                <Box sx = {{ marginBottom: 2 }}>
                    <Button 
                        onClick={toggleStatus}
                        style={{backgroundColor: status === 0 ? '#FFC4B5' : '#C4E3FF' , color: status === 0 ? '#FF0000' : '#0000FF'}}
                    >
                        {status === 1 ? '完了' : '未完了'}
                    </Button>
                </Box>
                <Box>
                    <Button type="submit">適用</Button>
                </Box>
            </Box>
        </>
    )
}

export default TaskDetails;

