import axios from "axios";

//all export from userService
export { UsersObjParser, getUsersFromApi, getCurrUserFromAllUsers };

//veriables
const AGE = "age";
const PAGE_SIZE = 10;
var BASE_URL = `https://randomuser.me/api/?page=1&results=${PAGE_SIZE}&seed=foobar`;

//functions
async function getUsersFromApi(
  pageNumber = 1,
  sortBy = null,
  isSortFromBotToTop = true
) {
  BASE_URL = `https://randomuser.me/api/?page=${pageNumber}&results=${PAGE_SIZE}&seed=foobar`;
  const res = await axios.get(BASE_URL);
  const users = res.data.results;
  const usersToSave = UsersObjParser(users);
  if (sortBy) {
    return sortUsers(usersToSave, sortBy, isSortFromBotToTop);
  }
  return usersToSave;
}

function sortUsers(users, sortBy, isSortFromBotToTop) {
  return users.sort((user1, user2) => {
    if (!isSortFromBotToTop) {
      return sortFromBottomToTop(user1, user2, sortBy);
    } else {
      return sortFromUpToBottom(user1, user2, sortBy);
    }
  });
}

async function getCurrUserFromAllUsers(username, pageNumber) {
  const url = `https://randomuser.me/api/?page=${pageNumber}&results=${PAGE_SIZE}&seed=foobar`;
  const res = await axios.get(url);
  const userToParse = res.data.results.filter(
    (user) => user.login.username === username
  );
  const userObj = UsersObjParser(userToParse)[0];
  return userObj;
}
function sortFromUpToBottom(user1, user2, sortBy) {
  if (!sortBy) return;
  if (sortBy === "age") {
    if (user1.dob.age < user2.dob.age) {
      return 1;
    }
    if (user1.dob.age > user2.dob.age) {
      return -1;
    }
    return 0;
  }
  if (sortBy === "gender" || sortBy === "email" || sortBy === "firstName") {
    var nameA, nameB;
    if (sortBy === "gender") {
      nameA = user1.gender.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.gender.charAt(0).toUpperCase(); // ignore upper and lowercase
    } else if (sortBy === "email") {
      nameA = user1.email.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.email.charAt(0).toUpperCase(); // ignore upper and lowercase
    } else if (sortBy === "firstName") {
      nameA = user1.name.first.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.name.first.charAt(0).toUpperCase(); // ignore upper and lowercase
    }
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  }
}
function sortFromBottomToTop(user1, user2, sortBy) {
  if (!sortBy) return;
  if (sortBy === AGE) {
    if (user1.dob.age < user2.dob.age) {
      return -1;
    }
    if (user1.dob.age > user2.dob.age) {
      return 1;
    }
    return 0;
  }
  if (sortBy === "gender" || sortBy === "email" || sortBy === "firstName") {
    var nameA, nameB;
    if (sortBy === "gender") {
      nameA = user1.gender.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.gender.charAt(0).toUpperCase(); // ignore upper and lowercase
    } else if (sortBy === "email") {
      nameA = user1.email.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.email.charAt(0).toUpperCase(); // ignore upper and lowercase
    } else if (sortBy === "firstName") {
      nameA = user1.name.first.charAt(0).toUpperCase(); // ignore upper and lowercase
      nameB = user2.name.first.charAt(0).toUpperCase(); // ignore upper and lowercase
    }
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
}

function UsersObjParser(users) {
  return users.map((user) => ({
    id: user.login.uuid,
    lat: user.location.coordinates.latitude,
    lon: user.location.coordinates.longitude,
    gender: user.gender,
    location: user.location,
    email: user.email,
    dob: user.dob,
    registered: user.registered,
    firstName: user.name.first + " " + user.name.last,
    picture: user.picture,
    name: user.name,
    age: user.dob.age,
    login: user.login,
  }));
}
