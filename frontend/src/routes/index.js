import {createBrowserRouter} from "react-router-dom";
import { PublicRoute } from "./publicRoute";
import { PrivateRoute } from "./privateRoute";
import AutheticationLayout from "../layout/autheticationLayout";
import Layout from "../layout";
import { Signin } from "../pages/Signin";
import { Dashboard } from "../pages/Dashboard";
import { InStoreBilling } from "../pages/InStoreBilling";
import { Stock } from "../pages/Stock";
import { Item } from "../pages/Item";
import { Banner } from "../pages/Banner";
import { Profile } from "../pages/Profile";
import PreviousOrders from "../pages/Previous-orders";
import Invoice from "../pages/Invoice";
import ItemAdd from "../pages/Item/Add_item";
import AddBanner from "../pages/Banner/AddBanner";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <PrivateRoute>
        <Layout />
      </PrivateRoute>,
    children: [
      {
        path: "/in-store-billing",
        element: <InStoreBilling />
      },
      {
        path: "/",
        element: <Stock />
      },
      {
        path: "/add-item",
        element: <ItemAdd />
      },
      {
        path: "/add-item/:id?",
        element: <Item />
      },
      {
        path: "/banner",
        element: <Banner />
      },
      {
        path: "/banner/add",
        element: <AddBanner />
      },
      {
        path: "/previous-orders",
        element: <PreviousOrders />
      },
      {
        path: "/orders",
        element: <Invoice />
      },
      {
        path: "/profile",
        element: <Profile />
      }

    ]
  },
  {
    path: "/",
    element:
      <PublicRoute>
        <AutheticationLayout />
      </PublicRoute>,
    children: [
      {
        path: '/signin',
        element: <Signin />
      }
    ]
  }  
]);

export default router;