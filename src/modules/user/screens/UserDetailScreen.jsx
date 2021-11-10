import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { getCurrUserFromAllUsers } from "../service/userService";
import { UserDetailsCard } from "../cmps/UserDetailsCard";
import { GoogleMap } from "../../../shared/cmps/GoogleMap";

var theme = createTheme({});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  mainContainer: {
    display: "flex !important",
    justifyContent:"center",
    alignItems: "center !important",
    marginBlock: "0px 20px",
    boxShadow: "none !important",
    height: "100%",
    userSelect: "none",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBlock: "20px",
    boxShadow: "none !important",
  },
  pageHeader: {
    color: "#161616 !important",
    fontWeight: "normal",
    fontSize: "3rem",
    fontFamily: "Helvetica Neue",
    whiteSpace: "no",
  },
  header: {
    color: "black !important",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBlock: "100px !important",
  },
});
export const UserDetailScreen = () => {
  const { currPage, currUsername } = useParams();
  const { users } = useSelector((state) => state.userModule);
  const [currUser, setCurrUser] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    var userToFind = users.find((user) => user.login.username === currUsername);
    const getUserToShow = async () => {
      userToFind = await getCurrUserFromAllUsers(currUsername, currPage);
      setCurrUser(userToFind);
    };
    if (!userToFind) getUserToShow();
    else setCurrUser(userToFind);
  }, [users, currUser, currPage, currUsername]);

  return currUser ? (
    <>
      <ThemeProvider theme={theme}>
        <Grid className={styles.mainContainer} container>
          <Grid>
            <Paper className={styles.paper}>
              <Typography
                className={styles.pageHeader}
                variant="h1"
                color="#fff"
              >
                User Details
              </Typography>
            </Paper>
          </Grid>
          <Grid
            width="90%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {currUser && (
              <UserDetailsCard currUser={currUser}> </UserDetailsCard>
            )}
            <Typography
              component="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            ></Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Grid sx={{ width: "80%", marginInline: "10%" }}>
        <GoogleMap
          location={currUser.location}
          lat={currUser.lat}
          lon={currUser.lon}
        ></GoogleMap>
      </Grid>
    </>
  ) : (
    <div>Loading</div>
  );
};
