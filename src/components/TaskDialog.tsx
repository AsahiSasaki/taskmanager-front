import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    CircularProgress,
} from '@mui/material'
import { useTaskForm } from '../hooks/UseTaskForm'
import TaskFormDisplay from './TaskForm'

interface TaskDialogProps {
    open: boolean
    handleClose: () => void
    selectedId: number | null
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
    open,
    handleClose,
    selectedId,
}) => {
    const {
        register,
        onSubmit,
        data,
        toggleStatus,
        status,
        formState,
        isLoading,
        setValue,
    } = useTaskForm(Number(selectedId), handleClose, open)

    if (!open) {
        return null
    }

    if (isLoading || status === undefined) {
        return <CircularProgress />
    }

    const handleCloseResetStatus = () => {
        handleClose()
    }

    return (
        <Dialog
            open={open}
            PaperProps={{
                style: {
                    height: '90%',
                    width: '35%',
                },
            }}
        >
            <DialogTitle>タスク詳細</DialogTitle>
            <DialogContent>
                <TaskFormDisplay
                    mode={1}
                    register={register}
                    onSubmit={onSubmit}
                    data={data}
                    toggleStatus={toggleStatus}
                    status={status}
                    formState={formState}
                    setValue={setValue}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit} color="primary">
                    更新
                </Button>
                <Button onClick={handleCloseResetStatus} color="primary">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    )
}
