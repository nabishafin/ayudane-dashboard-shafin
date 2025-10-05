import { createBrowserRouter } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import SignInPage from "../pages/auth/SignInPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboard Pages
import DashboardOverview from "../pages/dashboardpages/DashboardOverview/DashboardOverview";
import Profile from "../pages/dashboardpages/personalinformation/Profile";
import EditProfile from "../pages/dashboardpages/personalinformation/Editprofile";
import TermsAndConditions from "../pages/dashboardpages/terms/TermsAndConditions";
import EditTermsAndConditions from "../pages/dashboardpages/terms/EditTermsAndConditions";
import PrivacyPolicy from "../pages/dashboardpages/privacypolicy/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/dashboardpages/privacypolicy/EditPrivacyPolicy";
import AboutUs from "../pages/dashboardpages/about/AboutUs";
import EditAbout from "../pages/dashboardpages/about/EditAbout";

import AllUsers from "../pages/dashboardpages/user/AllUsers";
import Earnings from "../pages/dashboardpages/earnings/Earnings";
import Providers from "../pages/dashboardpages/providers/Providers";
import AllNotifications from "../pages/dashboardpages/notification/AllNotifications";
import Categories from "../pages/dashboardpages/categories/Categories";
import WithdrawRequest from "@/pages/dashboardpages/withdrawrequest/WithdrawRequest";
import ChangedPassword from "@/pages/dashboardpages/personalinformation/ChangedPassword";
import { FAQSection } from "@/pages/dashboardpages/faq/FAQSection";
// import FAQ from "../pages/dashboardpages/faq/FAQ";
// import EditFAQ from "../pages/dashboardpages/faq/EditFAQ";
// import Listings from "../pages/dashboardpages/listings/Listings";
// import Providers from "../pages/dashboardpages/providers/Providers";
// import Categories from "../pages/dashboardpages/categories/Categories";
// import WithdrawRequest from "../pages/dashboardpages/withdraw/WithdrawRequest";
// import Support from "../pages/dashboardpages/support/Support";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/otpverification",
    element: <OTPVerification />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "notifications", element: <AllNotifications /> },
      { path: "users", element: <AllUsers /> },
      { path: "earnings", element: <Earnings /> },
      { path: "providers", element: <Providers /> },
      { path: "categories", element: <Categories /> },
      { path: "withdraw-request", element: <WithdrawRequest /> },
      // { path: "support", element: <Support /> },

      // Settings
      { path: "settings/profile", element: <Profile /> },
      { path: "settings/editpersonal", element: <EditProfile /> },
      {
        path: "settings/changedpasswoard",
        element: <ChangedPassword />,
      },
      { path: "settings/terms", element: <TermsAndConditions /> },
      { path: "settings/editterms", element: <EditTermsAndConditions /> },
      { path: "settings/privacy", element: <PrivacyPolicy /> },
      { path: "settings/editprivacy", element: <EditPrivacyPolicy /> },
      { path: "settings/about", element: <AboutUs /> },
      { path: "settings/editabout", element: <EditAbout /> },
      { path: "settings/faq", element: <FAQSection /> },
      // { path: "settings/editfaq", element: <EditFAQ /> },
    ],
  },
]);

export default routes;
