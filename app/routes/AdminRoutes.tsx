import React from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";
import AdminPage from "~/pages/admin/AdminPage";

export default function AdminRoutes() {

  return <AdminPage />;
}
