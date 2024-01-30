import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { createTask } from '../apis/api'
import { TaskData } from '../apis/api'

export const TaskForm: FC = () => {

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <div><TextField {...register('title')} placeholder="Title" /></div>
      <div><TextField {...register('description')} placeholder="Description" /></div>
      <div><TextField type="date" value={formattedToday} {...register('deadline')} placeholder="Deadline" /></div>
      <Button type="submit">登録</Button>
    </Box>
  )
}

export default TaskForm;