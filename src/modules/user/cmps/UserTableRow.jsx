import { Avatar, TableCell, TableRow, Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Todo: to navigate later - UseNavigate  && pass the page number
export const UserTableRow = ({ user, currPage }) => {
  const imgSrc = user.picture.thumbnail;
  const firstName = user.name.first;
  const lastName = user.name.last;
  const fullName = firstName + " " + lastName;
  const email = user.email;
  const genderType = user.gender[0].toUpperCase() + user.gender.slice(1);
  const age = user.dob.age;

  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate(`${currPage}/${user.login.username}`)}
      sx={{ ":hover": { bgcolor: "#f5f5f5", cursor: "pointer" } }}
    >
      <TableCell>
        <Avatar alt={fullName} src={imgSrc} />
      </TableCell>
      <TableCell align="center">{fullName}</TableCell>
      <TableCell align="center">
        <MuiLink
          onClick={(ev) => ev.stopPropagation()}
          href={"mailto:" + email}
        >
          {email}
        </MuiLink>
      </TableCell>
      <TableCell align="center">{genderType}</TableCell>
      <TableCell align="center">{age}</TableCell>
    </TableRow>
  );
};
