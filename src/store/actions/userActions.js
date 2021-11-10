import { types } from "../reducers/userReducers";

export const loadUsers = (payload) => {
  return {
    type: types.SET_USERS,
    payload,
  };
};
export const loadCurrUser = (payload) => ({
  type: types.SET_USER,
  payload,
});
