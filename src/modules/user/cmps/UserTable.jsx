import { Table, TableContainer, Paper } from "@mui/material";
import { UserTableHead } from "./UserTableHead";
import { UserTableBody } from "./UserTableBody";

export const UsersTable = ({ users, page, updateSortBy, useSort }) => {
  return (
    <TableContainer
      style={{ maxWidth: "90vw", maxHeight: "70vh", whiteSpace: "nowrap" }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <UserTableHead
          updateSortBy={updateSortBy}
          users={users}
          useSort={useSort}
          sx={{ userSelect: "none" }}
        />
        {users && users.length > 0 && (
          <UserTableBody users={users} page={page}></UserTableBody>
        )}
      </Table>
    </TableContainer>
  );
};
