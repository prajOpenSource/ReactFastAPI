import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest
} from "./models/User";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from "./services/userService";

import UserForm from "./components/UserForm";
import DeleteUserDialog from "./components/DeleteUserDialog";
import UserCard from "./components/Usercard";

function App() {
  const queryClient = useQueryClient();

  const [showUserForm, setShowUserForm] =
    useState(false);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  // GET users
  const {
    data: users = [],
    isLoading,
    isError,
    error
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers
  });

  // CREATE user
  const createMutation = useMutation<
    User,
    Error,
    CreateUserRequest
  >({
    mutationFn: createUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      });

      closeUserForm();
    }
  });

  // UPDATE user
  const updateMutation = useMutation<
    User,
    Error,
    {
      id: number;
      user: UpdateUserRequest;
    }
  >({
    mutationFn: ({ id, user }) =>
      updateUser(id, user),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      });

      closeUserForm();
    }
  });

  // DELETE user
  const deleteMutation = useMutation<
    void,
    Error,
    number
  >({
    mutationFn: deleteUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      });

      closeDeleteDialog();
    }
  });

  // Add
  function handleAdd() {
    setSelectedUser(null);
    setShowUserForm(true);
  }

  // Edit
  function handleEdit(user: User) {
    setSelectedUser(user);
    setShowUserForm(true);
  }

  // Delete
  function handleDelete(user: User) {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  }

  // Save
  async function handleSave(
    userData:
      | CreateUserRequest
      | UpdateUserRequest
  ) {
    if (selectedUser) {
      await updateMutation.mutateAsync({
        id: selectedUser.id,
        user: userData as UpdateUserRequest
      });
    } else {
      await createMutation.mutateAsync(
        userData as CreateUserRequest
      );
    }
  }

  // Confirm delete
  async function handleDeleteConfirm() {
    if (!selectedUser) {
      return;
    }

    await deleteMutation.mutateAsync(
      selectedUser.id
    );
  }

  // Close add/edit dialog
  function closeUserForm() {
    setShowUserForm(false);
    setSelectedUser(null);
  }

  // Close delete dialog
  function closeDeleteDialog() {
    setShowDeleteDialog(false);
    setSelectedUser(null);
  }

  // Loading
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f7fb"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error
  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fb",
          p: 4
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto"
          }}
        >
          <Alert severity="error">
            Failed to load users:{" "}
            {error.message}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        p: {
          xs: 2,
          sm: 3,
          md: 4
        }
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto"
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center"
            },
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            gap: 2,
            mb: 3
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontWeight: 600
              }}
            >
              Users
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5
              }}
            >
              Manage users and their access
              information
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleAdd}
          >
            + Add User
          </Button>
        </Box>

        {/* Create error */}
        {createMutation.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {createMutation.error.message}
          </Alert>
        )}

        {/* Update error */}
        {updateMutation.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {updateMutation.error.message}
          </Alert>
        )}

        {/* Delete error */}
        {deleteMutation.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {deleteMutation.error.message}
          </Alert>
        )}

        {/* Users table */}
        <Card
          elevation={2}
          sx={{
            borderRadius: 2
          }}
        >
          <CardContent
            sx={{
              p: 0,
              "&:last-child": {
                pb: 0
              }
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f8fafc"
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      ID
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      Name
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      Role
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      Email
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        align="center"
                      >
                        <Box sx={{ py: 6 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                          >
                            No users found
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Click "Add User" to
                            create your first
                            user.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Add/Edit User Dialog */}
        <UserForm
          open={showUserForm}
          user={selectedUser}
          onSave={handleSave}
          onCancel={closeUserForm}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteUserDialog
          open={showDeleteDialog}
          user={selectedUser}
          onConfirm={handleDeleteConfirm}
          onCancel={closeDeleteDialog}
          deleting={deleteMutation.isPending}
        />
      </Box>
    </Box>
  );
}

export default App;