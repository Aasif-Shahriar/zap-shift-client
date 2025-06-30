import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home-page/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/login-page/Login";
import Register from "../pages/authentication/register/Register";
import Coverage from "../pages/coverage/CoveragePage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/send-parcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/dashboard/my-parcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("../../public/data/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path:'/dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        path:'my-parcels',
        Component: MyParcels
      }
    ]
  }
]);
