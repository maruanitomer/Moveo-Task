import { Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../../store/actions/userActions";
import { UsersTable } from "../cmps/UserTable";
import { getUsersFromApi } from "../service/userService";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

var theme = createTheme({});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  mainGrid: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    marginBlockEnd: "1rem",
    height: "70vh",
    userSelect: "none",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBlock: "20px",
    boxShadow: "none !important",
    maxHeight: "30vh",
  },
  pageHeader: {
    // color: "#7c795d !important",
    color: "#a1a1a1 !important",
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
    whiteSpace: "no",
    display:"block"
  },
});

//Next page = true/1 , Prev page = false/0

export const UsersScreen = () => {
  const [currentPageNumber, SetCurrentPageNumber] = useState(1);
  const dispatch = useDispatch();
  const styles = useStyles();
  const [sort, setSort] = useState(false);
  const [useSort, setUseSort] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { users } = useSelector((state) => state.userModule);

  useEffect(() => {
    const getUsersToShow = async () => {
      const usersToSave = await getUsersFromApi(
        currentPageNumber ? currentPageNumber : 1,
        useSort ? sortBy : null,
        useSort ? sort : null
      );
      dispatch(loadUsers(usersToSave));
    };
    getUsersToShow();
  }, [dispatch, currentPageNumber, sort, sortBy, useSort]);

  const pegination = (transferPageBoolean) => {
    var pageToTransfer = currentPageNumber;
    transferPageBoolean ? pageToTransfer++ : pageToTransfer--;
    if (pageToTransfer > 0) SetCurrentPageNumber(pageToTransfer);
  };
  const toggleSort = () => {
    if (!useSort) setUseSort(true);
    const toggledSort = !sort;
    setSort(toggledSort);
  };

  const updateSortBy = (value) => {
    if (!value) return;
    toggleSort();
    const sortBy = value;
    setSortBy(sortBy);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} className={styles.mainGrid}>
        <Grid>
          <Paper className={styles.paper}>
            <Typography className={styles.pageHeader} variant="h1" color="#fff">
              All Users
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          {useSort &&
            (sort ? (
              <ArrowUpwardIcon
                sx={{
                  display: "flex !important",
                  justifyContent: "center !important",
                  margin: "0 auto !important",
                  marginBlockEnd: "10px !important",
                  textAlign: "center !important",
                }}
              />
            ) : (
              <ArrowDownwardIcon
                sx={{
                  display: "flex !important",
                  justifyContent: "center !important",
                  margin: "0 auto !important",
                  marginBlockEnd: "10px !important",
                  textAlign: "center !important",
                }}
              />
            ))}
          <UsersTable
            useSort={useSort}
            updateSortBy={updateSortBy}
            page={currentPageNumber}
            users={users}
          />
          <ButtonGroup fullWidth={true}>
            <Button
              disabled={
                currentPageNumber <= 1 && users && users.length ? true : false
              }
              onClick={() => pegination(0)}
              variant="contained"
            >
              <ArrowBackIcon />
            </Button>
            <Button
              disabled={users && users.length > 0 ? false : true}
              onClick={() => pegination(1)}
              variant="contained"
            >
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
