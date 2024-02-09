import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material'
import TaskFormProvider, { updateFunctionState } from './TaskFormProvider'
import { useRecoilState } from 'recoil'

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
    //更新処理
    const [updateFunction] = useRecoilState(updateFunctionState)

    const handleUpdateClick = () => {
        if (updateFunction) {
            updateFunction()
        }
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
                <TaskFormProvider
                    mode={1}
                    id={Number(selectedId)}
                    handleClose={handleClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateClick} color="primary">
                    更新
                </Button>
                <Button onClick={handleClose} color="primary">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    )
}
