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
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/payment-history/PaymentHistory";
import TrackParcel from "../pages/dashboard/track-parcel/TrackParcel";
import BeARider from "../pages/dashboard/become-a-rider/BeARider";
import AboutUs from "../pages/about-us/AboutUs";
import PendingRiders from "../pages/dashboard/pending-riders/PendingRiders";
import ActiveRiders from "../pages/dashboard/ative-riders/ActiveRiders";

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
        path: "rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
        loader: () => fetch("../../public/data/warehouses.json"),
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
      {
        path: "about",
        Component: AboutUs,
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      {
        path: "pending-riders",
        Component: PendingRiders,
      },
      {
        path: "active-riders",
        Component: ActiveRiders,
      },
    ],
  },
]);
