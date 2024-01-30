import { FC, useState } from 'react'
import { useParams } from "react-router-dom";
import { TaskData, getTask, updateTask } from '../apis/api'
import { useMutation, useQuery } from 'react-query';
import { Box, Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

export const TaskDetails: FC = () => {

  const { id } = useParams();

  const { isLoading, data} = useQuery(['task', id], () => getTask(Number(id)));
  const { handleSubmit, register } = useForm<TaskData>();
  
  const updateMutation = useMutation((data:TaskData) => updateTask(Number(id), data),
    {
      onSuccess: () => {
        // window.location.href = `http://localhost:5173`;
      }
    }
  );

  const [status, setStatus] = useState(0);

  if (isLoading){
    return 
  }

  //renderされる→setStatusでstate変わったからもう1回render→setStatusの無限ループになってしまうっぽい
  // setStatus(0)

  const onSubmit: SubmitHandler<TaskData> = (data) => {
    const updatedData = {...data, status};
    console.log(updatedData)
    updateMutation.mutate(updatedData);
  };

  const toggleStatus = () => {
    setStatus(status === 1 ? 0 : 1);
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <div><TextField {...register('title')} defaultValue={data.title} placeholder="Title" /></div>
        <div><TextField {...register('description')} defaultValue={data.description} placeholder="Description" /></div>
        <div><TextField type="date" {...register('deadline')} defaultValue={data.deadline} placeholder="Deadline" /></div>
        <Button onClick={toggleStatus}>{status === 1 ? '完了' : '未完了'}</Button>
        <Button type="submit">適用</Button>
      </Box>
    </> 
  )
}

export default TaskDetails;

