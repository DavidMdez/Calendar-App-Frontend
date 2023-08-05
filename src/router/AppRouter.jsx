import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../calendar";

export const AppRouter = () => {
  const authStatus = 'not-authenticated';

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
        ? <Route path="/auth/*" element={<AuthRoutes />} /> // Rutas Publicas
        : <Route path="/*" element={<CalendarRoutes />} /> // Rutas Privadas
      }

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
