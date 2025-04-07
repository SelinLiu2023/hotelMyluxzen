import { createBrowserRouter, RouterProvider } from "react-router-dom";
console.log("React Router Version:", createBrowserRouter);
import { useContext } from "react"; //Naheeda
import AuthContext from "../context/AuthContext"; //Naheeda
import { BookingPage } from "../pages/BookingPage"; //Xiangyu
import HomePage from "../pages/HomePage"; //zahra
import { AdminPage } from "../pages/AdminPage"; //Xiangyu
import { AdminBookingQueryPage } from "../pages/AdminBookingQueryPage"; //Xiangyu
import Gallerie from "../pages/GalleriePage"; //zahra
import AuthPage from "../pages/AuthPage"; //Naheeda
import AccountBookingInfoPage from "../pages/AccountBookingInfoPage"; //Naheeda
import AccountDetails from "../components/User/AccountDetails"; //Naheeda
import BookingDetails from "../components/User/BookingDetails"; //Naheeda
import { ReviewPage } from "../pages/ReviewPage"; // Minas
import { AdminReviewPage } from "../pages/AdminReviewPage"; //Minas
import { ApartmentsList } from "../pages/hausBeschreibung"; //Minas
import { AdminSingleHouseQueryPage } from "../pages/AdminSingleHouseQueryPage"; //Xiangyu
import { AdminBookTimelinePage } from "../pages/AdminBookTimelinePage"; //Xiangyu
import AdminGallery from "../pages/AdminGallery"; //zahra
import AboutUs from "../pages/aboutUsPage";
import { AdminHausBeschreibung } from "../pages/AdminHausBeschreibung";
import ActivitiesPage from "../pages/ActivitiesPage"; //Naheeda
import AdminBookingDashboardPage from "../pages/AdminBookingDashboardPage"; // Zahra
import AdminEmailSupportClient from "../pages/AdminEmailSupportClient"; // Zahra
import { BookingSummaryPage } from "../pages/BookingSummaryPage";
import AgreementPage from "../pages/AgreementPage";
const createAuthRouter = (authContext) =>
  createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
    },
    {
      path: "/booking",
      element: <BookingPage></BookingPage>,
    }, //Xiangyu
    {
      path: "/booking/:bookingNumber",
      element: <BookingSummaryPage></BookingSummaryPage>,
    }, //Xiangyu
    // page router, begin
    //zahra
    {
      path: "/gallerie",
      element: <Gallerie></Gallerie>,
    },
    { path: "/auth", element: <AuthPage /> }, //Naheeda
    {
      path: "/account-booking",
      element: <AccountBookingInfoPage />, // Wrapper-Seite
      children: [
        { path: "account", element: <AccountDetails /> },
        { path: "booking", element: <BookingDetails /> },
      ],
    },
    {
      path: "/reviews",
      element: <ReviewPage></ReviewPage>,
    }, //Minas
    {
      path: "/HausBeschreibung",
      element: <ApartmentsList></ApartmentsList>,
    }, //Minas
    {
      path: "/Agreement",
      element: <AgreementPage></AgreementPage>,
    }, //Minas

    {
      path: "/gallery",
      element: <AdminGallery />,
    },

    {
      path: "/activities",
      element: <ActivitiesPage />, //Naheeda
    },
    {
      path: "/about",
      element: <AboutUs></AboutUs>,
    }, //Minas

    // {

    // page router, end
    {
      path: "/admin",
      element: <AdminPage></AdminPage>,
      children: [
        {
          path: "bookings-manage",
          element: <AdminBookingQueryPage></AdminBookingQueryPage>,
        },
        {
          path: "",
          element: (
            <div className="text-3xl pt-10 pl-4">
              Willkommen im Admin-Dashboard
            </div>
          ),
        },
        //delete this page, Xiangyu
        // {
        //   path: "bookings-manage",
        //   element: <AdminBookingTicket></AdminBookingTicket>,
        // },
        // admin page, begin
        { path: "reviews", element: <AdminReviewPage /> }, //Minas

        { path: "HausBeschreibung", element: <AdminHausBeschreibung /> }, //Minas

        {
          path: "singleHouse-query",
          element: <AdminSingleHouseQueryPage></AdminSingleHouseQueryPage>,
        }, // Xiangyu
        {
          path: "booking-timeline",
          element: <AdminBookTimelinePage></AdminBookTimelinePage>,
        }, // Xiangyu

        // Zahra
        {
          path: "gallery",
          element: <AdminGallery />,
        },
        // Zahra
        {
          path: "booking-dashboard",
          element: <AdminBookingDashboardPage />,
        },
        // Zahra
        {
          path: "client-email-support",
          element: <AdminEmailSupportClient />,
        },

        // admin page, end
      ],
    },
  ]);
export function AppRouter() {
  const authContext = useContext(AuthContext);
  // Warten, bis die Benutzerdaten geladen sind
  console.log("Aktueller Benutzer im AuthContext:", authContext.user);
  const router = createAuthRouter(authContext);
  return <RouterProvider router={router} />;
}
