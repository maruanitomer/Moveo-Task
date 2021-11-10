import { TableBody } from "@mui/material";
import { UserTableRow } from "./UserTableRow";
export const UserTableBody = ({ users, page }) => {
  return (
    <TableBody>
      {users.map((user) => (
        <UserTableRow key={user.id} currPage={page} user={user} page={page} />
      ))}
    </TableBody>
  );
};
