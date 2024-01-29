import { FC } from 'react'
import { useParams } from "react-router-dom";
import { getTask } from '../apis/api'
import { useQuery } from 'react-query';

export const TaskDetails: FC = () => {
  console.log(useParams())
  const { id } = useParams();
  console.log(id);

  // const { isLoading, data} = useQuery('tasks', getTask(Number(id)));
  
  const data = getTask(Number(id));
  console.log(data);

  return (
    <>
      <div>タスク一覧</div>
      <p>{id}</p>
    </> 
  )
}

export default TaskDetails;
