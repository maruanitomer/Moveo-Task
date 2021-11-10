const initialState = {
  users: [],
  currUser: null,
};

export const types = {
  SET_USERS: "SET_USERS",
  SET_USER: "SET_USER",
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
