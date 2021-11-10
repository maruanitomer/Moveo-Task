import { UserDetailScreen } from "./modules/user/screens/UserDetailScreen";
import { UsersScreen } from "./modules/user/screens/UsersScreen";

export const routes = [
  {
    path: "/",
    component: UsersScreen,
  },
  {
    exact: true,
    path: ':currPage/:currUsername',
    component: UserDetailScreen,
},
];
