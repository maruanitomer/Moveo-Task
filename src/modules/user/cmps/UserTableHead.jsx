import { TableHead, TableRow, TableCell, Box, Typography } from "@mui/material";
import React from "react";

export const UserTableHead = ({ updateSortBy, useSort }) => {
  const tableHeaders = [
    { content: "Full name", key: "firstName" },
    { content: "Email", key: "email" },
    { content: "Gender", key: "gender" },
    { content: "Age", key: "age" },
  ];
  // const HeadersFonFtColors = "#e7e7e7";
  // const HeadersFontColors = "#666666";
  const HeadersFontColors = "#5e5e5e";
  const fontWeight = "bolder";
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: fontWeight, color: HeadersFontColors }}>
          Picture
        </TableCell>
        {tableHeaders.map((value, currKey) => (
          <TableCell
            sx={{ fontWeight: fontWeight, color: HeadersFontColors }}
            key={currKey}
            align="left"
            onClick={(ev) => {
              updateSortBy(value.key);
              ev.stopPropagation();
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <Typography variant="span">{value.content}</Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
