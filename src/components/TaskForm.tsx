import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'


type FormData = {
  title : String
  description : String
  deadline : Date
}

export const TaskForm: FC = () => {

  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10);
  
  const { handleSubmit, register, setValue } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    axios.post('http://localhost:8080/tasks', data);
    setValue('title', '');
    setValue('description', '')
  }

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