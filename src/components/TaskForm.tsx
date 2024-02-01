import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { createTask, TaskData } from '../apis/api'

export const TaskForm: FC = () => {
    //今日の日付をyyyy-mm-ddのフォーマットで取得
    const today = new Date();
    const formattedToday = today.toISOString().slice(0, 10);

    const queryClient = useQueryClient();
    
    const { handleSubmit, register, setValue } = useForm<TaskData>();

    const createMutation = useMutation((data:TaskData) => createTask(data),
        {
        onSuccess: () => {
            setValue('title', '');
            setValue('description', '')
            queryClient.invalidateQueries("tasks");
        }
        }
    );

    const onSubmit: SubmitHandler<TaskData> = (data) => {
        createMutation.mutate(data);
    };

    return (
        <Box component="form" sx={{marginLeft: -50}} onSubmit={handleSubmit(onSubmit)}>
            <Box sx = {{ marginBottom: 2 }}>
                <TextField label="タスク名" sx = {{ width: 400 }} multiline {...register('title')} />
            </Box>
            <Box sx = {{ marginBottom: 2 }}>
                <TextField label="タスク内容" sx = {{ width: 400 }} multiline {...register('description')} />
            </Box>
            <Box>
                <TextField label="期日" type="date" value={formattedToday} {...register('deadline')} placeholder="Deadline" />
                <Button type="submit" variant="contained" size="large" sx = {{ marginLeft: 26, marginTop: 1.5 }} >登録</Button>
            </Box>
        </Box>
    )
}

export default TaskForm;