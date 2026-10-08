import type { User } from "../models/User";

import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

function UserCard({
  user,
  onEdit,
  onDelete
}: UserCardProps) {
  return (
    <TableRow
      hover
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0
        }
      }}
    >
      {/* ID */}
      <TableCell>
        {user.id}
      </TableCell>

      {/* Name */}
      <TableCell>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600
          }}
        >
          {user.name}
        </Typography>
      </TableCell>

      {/* Role */}
      <TableCell>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {user.role}
        </Typography>
      </TableCell>

      {/* Email */}
      <TableCell>
        <Typography variant="body2">
          {user.email}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="right">
        <Tooltip title="Edit user">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(user)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete user">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(user)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default UserCard;