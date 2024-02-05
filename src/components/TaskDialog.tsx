import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material'
import { TaskDetails } from './TaskDetails'

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
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    height: '90%',
                    width: '35%',
                },
            }}
        >
            <DialogTitle>タスク詳細</DialogTitle>
            <DialogContent>
                <TaskDetails
                    id={Number(selectedId)}
                    handleClose={handleClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    )
}
