import {createBrowserRouter, createHashRouter} from "react-router-dom";
import {MainScreen} from "../screens/MainScreen/MainScreen";
import {ErrorScreen} from "../screens/ErrorScreen";
import {MainLayout} from "../layouts/MainLayout";
import {CartScreen} from "../screens/CartScreen/CartScreen";
import {HistoryScreen} from "../screens/HistoryScreen/HistoryScreen";
import {CouponsScreen} from "../screens/CouponsScreen/CouponsScreen";

export const router = createHashRouter([
  {
    basename: "/deliveryApp",
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <MainScreen/>
      },
      {
        path: 'cart',
        element: <CartScreen/>
      },
      // {
      //   path: 'history',
      //   element: <HistoryScreen/>
      // },
      // {
      //   path: 'coupons',
      //   element: <CouponsScreen/>
      // }
    ]
  },
]);

