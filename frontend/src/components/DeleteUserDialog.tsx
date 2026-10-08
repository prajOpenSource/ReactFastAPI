import type { User } from "../models/User";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

interface DeleteUserDialogProps {
  open: boolean;
  user: User | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  deleting?: boolean;
}

function DeleteUserDialog({
  open,
  user,
  onConfirm,
  onCancel,
  deleting = false
}: DeleteUserDialogProps) {
  if (!user) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={
        deleting
          ? undefined
          : onCancel
      }
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete User
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{user.name}</strong>?
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2
        }}
      >
        <Button
          onClick={onCancel}
          disabled={deleting}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={deleting}
        >
          {deleting
            ? "Deleting..."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;