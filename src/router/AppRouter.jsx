import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h1>Checking...</h1>
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? <Route path="/auth/*" element={<AuthRoutes />} /> // Rutas Publicas
          : <Route path="/*" element={<CalendarRoutes />} /> // Rutas Privadas
      }
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
