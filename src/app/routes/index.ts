import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { DriverRoutes } from "../modules/driver/driver.routes";



export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/driver",
    route: DriverRoutes,
  },
 
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
