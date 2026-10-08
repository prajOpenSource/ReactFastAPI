import { useEffect, useState } from "react";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest
} from "../models/User";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";

interface UserFormProps {
  open: boolean;
  user: User | null;
  onSave: (
    user: CreateUserRequest | UpdateUserRequest
  ) => Promise<void>;
  onCancel: () => void;
}

function UserForm({
  open,
  user,
  onSave,
  onCancel
}: UserFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
    } else {
      setName("");
      setRole("");
      setEmail("");
    }

    setError("");
  }, [user, open]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    // Name validation
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    // Role validation
    if (!role.trim()) {
      setError("Role is required.");
      return;
    }

    // Email validation
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setSaving(true);

    try {
      await onSave({
        name: name.trim(),
        role: role.trim(),
        email: email.trim()
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save user."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {user ? "Edit User" : "Add User"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {/* Name */}
          <TextField
            autoFocus
            fullWidth
            required
            label="Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            margin="normal"
            disabled={saving}
          />

          {/* Role */}
          <TextField
            fullWidth
            required
            label="Role"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
            margin="normal"
            disabled={saving}
          />

          {/* Email */}
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            margin="normal"
            disabled={saving}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2
          }}
        >
          <Button
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UserForm;