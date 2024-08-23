import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ParticipanteDashboard } from '@/screens'

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        {/* <Route path="/" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* =============================================================== */}

        <Route path="/" element={<ParticipanteDashboard />} />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

