import {
  Typography,
  CardContent,
  CardMedia,
  Card,
  Button,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const UserDetailsCard = ({ currUser }) => {
  const navigate = useNavigate();

  return currUser ? (
    <Card sx={{ paddingBlock: "20px !important", position: "relative" }}>
      <Typography
        sx={{
          paddingBlock: "0px 5px !important",
          marginInline: "20px",
        }}
        gutterBottom
        variant="h5"
        component="div"
        display="flex"
        justifyContent="center"
        fontWeight="700"
      >
        {currUser.name.first + " " + currUser.name.last}
      </Typography>
      <CardMedia
        component="img"
        image={currUser?.picture.large}
        height="140"
        alt="No image..."
        sx={{
          objectFit: "none",
          padding: "0px !important",
          marginInline: "auto",
        }}
      />
      <MuiLink
        href={"mailto:" + currUser.email}
        sx={{
          paddingBlock: "10px 5px !important",
          marginInline: "20px",
        }}
        gutterBottom
        variant="h5"
        display="flex"
        justifyContent="center"
        fontWeight="700"
        onClick={(ev) => ev.stopPropagation()}
      >
        {currUser.email}
      </MuiLink>
      <Typography
        sx={{
          paddingBlock: "0px  !important",
          marginInline: "20px",
        }}
        gutterBottom
        variant="h5"
        component="div"
        display="flex"
        justifyContent="center"
        fontWeight="700"
      >
        {"Gender : " + currUser.gender}
      </Typography>
      <Typography
        sx={{
          paddingBlock: "0px  !important",
          marginInline: "20px",
        }}
        gutterBottom
        variant="h5"
        component="div"
        display="flex"
        justifyContent="center"
        fontWeight="700"
      >
        {"Age : " + currUser.dob.age}
      </Typography>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px !important",
        }}
      ></CardContent>
      <Button
        sx={{
          position: "absolute",
          top: "0%",
          left: "0%",
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </Button>
    </Card>
  ) : (
    <div>Loading </div>
  );
};
