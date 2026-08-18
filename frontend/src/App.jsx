import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import Master from "./layout/Master";
import AdminMaster from "./layout/adminlayout/Master";
import OwnerMaster from "./layout/Ownerlayout/OwnerMaster";

// Common & Public Pages
import Home from "./components/Home";
import About from "./components/about";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Feature from "./components/Feature";
import Service from "./components/Service";
import Team from "./components/team";
import Testimonial from "./components/Testimonial";
import Login from "./components/Login";
import Register from "./components/Register";
import View from "./components/View";
import ParkingDetails from "./components/ParkingDetails";
import BookingConfirmation from "./components/BookingConfirmation";
import ProtectedRoute from "./components/ProtectedRoute";

// Driver Dashboard
import UserDashboard from "./components/UserDashboard";

// Owner Components
import OwnerDashboard from "./components/Owner/OwnerDashboard";
import OwnerProfile from "./components/Owner/OwnerProfile";
import AddSpace from "./components/Owner/Addspace";
import Managespace from "./components/Owner/ManageSpace";
import Updatespace from "./components/Owner/UpdateSpace";
import Addslots from "./components/Owner/Addslots";
import Manageslots from "./components/Owner/Manageslot";
import Updateslots from "./components/Owner/Updateslot";
import Addprice from "./components/Owner/AddPricing";
import Manageprice from "./components/Owner/ManagePricing";
import Updateprice from "./components/Owner/Updatepricing";
import OwnerBookings from "./components/Owner/OwnerBookings";
import OwnerEarnings from "./components/Owner/OwnerEarnings";

// Admin Components
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageOwners from "./components/Admin/ManageOwners";
import ManageParkings from "./components/Admin/ManageParkings";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageBookings from "./components/Admin/ManageBookings";
import ManageTransactions from "./components/Admin/ManageTransactions";
import ManageWithdrawals from "./components/Admin/ManageWithdrawals";
import ManageDisputes from "./components/Admin/ManageDisputes";
import LateFeeRules from "./components/Admin/LateFeeRules";
import AdminReports from "./components/Admin/AdminReports";
import AddCategory from "./components/Admin/AddCategory";
import ManageCategory from "./components/Admin/ManageCategory";
import UpdateCategory from "./components/Admin/UpdateCategory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public & Driver Routes */}
          <Route path="/" element={<Master />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/view" element={<View />} />
            <Route path="/parking/:id" element={<ParkingDetails />} />
            <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Feature" element={<Feature />} />
            <Route path="/Service" element={<Service />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/Testimonial" element={<Testimonial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute allowedRoles={["3"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["1"]}>
                <AdminMaster />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/owners" element={<ManageOwners />} />
            <Route path="/admin/parkings" element={<ManageParkings />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/transactions" element={<ManageTransactions />} />
            <Route path="/admin/withdrawals" element={<ManageWithdrawals />} />
            <Route path="/admin/disputes" element={<ManageDisputes />} />
            <Route path="/admin/late-fees" element={<LateFeeRules />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/managecategory" element={<ManageCategory />} />
            <Route path="/admin/updatecategory/:_id" element={<UpdateCategory />} />
          </Route>

          {/* Owner / Host Routes */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["2"]}>
                <OwnerMaster />
              </ProtectedRoute>
            }
          >
            <Route index element={<OwnerDashboard />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
            <Route path="/owner/addspace" element={<AddSpace />} />
            <Route path="/owner/managespace" element={<Managespace />} />
            <Route path="/owner/updatespace/:_id" element={<Updatespace />} />
            <Route path="/owner/addslots" element={<Addslots />} />
            <Route path="/owner/manageslots" element={<Manageslots />} />
            <Route path="/owner/updateslots/:_id" element={<Updateslots />} />
            <Route path="/owner/addprice" element={<Addprice />} />
            <Route path="/owner/manageprice" element={<Manageprice />} />
            <Route path="/owner/updateprice/:_id" element={<Updateprice />} />
            <Route path="/owner/bookings" element={<OwnerBookings />} />
            <Route path="/owner/earnings" element={<OwnerEarnings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;